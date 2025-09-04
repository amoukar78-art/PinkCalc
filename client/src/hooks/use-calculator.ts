import { useState, useEffect, useCallback } from 'react';
import { safeEvaluate, convertEnglishToArabic, formatNumber } from '@/lib/calculator-utils';

export interface CalculationHistory {
  id: string;
  expression: string;
  result: string;
  timestamp: Date;
}

export function useCalculator() {
  const [display, setDisplay] = useState('0');
  const [previousCalculation, setPreviousCalculation] = useState('');
  const [expression, setExpression] = useState('');
  const [history, setHistory] = useState<CalculationHistory[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [waitingForNewNumber, setWaitingForNewNumber] = useState(false);

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('calculator-history');
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory).map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp)
        }));
        setHistory(parsedHistory);
      } catch (error) {
        console.error('Failed to load calculator history:', error);
      }
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('calculator-history', JSON.stringify(history));
  }, [history]);

  const addToHistory = useCallback((expr: string, result: string) => {
    const newItem: CalculationHistory = {
      id: Date.now().toString(),
      expression: expr,
      result,
      timestamp: new Date()
    };
    
    setHistory(prev => [newItem, ...prev.slice(0, 99)]); // Keep last 100 items
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem('calculator-history');
  }, []);

  const inputNumber = useCallback((num: string) => {
    if (waitingForNewNumber) {
      setDisplay(num);
      setExpression(num);
      setWaitingForNewNumber(false);
    } else {
      if (display === '0') {
        setDisplay(num);
        setExpression(num);
      } else {
        setDisplay(prev => prev + num);
        setExpression(prev => prev + num);
      }
    }
  }, [display, waitingForNewNumber]);

  const inputOperator = useCallback((operator: string) => {
    if (waitingForNewNumber) {
      setWaitingForNewNumber(false);
    }

    const arabicOperator = operator === '*' ? '×' : operator === '/' ? '÷' : operator === '-' ? '−' : operator;
    
    if (expression && !waitingForNewNumber) {
      setExpression(prev => prev + operator);
      setDisplay(prev => prev + arabicOperator);
    }
  }, [expression, waitingForNewNumber]);

  const inputDecimal = useCallback(() => {
    if (waitingForNewNumber) {
      setDisplay('0.');
      setExpression('0.');
      setWaitingForNewNumber(false);
    } else {
      const lastNumber = expression.split(/[+\-*/]/).pop() || '';
      if (!lastNumber.includes('.')) {
        setDisplay(prev => prev + '.');
        setExpression(prev => prev + '.');
      }
    }
  }, [expression, waitingForNewNumber]);

  const calculate = useCallback(() => {
    if (!expression.trim()) return;

    try {
      const result = safeEvaluate(expression);
      const resultStr = formatNumber(result);
      
      addToHistory(display, resultStr);
      setPreviousCalculation(display);
      setDisplay(resultStr);
      setExpression(result.toString());
      setWaitingForNewNumber(true);
    } catch (error) {
      setDisplay('Error');
      setExpression('');
      setWaitingForNewNumber(true);
    }
  }, [expression, display, addToHistory]);

  const clear = useCallback(() => {
    setDisplay('0');
    setPreviousCalculation('');
    setExpression('');
    setWaitingForNewNumber(false);
  }, []);

  const deleteLast = useCallback(() => {
    if (waitingForNewNumber) {
      clear();
      return;
    }

    if (display.length === 1 || display === 'Error') {
      setDisplay('0');
      setExpression('');
    } else {
      setDisplay(prev => prev.slice(0, -1));
      setExpression(prev => prev.slice(0, -1));
    }
  }, [display, waitingForNewNumber, clear]);

  const useHistoryItem = useCallback((item: CalculationHistory) => {
    setDisplay(item.result);
    setExpression(item.result);
    setPreviousCalculation(item.expression);
    setWaitingForNewNumber(true);
    setIsHistoryOpen(false);
  }, []);

  // Keyboard support
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key;
      
      if (key >= '0' && key <= '9') {
        inputNumber(key);
      } else if (['+', '-', '*', '/'].includes(key)) {
        inputOperator(key);
      } else if (key === '.') {
        inputDecimal();
      } else if (key === 'Enter' || key === '=') {
        calculate();
      } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clear();
      } else if (key === 'Backspace') {
        deleteLast();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [inputNumber, inputOperator, inputDecimal, calculate, clear, deleteLast]);

  return {
    display,
    previousCalculation,
    history,
    isHistoryOpen,
    setIsHistoryOpen,
    inputNumber,
    inputOperator,
    inputDecimal,
    calculate,
    clear,
    deleteLast,
    clearHistory,
    useHistoryItem,
  };
}
