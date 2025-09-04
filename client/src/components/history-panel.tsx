import { X, History, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CalculationHistory } from '@/hooks/use-calculator';
import { formatTimeArabic } from '@/lib/calculator-utils';

interface HistoryPanelProps {
  isOpen: boolean;
  history: CalculationHistory[];
  onClose: () => void;
  onClearHistory: () => void;
  onUseHistoryItem: (item: CalculationHistory) => void;
  className?: string;
}

export function HistoryPanel({
  isOpen,
  history,
  onClose,
  onClearHistory,
  onUseHistoryItem,
  className
}: HistoryPanelProps) {
  return (
    <>
      {/* Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/50 transition-opacity duration-300 z-40",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        data-testid="overlay-history"
      />

      {/* History Panel */}
      <div 
        className={cn(
          "history-panel fixed right-0 top-0 h-full w-full sm:w-80 md:w-96 transform transition-transform duration-300 z-50",
          isOpen ? "translate-x-0" : "translate-x-full",
          className
        )}
        data-testid="panel-history"
      >
        
        {/* History Header */}
        <div className="bg-gradient-to-r from-primary to-secondary pt-12 pb-4 px-4 sm:pt-16 sm:pb-6 sm:px-6 text-primary-foreground">
          <div className="flex items-center justify-between">
            <h3 className="text-lg sm:text-xl font-bold">Calculation History</h3>
            <button 
              className="text-primary-foreground hover:text-primary-foreground/80 text-xl transition-colors"
              onClick={onClose}
              data-testid="button-close-history"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <p className="text-primary-foreground/80 text-xs sm:text-sm mt-2">All your calculations</p>
        </div>

        {/* History Content */}
        <div className="flex flex-col h-full">
          {history.length > 0 && (
            <div className="p-4 border-b border-border">
              <button 
                className="w-full bg-gradient-to-r from-red-400 to-pink-400 text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                onClick={onClearHistory}
                data-testid="button-clear-history"
              >
                <Trash2 className="w-4 h-4" />
                Clear History
              </button>
            </div>
          )}

          <div className="flex-1 overflow-y-auto">
            {history.length === 0 ? (
              /* Empty State */
              <div className="text-center py-12 text-muted-foreground" data-testid="empty-state-history">
                <History className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">No calculations yet</p>
                <p className="text-sm">Start performing some operations</p>
              </div>
            ) : (
              /* History Items */
              <div className="p-4 space-y-2">
                {history.map((item) => (
                  <div 
                    key={item.id}
                    className="history-item p-4 rounded-lg cursor-pointer"
                    onClick={() => onUseHistoryItem(item)}
                    data-testid={`history-item-${item.id}`}
                  >
                    <div className="text-sm text-muted-foreground mb-1">
                      {formatTimeArabic(item.timestamp)}
                    </div>
                    <div className="font-medium text-foreground">{item.expression}</div>
                    <div className="text-lg font-bold text-primary">= {item.result}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
