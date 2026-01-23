// Password Generator with Advanced Features
class PasswordGenerator {
    constructor() {
        this.characterSets = {
            uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            lowercase: 'abcdefghijklmnopqrstuvwxyz',
            numbers: '0123456789',
            symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
        };

        this.currentLang = localStorage.getItem('lang') || 'ar';
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        this.maxHistory = 10;

        this.translations = {
            ar: {
                weak: 'ضعيفة',
                medium: 'متوسطة',
                strong: 'قوية'
            },
            en: {
                weak: 'Weak',
                medium: 'Medium',
                strong: 'Strong'
            }
        };

        this.init();
    }

    init() {
        // DOM Elements
        this.passwordDisplay = document.getElementById('password-display');
        this.lengthSlider = document.getElementById('length-slider');
        this.lengthValue = document.getElementById('length-value');
        this.uppercaseCheck = document.getElementById('uppercase');
        this.lowercaseCheck = document.getElementById('lowercase');
        this.numbersCheck = document.getElementById('numbers');
        this.symbolsCheck = document.getElementById('symbols');
        this.generateBtn = document.getElementById('generate-btn');
        this.copyBtn = document.getElementById('copy-btn');
        this.strengthFill = document.getElementById('strength-fill');
        this.strengthText = document.getElementById('strength-text');
        this.copyNotification = document.getElementById('copy-notification');
        this.themeToggle = document.getElementById('theme-toggle');
        this.langToggle = document.getElementById('lang-toggle');
        this.historyList = document.getElementById('history-list');
        this.clearHistoryBtn = document.getElementById('clear-history');

        // Apply saved theme and language
        this.applyTheme(this.currentTheme);
        this.applyLanguage(this.currentLang);

        // Load settings
        this.loadSettings();

        // Event Listeners
        this.lengthSlider.addEventListener('input', () => this.updateLength());
        this.generateBtn.addEventListener('click', () => this.generatePassword());
        this.copyBtn.addEventListener('click', () => this.copyToClipboard());
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        this.langToggle.addEventListener('click', () => this.toggleLanguage());
        this.clearHistoryBtn.addEventListener('click', () => this.clearHistory());

        // Generate password on checkbox change
        [this.uppercaseCheck, this.lowercaseCheck, this.numbersCheck, this.symbolsCheck].forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.generatePassword();
                this.saveSettings();
            });
        });

        // Presets
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const preset = e.target.dataset.preset;
                this.applyPreset(preset);
            });
        });

        // Load and display history
        this.loadHistory();

        // Generate initial password
        this.generatePassword();
    }

    applyTheme(theme) {
        if (theme === 'light') {
            document.body.classList.add('light-theme');
        } else {
            document.body.classList.remove('light-theme');
        }
        this.currentTheme = theme;
        localStorage.setItem('theme', theme);
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(newTheme);
    }

    applyLanguage(lang) {
        // Update HTML attributes
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

        // Update all translatable elements
        document.querySelectorAll('[data-ar][data-en]').forEach(el => {
            const text = el.dataset[lang];
            if (el.tagName === 'INPUT' || el.tagName === 'BUTTON') {
                if (el.querySelector('span')) {
                    el.querySelector('span').textContent = text;
                } else if (!el.querySelector('svg')) {
                    el.textContent = text;
                }
            } else {
                el.textContent = text;
            }
        });

        // Update titles
        document.querySelectorAll('[data-title-ar][data-title-en]').forEach(el => {
            el.title = el.dataset[`title${lang === 'ar' ? 'Ar' : 'En'}`];
        });

        // Update language toggle button
        this.langToggle.querySelector('.lang-text').textContent = lang === 'ar' ? 'EN' : 'ع';

        this.currentLang = lang;
        localStorage.setItem('lang', lang);

        // Update strength text
        if (this.passwordDisplay.value) {
            this.generatePassword();
        }
    }

    toggleLanguage() {
        const newLang = this.currentLang === 'ar' ? 'en' : 'ar';
        this.applyLanguage(newLang);
    }

    applyPreset(preset) {
        switch (preset) {
            case 'memorable':
                // Easy to remember: lowercase + numbers, length 12
                this.lengthSlider.value = 12;
                this.uppercaseCheck.checked = false;
                this.lowercaseCheck.checked = true;
                this.numbersCheck.checked = true;
                this.symbolsCheck.checked = false;
                break;
            case 'strong':
                // Extra strong: all options, length 24
                this.lengthSlider.value = 24;
                this.uppercaseCheck.checked = true;
                this.lowercaseCheck.checked = true;
                this.numbersCheck.checked = true;
                this.symbolsCheck.checked = true;
                break;
            case 'pin':
                // PIN: numbers only, length 6
                this.lengthSlider.value = 6;
                this.uppercaseCheck.checked = false;
                this.lowercaseCheck.checked = false;
                this.numbersCheck.checked = true;
                this.symbolsCheck.checked = false;
                break;
            case 'wifi':
                // WiFi compatible: letters + numbers, length 16
                this.lengthSlider.value = 16;
                this.uppercaseCheck.checked = true;
                this.lowercaseCheck.checked = true;
                this.numbersCheck.checked = true;
                this.symbolsCheck.checked = false;
                break;
        }
        this.updateLength();
        this.generatePassword();
    }

    saveSettings() {
        const settings = {
            length: this.lengthSlider.value,
            uppercase: this.uppercaseCheck.checked,
            lowercase: this.lowercaseCheck.checked,
            numbers: this.numbersCheck.checked,
            symbols: this.symbolsCheck.checked
        };
        localStorage.setItem('passwordSettings', JSON.stringify(settings));
    }

    loadSettings() {
        const saved = localStorage.getItem('passwordSettings');
        if (saved) {
            const settings = JSON.parse(saved);
            this.lengthSlider.value = settings.length;
            this.uppercaseCheck.checked = settings.uppercase;
            this.lowercaseCheck.checked = settings.lowercase;
            this.numbersCheck.checked = settings.numbers;
            this.symbolsCheck.checked = settings.symbols;
            this.updateLength();
        }
    }

    updateLength() {
        this.lengthValue.textContent = this.lengthSlider.value;
        this.generatePassword();
        this.saveSettings();
    }

    getCharacterPool() {
        let pool = '';

        if (this.uppercaseCheck.checked) pool += this.characterSets.uppercase;
        if (this.lowercaseCheck.checked) pool += this.characterSets.lowercase;
        if (this.numbersCheck.checked) pool += this.characterSets.numbers;
        if (this.symbolsCheck.checked) pool += this.characterSets.symbols;

        return pool;
    }

    generatePassword() {
        const length = parseInt(this.lengthSlider.value);
        const pool = this.getCharacterPool();

        // Ensure at least one option is selected
        if (pool.length === 0) {
            this.passwordDisplay.value = '';
            this.updateStrength(0);
            return;
        }

        let password = '';
        const poolLength = pool.length;

        // Use crypto API for better randomness
        const randomValues = new Uint32Array(length);
        crypto.getRandomValues(randomValues);

        for (let i = 0; i < length; i++) {
            password += pool[randomValues[i] % poolLength];
        }

        // Animate password display
        this.animatePassword(password);

        // Update strength indicator
        const strength = this.calculateStrength(password, pool);
        this.updateStrength(strength);

        // Add to history
        this.addToHistory(password);
    }

    animatePassword(newPassword) {
        // Fade out
        this.passwordDisplay.style.opacity = '0';
        this.passwordDisplay.style.transform = 'translateY(-10px)';

        setTimeout(() => {
            this.passwordDisplay.value = newPassword;
            // Fade in
            this.passwordDisplay.style.opacity = '1';
            this.passwordDisplay.style.transform = 'translateY(0)';
        }, 150);
    }

    calculateStrength(password, pool) {
        // Calculate entropy-based strength
        const length = password.length;
        const poolSize = pool.length;

        // Entropy = log2(poolSize^length)
        const entropy = length * Math.log2(poolSize);

        // Score based on entropy
        // < 50 bits: weak
        // 50-75 bits: medium
        // > 75 bits: strong

        if (entropy < 50) return 33;
        if (entropy < 75) return 66;
        return 100;
    }

    updateStrength(strength) {
        this.strengthFill.style.width = strength + '%';

        if (strength < 50) {
            this.strengthFill.style.background = 'var(--strength-weak)';
            this.strengthText.textContent = this.translations[this.currentLang].weak;
            this.strengthText.style.color = 'var(--strength-weak)';
        } else if (strength < 75) {
            this.strengthFill.style.background = 'var(--strength-medium)';
            this.strengthText.textContent = this.translations[this.currentLang].medium;
            this.strengthText.style.color = 'var(--strength-medium)';
        } else {
            this.strengthFill.style.background = 'var(--strength-strong)';
            this.strengthText.textContent = this.translations[this.currentLang].strong;
            this.strengthText.style.color = 'var(--strength-strong)';
        }
    }

    async copyToClipboard(password = null) {
        const textToCopy = password || this.passwordDisplay.value;

        if (!textToCopy) return;

        try {
            await navigator.clipboard.writeText(textToCopy);
            this.showCopyNotification();

            // Animate copy button
            if (!password) {
                this.copyBtn.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    this.copyBtn.style.transform = 'scale(1)';
                }, 200);
            }

        } catch (err) {
            // Fallback for older browsers
            const tempInput = document.createElement('input');
            tempInput.value = textToCopy;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);
            this.showCopyNotification();
        }
    }

    showCopyNotification() {
        this.copyNotification.classList.add('show');

        setTimeout(() => {
            this.copyNotification.classList.remove('show');
        }, 2000);
    }

    addToHistory(password) {
        let history = JSON.parse(localStorage.getItem('passwordHistory') || '[]');

        // Don't add duplicates
        if (history.includes(password)) return;

        // Add to beginning
        history.unshift(password);

        // Keep only last N passwords
        history = history.slice(0, this.maxHistory);

        localStorage.setItem('passwordHistory', JSON.stringify(history));
        this.displayHistory();
    }

    loadHistory() {
        this.displayHistory();
    }

    displayHistory() {
        const history = JSON.parse(localStorage.getItem('passwordHistory') || '[]');

        if (history.length === 0) {
            this.historyList.innerHTML = `<p class="empty-message" data-ar="لا توجد كلمات مرور محفوظة بعد" data-en="No passwords saved yet">${this.currentLang === 'ar' ? 'لا توجد كلمات مرور محفوظة بعد' : 'No passwords saved yet'}</p>`;
            return;
        }

        this.historyList.innerHTML = history.map(pwd => `
            <div class="history-item">
                <span class="history-password">${pwd}</span>
                <button class="history-copy" onclick="passwordGen.copyToClipboard('${pwd}')" title="${this.currentLang === 'ar' ? 'نسخ' : 'Copy'}">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                </button>
            </div>
        `).join('');
    }

    clearHistory() {
        if (confirm(this.currentLang === 'ar' ? 'هل تريد مسح جميع كلمات المرور المحفوظة؟' : 'Clear all saved passwords?')) {
            localStorage.removeItem('passwordHistory');
            this.displayHistory();
        }
    }
}

// Initialize app when DOM is ready
let passwordGen;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        passwordGen = new PasswordGenerator();
    });
} else {
    passwordGen = new PasswordGenerator();
}

// Add smooth transitions to password display
document.addEventListener('DOMContentLoaded', () => {
    const passwordDisplay = document.getElementById('password-display');
    if (passwordDisplay) {
        passwordDisplay.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    }
});

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered successfully:', registration.scope);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    });
}
