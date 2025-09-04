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
      <div className="w-full max-w-md bg-card rounded-3xl shadow-2xl overflow-hidden fade-in" data-testid="calculator-main">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-secondary p-6 text-center">
          <h1 className="text-2xl font-bold text-primary-foreground mb-2" data-testid="text-calculator-title">
            آلة حاسبة أنثوية
          </h1>
          <p className="text-primary-foreground/80 text-sm" data-testid="text-calculator-subtitle">
            حاسبة عصرية وأنيقة
          </p>
        </div>

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
              className="bg-gradient-to-r from-accent to-secondary text-accent-foreground px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 flex items-center gap-2"
              onClick={() => setIsHistoryOpen(true)}
              data-testid="button-toggle-history"
            >
              <History className="w-4 h-4" />
              عرض السجل
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
