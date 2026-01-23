# 🔐 مولد كلمات المرور | Password Generator

<div dir="rtl">

موقع ويب احترافي لتوليد كلمات مرور قوية وآمنة بتصميم عصري وواجهة سهلة الاستخدام.

</div>

![Password Generator](https://img.shields.io/badge/Status-Active-success)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## ✨ Features | الميزات

<div dir="rtl">

- 🎨 **تصميم عصري**: واجهة مستخدم حديثة مع تأثيرات زجاجية وتدرجات لونية نابضة بالحياة
- 🌓 **وضع فاتح/داكن**: تبديل سلس بين الوضع الفاتح والداكن مع حفظ التفضيل
- 🌍 **دعم لغتين**: عربي وإنجليزي مع تبديل فوري
- 🔐 **أمان عالي**: توليد كلمات مرور باستخدام Crypto API للحصول على عشوائية حقيقية
- 💪 **مؤشر قوة ذكي**: حساب قوة كلمة المرور بناءً على الـ Entropy
- 🎯 **أنماط سريعة**: أنماط مخصصة (سهل التذكر، قوي جداً، PIN، WiFi)
- 📝 **تاريخ كلمات المرور**: حفظ آخر 10 كلمات مرور مع إمكانية نسخها
- 💾 **حفظ الإعدادات**: تذكر الطول والخيارات تلقائياً
- 📋 **نسخ سريع**: نسخ كلمة المرور إلى الحافظة بنقرة واحدة
- 📱 **PWA**: يمكن تثبيته كتطبيق على الهاتف ويعمل بدون إنترنت
- ⚙️ **خيارات مرنة**: تخصيص كامل للطول ونوع الأحرف المستخدمة
- 📱 **تصميم متجاوب**: يعمل بسلاسة على جميع الأجهزة

</div>

## 🚀 Demo | عرض تجريبي

![Password Generator Screenshot](screenshot.png)

## 🛠️ Technologies Used | التقنيات المستخدمة

- **HTML5**: Semantic structure with accessibility support
- **CSS3**: Modern design with Glassmorphism and CSS Variables
- **JavaScript ES6+**: Object-oriented programming with Crypto API
- **Google Fonts**: Cairo (Arabic) & Roboto Mono

## 📦 Installation | التثبيت

<div dir="rtl">

1. **استنسخ المشروع**:
```bash
git clone https://github.com/YOUR_USERNAME/password-generator.git
```

2. **افتح المشروع**:
```bash
cd password-generator
```

3. **افتح في المتصفح**:
قم بفتح ملف `index.html` في متصفحك المفضل

</div>

## 💻 Usage | الاستخدام

<div dir="rtl">

### التوليد الأساسي
1. **اختر الطول**: حرك شريط التمرير لاختيار طول كلمة المرور (8-32 حرف)
2. **اختر نوع الأحرف**: فعّل/عطّل الخيارات التالية:
   - حروف كبيرة (A-Z)
   - حروف صغيرة (a-z)
   - أرقام (0-9)
   - رموز خاصة (!@#$%^&*)
3. **ولّد كلمة مرور**: انقر على زر "توليد كلمة مرور جديدة"
4. **انسخ**: انقر على أيقونة النسخ لنسخ كلمة المرور

### الميزات الجديدة

#### 🌓 تبديل الوضع (فاتح/داكن)
- انقر على أيقونة الشمس/القمر في الأعلى لتبديل المظهر
- يتم حفظ اختيارك تلقائياً

#### 🌍 تغيير اللغة
- انقر على زر اللغة (EN/ع) للتبديل بين العربية والإنجليزية
- الواجهة تتحول بالكامل بما في ذلك الاتجاه (RTL/LTR)

#### 🎯 الأنماط السريعة
- **سهل التذكر**: كلمة مرور من 12 حرف (أحرف صغيرة + أرقام)
- **قوي جداً**: كلمة مرور من 24 حرف (جميع الأنواع)
- **PIN**: رقم من 6 خانات (أرقام فقط)
- **WiFi**: كلمة مرور من 16 حرف (أحرف + أرقام)

#### 📝 التاريخ
- يحفظ آخر 10 كلمات مرور تلقائياً
- انقر على أيقونة النسخ بجانب أي كلمة مرور لنسخها
- انقر "مسح الكل" لحذف التاريخ

#### 💾 حفظ الإعدادات
- جميع إعداداتك (الطول، الخيارات) تُحفظ تلقائياً
- عند فتح الموقع مرة أخرى، ستجد إعداداتك كما تركتها

#### 📱 تثبيت كتطبيق (PWA)
1. على **Chrome/Edge**: انقر على أيقونة التثبيت في شريط العنوان
2. على **الموبايل**: اختر "إضافة إلى الشاشة الرئيسية" من قائمة المتصفح
3. التطبيق سيعمل حتى بدون إنترنت!

</div>

## 🔒 Security Features | ميزات الأمان

<div dir="rtl">

- استخدام **Web Crypto API** للحصول على أرقام عشوائية آمنة
- حساب قوة كلمة المرور بناءً على **نظرية المعلومات (Entropy)**
- لا يتم حفظ أو إرسال كلمات المرور - كل شيء يعمل محلياً في المتصفح
- توليد كلمات مرور قوية تصل إلى 32 حرف

</div>

## 📊 Password Strength Levels | مستويات قوة كلمة المرور

| Level | Entropy | Color | Arabic |
|-------|---------|-------|--------|
| Weak | < 50 bits | 🔴 Red | ضعيفة |
| Medium | 50-75 bits | 🟠 Orange | متوسطة |
| Strong | > 75 bits | 🟢 Green | قوية |

## 📱 Browser Support | دعم المتصفحات

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Opera 76+

## 🎨 Design Features | ميزات التصميم

<div dir="rtl">

- تأثيرات **Glassmorphism** على البطاقات
- تدرجات لونية نابضة بالحياة
- رسوم متحركة سلسة ومتقدمة
- تأثيرات Hover تفاعلية
- تصميم Dark Mode عصري
- خطوط احترافية من Google Fonts

</div>

## 📁 Project Structure | هيكل المشروع

```
password-generator/
├── index.html          # الصفحة الرئيسية
├── styles.css          # ملف التنسيقات
├── script.js           # المنطق والوظائف
├── manifest.json       # ملف PWA
├── service-worker.js   # Service Worker للعمل بدون إنترنت
├── .gitignore         # ملفات Git المتجاهلة
├── LICENSE            # ترخيص MIT
└── README.md          # ملف التوثيق
```

## 🤝 Contributing | المساهمة

<div dir="rtl">

المساهمات مرحب بها! إذا كان لديك اقتراحات لتحسين المشروع:

1. افتح Issue لمناقشة التغييرات المقترحة
2. قم بعمل Fork للمشروع
3. أنشئ Branch جديد للميزة (`git checkout -b feature/AmazingFeature`)
4. قم بعمل Commit للتغييرات (`git commit -m 'Add some AmazingFeature'`)
5. ارفع التغييرات (`git push origin feature/AmazingFeature`)
6. افتح Pull Request

</div>

## 📝 License | الترخيص

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author | المطور

**Your Name**
- GitHub: [@YOUR_USERNAME](https://github.com/YOUR_USERNAME)

## 🙏 Acknowledgments | شكر وتقدير

<div dir="rtl">

- شكراً لـ Google Fonts لتوفير الخطوط الجميلة
- مستوحى من أفضل ممارسات تصميم الويب الحديث
- بُني بـ ❤️ باستخدام تقنيات الويب القياسية

</div>

---

<div align="center">

**⭐ إذا أعجبك المشروع، لا تنسى إضافة نجمة!**

Made with ❤️ for secure passwords

</div>
