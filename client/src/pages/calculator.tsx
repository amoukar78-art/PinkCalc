import { History } from 'lucide-react';
import { useCalculator } from '@/hooks/use-calculator';
import { CalculatorDisplay } from '@/components/calculator-display';
import { CalculatorButtons } from '@/components/calculator-buttons';
import { HistoryPanel } from '@/components/history-panel';

export default function Calculator() {
  const {
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
  } = useCalculator();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      
      {/* Main Calculator Container */}
      <div className="w-full max-w-md bg-card/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden fade-in border border-white/20" data-testid="calculator-main" style={{
        boxShadow: '0 25px 50px rgba(139, 92, 246, 0.15), 0 15px 35px rgba(219, 39, 119, 0.1), 0 5px 15px rgba(0, 0, 0, 0.1)'
      }}>
        

        {/* Calculator Body */}
        <div className="p-6">
          
          {/* Display Area */}
          <CalculatorDisplay 
            currentValue={display}
            previousCalculation={previousCalculation}
          />

          {/* Calculator Buttons */}
          <CalculatorButtons
            onNumberClick={inputNumber}
            onOperatorClick={inputOperator}
            onDecimalClick={inputDecimal}
            onCalculate={calculate}
            onClear={clear}
            onDelete={deleteLast}
          />

          {/* History Toggle Button */}
          <div className="flex justify-center mt-6">
            <button 
              className="bg-gradient-to-r from-accent to-secondary text-accent-foreground px-8 py-4 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-3 border border-white/20 backdrop-blur-sm"
              onClick={() => setIsHistoryOpen(true)}
              data-testid="button-toggle-history"
              style={{
                boxShadow: '0 8px 25px rgba(139, 92, 246, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
              }}
            >
              <History className="w-5 h-5" />
              View History
            </button>
          </div>

        </div>
      </div>

      {/* History Panel */}
      <HistoryPanel
        isOpen={isHistoryOpen}
        history={history}
        onClose={() => setIsHistoryOpen(false)}
        onClearHistory={clearHistory}
        onUseHistoryItem={useHistoryItem}
      />

    </div>
  );
}
