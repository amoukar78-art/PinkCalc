// Arabic to English numeral conversion (keeping for backward compatibility)
export const arabicToEnglish: { [key: string]: string } = {
  '٠': '0',
  '١': '1',
  '٢': '2',
  '٣': '3',
  '٤': '4',
  '٥': '5',
  '٦': '6',
  '٧': '7',
  '٨': '8',
  '٩': '9',
};

// English to Arabic numeral conversion (keeping for backward compatibility)
export const englishToArabic: { [key: string]: string } = {
  '0': '٠',
  '1': '١',
  '2': '٢',
  '3': '٣',
  '4': '٤',
  '5': '٥',
  '6': '٦',
  '7': '٧',
  '8': '٨',
  '9': '٩',
};

// Convert Arabic numerals to English for calculation
export function convertArabicToEnglish(text: string): string {
  return text.replace(/[٠-٩]/g, (match) => arabicToEnglish[match] || match);
}

// Convert English numerals to Arabic for display (now returns English for UI)
export function convertEnglishToArabic(text: string): string {
  return text; // Return as-is for English display
}

// Format number for display (add commas, keep in English)
export function formatNumber(num: number): string {
  return num.toLocaleString('en-US');
}

// Safely evaluate mathematical expression
export function safeEvaluate(expression: string): number {
  try {
    // Convert Arabic numerals to English for calculation
    const englishExpression = convertArabicToEnglish(expression);
    
    // Remove any non-mathematical characters but preserve spaces temporarily
    let sanitized = englishExpression.replace(/[^0-9+\-*/.() ]/g, '');
    
    // Replace display operators with JavaScript operators
    let jsExpression = sanitized
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/−/g, '-');
    
    // Validate expression structure
    if (!jsExpression || jsExpression.trim() === '') {
      throw new Error('Empty expression');
    }
    
    // Check for invalid patterns
    const invalidPatterns = [
      /^\+/, /^\*/, /^\//, // Starts with operator (except minus)
      /\+$/, /\-$/, /\*$/, /\/$/, // Ends with operator
      /\+\+/, /\-\-/, /\*\*/, /\/\//, // Double operators
      /\+\*/, /\+\//, /\-\*/, /\-\//, /\*\+/, /\*\-/, /\/\+/, /\/\-/, // Invalid operator combinations
      /\(\)/, // Empty parentheses
      /\d+\(/, /\)\d+/, // Missing operators around parentheses
    ];
    
    for (const pattern of invalidPatterns) {
      if (pattern.test(jsExpression)) {
        throw new Error('Invalid expression structure');
      }
    }
    
    // Handle potential octal number issues by ensuring numbers don't start with 0
    // (except for decimal numbers like 0.5)
    jsExpression = jsExpression.replace(/\b0+(\d+)/g, '$1');
    
    // Validate parentheses are balanced
    let openParens = 0;
    for (const char of jsExpression) {
      if (char === '(') openParens++;
      if (char === ')') {
        openParens--;
        if (openParens < 0) throw new Error('Unmatched parentheses');
      }
    }
    if (openParens !== 0) throw new Error('Unmatched parentheses');
    
    // Use Function constructor for safe evaluation (no eval)
    const result = new Function('return ' + jsExpression)();
    
    // Check if result is valid
    if (typeof result !== 'number') {
      throw new Error('Calculation did not return a number');
    }
    
    if (!isFinite(result)) {
      throw new Error('Calculation resulted in infinity or invalid number');
    }
    
    // Check for extremely large numbers that might cause display issues
    if (Math.abs(result) > Number.MAX_SAFE_INTEGER) {
      throw new Error('Number too large for safe calculation');
    }
    
    return result;
  } catch (error) {
    // Return more specific error messages for debugging
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Calculator evaluation error:', errorMessage, 'Expression:', expression);
    throw new Error('Calculation Error');
  }
}

// Format time in English
export function formatTimeArabic(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return 'Now';
  if (diffMins < 60) return `${diffMins} minutes ago`;
  if (diffHours < 24) return `${diffHours} hours ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  
  return date.toLocaleDateString('en-US');
}
