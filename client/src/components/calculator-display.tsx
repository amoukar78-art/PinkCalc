import { cn } from '@/lib/utils';

interface CalculatorDisplayProps {
  currentValue: string;
  previousCalculation: string;
  className?: string;
}

export function CalculatorDisplay({ 
  currentValue, 
  previousCalculation, 
  className 
}: CalculatorDisplayProps) {
  return (
    <div className={cn("display-area rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 mb-4 sm:mb-6", className)}>
      {/* Previous Calculation */}
      <div 
        className="text-muted-foreground text-sm sm:text-lg md:text-xl text-right mb-1 sm:mb-2" 
        data-testid="text-previous-calculation"
      >
        {previousCalculation}
      </div>
      
      {/* Current Display */}
      <div 
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-right" 
        data-testid="text-current-value"
      >
        {currentValue}
      </div>
    </div>
  );
}
