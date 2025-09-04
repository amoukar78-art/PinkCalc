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
    <div className="min-h-screen flex items-start justify-center pt-4 sm:pt-8 md:pt-12 pb-4 px-2 sm:px-4 lg:px-6 relative">
      
      {/* Main Calculator Container */}
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl bg-card/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden fade-in border border-white/20" data-testid="calculator-main" style={{
        boxShadow: '0 25px 50px rgba(139, 92, 246, 0.15), 0 15px 35px rgba(219, 39, 119, 0.1), 0 5px 15px rgba(0, 0, 0, 0.1)'
      }}>
        

        {/* Calculator Body */}
        <div className="p-4 sm:p-5 md:p-6">
          
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
          <div className="flex justify-center mt-4">
            <button 
              className="bg-gradient-to-r from-accent to-secondary text-accent-foreground px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2 sm:gap-3 border border-white/20 backdrop-blur-sm text-sm sm:text-base"
              onClick={() => setIsHistoryOpen(true)}
              data-testid="button-toggle-history"
              style={{
                boxShadow: '0 8px 25px rgba(139, 92, 246, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
              }}
            >
              <History className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden xs:inline sm:inline">View History</span>
              <span className="xs:hidden sm:hidden">History</span>
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
