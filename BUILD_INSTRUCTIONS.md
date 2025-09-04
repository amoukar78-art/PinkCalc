# تعليمات بناء تطبيق Calculator للأندرويد

## المتطلبات
- Node.js 18 أو أحدث
- Java JDK 17
- Android SDK
- Git

## خطوات البناء

### 1. بناء تطبيق الويب
```bash
npm install
vite build
```

### 2. مزامنة Capacitor
```bash
npx cap sync android
```

### 3. بناء APK
```bash
cd android
./gradlew assembleRelease
```

### 4. بناء AAB للـ Play Store
```bash
cd android
./gradlew bundleRelease
```

## استخدام GitHub Actions

تم إعداد GitHub Actions للبناء التلقائي عند:
- دفع الكود إلى الفرع الرئيسي
- إنشاء Pull Request
- تشغيل يدوي

الملفات المبنية ستكون متاحة في قسم Artifacts.

## توقيع التطبيق

تم إعداد توقيع تلقائي للتطبيق. يمكنك تغيير إعدادات التوقيع في:
- `android/app/key.properties`
- `android/app/build.gradle`

## ملاحظات مهمة

- تأكد من أن Android SDK مثبت
- تأكد من أن متغيرات البيئة ANDROID_HOME و JAVA_HOME معينة بشكل صحيح
- للإنتاج، استخدم keystore آمن ومحمي بكلمة مرور قوية