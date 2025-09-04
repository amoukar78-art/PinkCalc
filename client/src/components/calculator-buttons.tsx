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
    { arabic: '٧', english: '7' },
    { arabic: '٨', english: '8' },
    { arabic: '٩', english: '9' },
    { arabic: '٤', english: '4' },
    { arabic: '٥', english: '5' },
    { arabic: '٦', english: '6' },
    { arabic: '١', english: '1' },
    { arabic: '٢', english: '2' },
    { arabic: '٣', english: '3' },
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
          مسح
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
          ٪
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
            <div key={num.english} className="contents">
              <button 
                className="calculator-button number-button h-14 rounded-xl font-semibold text-xl text-foreground"
                onClick={() => onNumberClick(num.english)}
                data-testid={`button-number-${num.english}`}
              >
                {num.arabic}
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
          ٠
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
