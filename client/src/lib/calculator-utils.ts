// Arabic to English numeral conversion
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

// English to Arabic numeral conversion
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

// Convert English numerals to Arabic for display
export function convertEnglishToArabic(text: string): string {
  return text.replace(/[0-9]/g, (match) => englishToArabic[match] || match);
}

// Format number for display (add commas, convert to Arabic)
export function formatNumber(num: number): string {
  const formatted = num.toLocaleString('en-US');
  return convertEnglishToArabic(formatted);
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
    throw new Error('خطأ في الحساب');
  }
}

// Format time in Arabic
export function formatTimeArabic(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return 'الآن';
  if (diffMins < 60) return `منذ ${convertEnglishToArabic(diffMins.toString())} دقيقة`;
  if (diffHours < 24) return `منذ ${convertEnglishToArabic(diffHours.toString())} ساعة`;
  if (diffDays === 1) return 'أمس';
  if (diffDays < 7) return `منذ ${convertEnglishToArabic(diffDays.toString())} أيام`;
  
  return date.toLocaleDateString('ar-SA');
}
