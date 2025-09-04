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
    <div className={cn("display-area rounded-2xl p-6 mb-6", className)}>
      {/* Previous Calculation */}
      <div 
        className="text-muted-foreground text-lg text-right mb-2" 
        data-testid="text-previous-calculation"
      >
        {previousCalculation}
      </div>
      
      {/* Current Display */}
      <div 
        className="text-4xl font-bold text-foreground text-right" 
        data-testid="text-current-value"
      >
        {currentValue}
      </div>
    </div>
  );
}
