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
    <div className="h-screen flex flex-col justify-center px-2 sm:px-4 lg:px-6 relative">
      
      {/* Main Calculator Container */}
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl bg-card/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden fade-in border border-white/20 mx-auto" data-testid="calculator-main" style={{
        boxShadow: '0 25px 50px rgba(139, 92, 246, 0.15), 0 15px 35px rgba(219, 39, 119, 0.1), 0 5px 15px rgba(0, 0, 0, 0.1)'
      }}>
        

        {/* Calculator Body */}
        <div className="p-5 sm:p-6 md:p-7">
          
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
            onHistoryToggle={() => setIsHistoryOpen(true)}
          />


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
