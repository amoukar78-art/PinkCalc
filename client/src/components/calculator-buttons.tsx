import { Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CalculatorButtonsProps {
  onNumberClick: (num: string) => void;
  onOperatorClick: (op: string) => void;
  onDecimalClick: () => void;
  onCalculate: () => void;
  onClear: () => void;
  onDelete: () => void;
  onHistoryToggle: () => void;
  playButtonSound: (soundType: 'number' | 'operator' | 'equals' | 'clear' | 'delete') => void;
  className?: string;
}

export function CalculatorButtons({
  onNumberClick,
  onOperatorClick,
  onDecimalClick,
  onCalculate,
  onClear,
  onDelete,
  onHistoryToggle,
  playButtonSound,
  className
}: CalculatorButtonsProps) {
  const numberButtons = [
    { display: '7', value: '7' },
    { display: '8', value: '8' },
    { display: '9', value: '9' },
    { display: '4', value: '4' },
    { display: '5', value: '5' },
    { display: '6', value: '6' },
    { display: '1', value: '1' },
    { display: '2', value: '2' },
    { display: '3', value: '3' },
  ];

  const operators = [
    { symbol: '÷', value: '/' },
    { symbol: '×', value: '*' },
    { symbol: '−', value: '-' },
    { symbol: '+', value: '+' },
  ];

  // Wrapper functions that combine sound with action
  const handleNumberClick = (num: string) => {
    playButtonSound('number');
    onNumberClick(num);
  };

  const handleOperatorClick = (op: string) => {
    playButtonSound('operator');
    onOperatorClick(op);
  };

  const handleDecimalClick = () => {
    playButtonSound('number');
    onDecimalClick();
  };

  const handleCalculate = () => {
    playButtonSound('equals');
    onCalculate();
  };

  const handleClear = () => {
    playButtonSound('clear');
    onClear();
  };

  const handleDelete = () => {
    playButtonSound('delete');
    onDelete();
  };

  const handleHistoryToggle = () => {
    playButtonSound('operator'); // Use operator sound for history
    onHistoryToggle();
  };

  return (
    <div className={cn("space-y-2", className)}>
      {/* Button Grid */}
      <div className="grid grid-cols-4 gap-3">
        
        {/* First Row: Clear, Delete, Percent, Divide */}
        <button 
          className="calculator-button clear-button rounded-full font-semibold text-base sm:text-lg lg:text-xl text-white"
          onClick={handleClear}
          data-testid="button-clear"
        >
          Clear
        </button>
        
        <button 
          className="calculator-button operator-button rounded-full font-semibold text-xl sm:text-2xl lg:text-3xl text-white"
          onClick={handleDelete}
          data-testid="button-delete"
        >
          <Trash2 className="w-5 h-5 mx-auto" />
        </button>
        
        <button 
          className="calculator-button operator-button rounded-full font-semibold text-xl sm:text-2xl lg:text-3xl text-white"
          onClick={() => handleOperatorClick('%')}
          data-testid="button-percent"
        >
          %
        </button>
        
        <button 
          className="calculator-button operator-button rounded-full font-semibold text-xl sm:text-2xl lg:text-3xl text-white"
          onClick={() => handleOperatorClick('/')}
          data-testid="button-divide"
        >
          ÷
        </button>

        {/* Row 2: 7, 8, 9, × */}
        <button 
          className="calculator-button number-button rounded-full font-semibold text-xl sm:text-2xl lg:text-3xl text-foreground"
          onClick={() => handleNumberClick('7')}
          data-testid="button-number-7"
        >
          7
        </button>
        <button 
          className="calculator-button number-button rounded-full font-semibold text-xl sm:text-2xl lg:text-3xl text-foreground"
          onClick={() => handleNumberClick('8')}
          data-testid="button-number-8"
        >
          8
        </button>
        <button 
          className="calculator-button number-button rounded-full font-semibold text-xl sm:text-2xl lg:text-3xl text-foreground"
          onClick={() => handleNumberClick('9')}
          data-testid="button-number-9"
        >
          9
        </button>
        <button 
          className="calculator-button operator-button rounded-full font-semibold text-xl sm:text-2xl lg:text-3xl text-white"
          onClick={() => handleOperatorClick('*')}
          data-testid="button-multiply"
        >
          ×
        </button>

        {/* Row 3: 4, 5, 6, - */}
        <button 
          className="calculator-button number-button rounded-full font-semibold text-xl sm:text-2xl lg:text-3xl text-foreground"
          onClick={() => handleNumberClick('4')}
          data-testid="button-number-4"
        >
          4
        </button>
        <button 
          className="calculator-button number-button rounded-full font-semibold text-xl sm:text-2xl lg:text-3xl text-foreground"
          onClick={() => handleNumberClick('5')}
          data-testid="button-number-5"
        >
          5
        </button>
        <button 
          className="calculator-button number-button rounded-full font-semibold text-xl sm:text-2xl lg:text-3xl text-foreground"
          onClick={() => handleNumberClick('6')}
          data-testid="button-number-6"
        >
          6
        </button>
        <button 
          className="calculator-button operator-button rounded-full font-semibold text-xl sm:text-2xl lg:text-3xl text-white"
          onClick={() => handleOperatorClick('-')}
          data-testid="button-subtract"
        >
          −
        </button>

        {/* Row 4: 1, 2, 3, + */}
        <button 
          className="calculator-button number-button rounded-full font-semibold text-xl sm:text-2xl lg:text-3xl text-foreground"
          onClick={() => handleNumberClick('1')}
          data-testid="button-number-1"
        >
          1
        </button>
        <button 
          className="calculator-button number-button rounded-full font-semibold text-xl sm:text-2xl lg:text-3xl text-foreground"
          onClick={() => handleNumberClick('2')}
          data-testid="button-number-2"
        >
          2
        </button>
        <button 
          className="calculator-button number-button rounded-full font-semibold text-xl sm:text-2xl lg:text-3xl text-foreground"
          onClick={() => handleNumberClick('3')}
          data-testid="button-number-3"
        >
          3
        </button>
        <button 
          className="calculator-button operator-button rounded-full font-semibold text-xl sm:text-2xl lg:text-3xl text-white"
          onClick={() => handleOperatorClick('+')}
          data-testid="button-add"
        >
          +
        </button>

        {/* Row 5: History, 0, ., = */}
        <button 
          className="calculator-button history-button rounded-full font-semibold text-sm sm:text-base lg:text-lg text-white flex items-center justify-center"
          onClick={handleHistoryToggle}
          data-testid="button-history"
        >
          📝
        </button>
        <button 
          className="calculator-button number-button rounded-full font-semibold text-xl sm:text-2xl lg:text-3xl text-foreground"
          onClick={() => handleNumberClick('0')}
          data-testid="button-number-0"
        >
          0
        </button>
        <button 
          className="calculator-button number-button rounded-full font-semibold text-xl sm:text-2xl lg:text-3xl text-foreground"
          onClick={handleDecimalClick}
          data-testid="button-decimal"
        >
          .
        </button>
        <button 
          className="calculator-button equals-button rounded-full font-bold text-xl sm:text-2xl lg:text-3xl text-white"
          onClick={handleCalculate}
          data-testid="button-equals"
        >
          =
        </button>
      </div>
    </div>
  );
}
