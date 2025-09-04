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
    
    // Remove any non-mathematical characters
    const sanitized = englishExpression.replace(/[^0-9+\-*/.() ]/g, '');
    
    // Replace display operators with JavaScript operators
    const jsExpression = sanitized
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/−/g, '-');
    
    // Use Function constructor for safe evaluation (no eval)
    const result = new Function('return ' + jsExpression)();
    
    if (typeof result !== 'number' || !isFinite(result)) {
      throw new Error('Invalid calculation');
    }
    
    return result;
  } catch (error) {
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
