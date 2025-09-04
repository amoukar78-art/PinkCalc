import { Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CalculatorButtonsProps {
  onNumberClick: (num: string) => void;
  onOperatorClick: (op: string) => void;
  onDecimalClick: () => void;
  onCalculate: () => void;
  onClear: () => void;
  onDelete: () => void;
  className?: string;
}

export function CalculatorButtons({
  onNumberClick,
  onOperatorClick,
  onDecimalClick,
  onCalculate,
  onClear,
  onDelete,
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

  return (
    <div className={cn("space-y-2 sm:space-y-3", className)}>
      {/* Button Grid */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        
        {/* First Row: Clear, Delete, Percent, Divide */}
        <button 
          className="calculator-button clear-button h-12 sm:h-14 lg:h-16 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-lg lg:text-xl text-white"
          onClick={onClear}
          data-testid="button-clear"
        >
          Clear
        </button>
        
        <button 
          className="calculator-button operator-button h-12 sm:h-14 lg:h-16 rounded-lg sm:rounded-xl font-semibold text-lg sm:text-xl lg:text-2xl text-white"
          onClick={onDelete}
          data-testid="button-delete"
        >
          <Trash2 className="w-5 h-5 mx-auto" />
        </button>
        
        <button 
          className="calculator-button operator-button h-12 sm:h-14 lg:h-16 rounded-lg sm:rounded-xl font-semibold text-lg sm:text-xl lg:text-2xl text-white"
          onClick={() => onOperatorClick('%')}
          data-testid="button-percent"
        >
          %
        </button>
        
        <button 
          className="calculator-button operator-button h-12 sm:h-14 lg:h-16 rounded-lg sm:rounded-xl font-semibold text-lg sm:text-xl lg:text-2xl text-white"
          onClick={() => onOperatorClick('/')}
          data-testid="button-divide"
        >
          ÷
        </button>

        {/* Row 2: 7, 8, 9, × */}
        <button 
          className="calculator-button number-button h-12 sm:h-14 lg:h-16 rounded-lg sm:rounded-xl font-semibold text-lg sm:text-xl lg:text-2xl text-foreground"
          onClick={() => onNumberClick('7')}
          data-testid="button-number-7"
        >
          7
        </button>
        <button 
          className="calculator-button number-button h-12 sm:h-14 lg:h-16 rounded-lg sm:rounded-xl font-semibold text-lg sm:text-xl lg:text-2xl text-foreground"
          onClick={() => onNumberClick('8')}
          data-testid="button-number-8"
        >
          8
        </button>
        <button 
          className="calculator-button number-button h-12 sm:h-14 lg:h-16 rounded-lg sm:rounded-xl font-semibold text-lg sm:text-xl lg:text-2xl text-foreground"
          onClick={() => onNumberClick('9')}
          data-testid="button-number-9"
        >
          9
        </button>
        <button 
          className="calculator-button operator-button h-12 sm:h-14 lg:h-16 rounded-lg sm:rounded-xl font-semibold text-lg sm:text-xl lg:text-2xl text-white"
          onClick={() => onOperatorClick('*')}
          data-testid="button-multiply"
        >
          ×
        </button>

        {/* Row 3: 4, 5, 6, - */}
        <button 
          className="calculator-button number-button h-12 sm:h-14 lg:h-16 rounded-lg sm:rounded-xl font-semibold text-lg sm:text-xl lg:text-2xl text-foreground"
          onClick={() => onNumberClick('4')}
          data-testid="button-number-4"
        >
          4
        </button>
        <button 
          className="calculator-button number-button h-12 sm:h-14 lg:h-16 rounded-lg sm:rounded-xl font-semibold text-lg sm:text-xl lg:text-2xl text-foreground"
          onClick={() => onNumberClick('5')}
          data-testid="button-number-5"
        >
          5
        </button>
        <button 
          className="calculator-button number-button h-12 sm:h-14 lg:h-16 rounded-lg sm:rounded-xl font-semibold text-lg sm:text-xl lg:text-2xl text-foreground"
          onClick={() => onNumberClick('6')}
          data-testid="button-number-6"
        >
          6
        </button>
        <button 
          className="calculator-button operator-button h-12 sm:h-14 lg:h-16 rounded-lg sm:rounded-xl font-semibold text-lg sm:text-xl lg:text-2xl text-white"
          onClick={() => onOperatorClick('-')}
          data-testid="button-subtract"
        >
          −
        </button>

        {/* Row 4: 1, 2, 3, + */}
        <button 
          className="calculator-button number-button h-12 sm:h-14 lg:h-16 rounded-lg sm:rounded-xl font-semibold text-lg sm:text-xl lg:text-2xl text-foreground"
          onClick={() => onNumberClick('1')}
          data-testid="button-number-1"
        >
          1
        </button>
        <button 
          className="calculator-button number-button h-12 sm:h-14 lg:h-16 rounded-lg sm:rounded-xl font-semibold text-lg sm:text-xl lg:text-2xl text-foreground"
          onClick={() => onNumberClick('2')}
          data-testid="button-number-2"
        >
          2
        </button>
        <button 
          className="calculator-button number-button h-12 sm:h-14 lg:h-16 rounded-lg sm:rounded-xl font-semibold text-lg sm:text-xl lg:text-2xl text-foreground"
          onClick={() => onNumberClick('3')}
          data-testid="button-number-3"
        >
          3
        </button>
        <button 
          className="calculator-button operator-button h-12 sm:h-14 lg:h-16 rounded-lg sm:rounded-xl font-semibold text-lg sm:text-xl lg:text-2xl text-white"
          onClick={() => onOperatorClick('+')}
          data-testid="button-add"
        >
          +
        </button>

        {/* Row 5: 0 (span 2), ., = */}
        <button 
          className="calculator-button number-button h-12 sm:h-14 lg:h-16 rounded-lg sm:rounded-xl font-semibold text-lg sm:text-xl lg:text-2xl text-foreground col-span-2"
          onClick={() => onNumberClick('0')}
          data-testid="button-number-0"
        >
          0
        </button>
        <button 
          className="calculator-button number-button h-12 sm:h-14 lg:h-16 rounded-lg sm:rounded-xl font-semibold text-lg sm:text-xl lg:text-2xl text-foreground"
          onClick={onDecimalClick}
          data-testid="button-decimal"
        >
          .
        </button>
        <button 
          className="calculator-button equals-button h-12 sm:h-14 lg:h-16 rounded-lg sm:rounded-xl font-bold text-lg sm:text-xl lg:text-2xl text-white"
          onClick={onCalculate}
          data-testid="button-equals"
        >
          =
        </button>
      </div>
    </div>
  );
}
