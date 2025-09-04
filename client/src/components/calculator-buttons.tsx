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
    <div className={cn("space-y-3", className)}>
      {/* Button Grid */}
      <div className="grid grid-cols-4 gap-3">
        
        {/* First Row: Clear, Delete, Percent, Divide */}
        <button 
          className="calculator-button clear-button h-14 rounded-xl font-semibold text-lg text-white"
          onClick={onClear}
          data-testid="button-clear"
        >
          Clear
        </button>
        
        <button 
          className="calculator-button operator-button h-14 rounded-xl font-semibold text-xl text-white"
          onClick={onDelete}
          data-testid="button-delete"
        >
          <Trash2 className="w-5 h-5 mx-auto" />
        </button>
        
        <button 
          className="calculator-button operator-button h-14 rounded-xl font-semibold text-xl text-white"
          onClick={() => onOperatorClick('%')}
          data-testid="button-percent"
        >
          %
        </button>
        
        <button 
          className="calculator-button operator-button h-14 rounded-xl font-semibold text-xl text-white"
          onClick={() => onOperatorClick('/')}
          data-testid="button-divide"
        >
          ÷
        </button>

        {/* Number buttons and operators */}
        {numberButtons.map((num, index) => {
          const isLastInRow = (index + 1) % 3 === 0;
          const operatorIndex = Math.floor(index / 3);
          
          return (
            <div key={num.value} className="contents">
              <button 
                className="calculator-button number-button h-14 rounded-xl font-semibold text-xl text-foreground"
                onClick={() => onNumberClick(num.value)}
                data-testid={`button-number-${num.value}`}
              >
                {num.display}
              </button>
              
              {isLastInRow && operatorIndex < 3 && (
                <button 
                  className={cn(
                    "calculator-button operator-button h-14 rounded-xl font-semibold text-xl text-white",
                    operatorIndex === 2 && "row-span-2"
                  )}
                  onClick={() => onOperatorClick(operators[operatorIndex + 1]?.value)}
                  data-testid={`button-${operators[operatorIndex + 1]?.value.replace('/', 'divide').replace('*', 'multiply').replace('-', 'subtract').replace('+', 'add')}`}
                >
                  {operators[operatorIndex + 1]?.symbol}
                </button>
              )}
            </div>
          );
        })}

        {/* Zero and Decimal */}
        <button 
          className="calculator-button number-button h-14 rounded-xl font-semibold text-xl text-foreground col-span-2"
          onClick={() => onNumberClick('0')}
          data-testid="button-number-0"
        >
          0
        </button>
        
        <button 
          className="calculator-button number-button h-14 rounded-xl font-semibold text-xl text-foreground"
          onClick={onDecimalClick}
          data-testid="button-decimal"
        >
          .
        </button>
      </div>
      
      {/* Equals Button (Full Width) */}
      <button 
        className="calculator-button equals-button h-14 rounded-xl font-bold text-xl w-full text-white"
        onClick={onCalculate}
        data-testid="button-equals"
      >
        =
      </button>
    </div>
  );
}
