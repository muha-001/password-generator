// Password Generator Logic
class PasswordGenerator {
    constructor() {
        this.characterSets = {
            uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            lowercase: 'abcdefghijklmnopqrstuvwxyz',
            numbers: '0123456789',
            symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
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
        
        // Event Listeners
        this.lengthSlider.addEventListener('input', () => this.updateLength());
        this.generateBtn.addEventListener('click', () => this.generatePassword());
        this.copyBtn.addEventListener('click', () => this.copyToClipboard());
        
        // Generate password on checkbox change
        [this.uppercaseCheck, this.lowercaseCheck, this.numbersCheck, this.symbolsCheck].forEach(checkbox => {
            checkbox.addEventListener('change', () => this.generatePassword());
        });
        
        // Generate initial password
        this.generatePassword();
    }
    
    updateLength() {
        this.lengthValue.textContent = this.lengthSlider.value;
        this.generatePassword();
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
            this.strengthText.textContent = 'ضعيفة';
            this.strengthText.style.color = 'var(--strength-weak)';
        } else if (strength < 75) {
            this.strengthFill.style.background = 'var(--strength-medium)';
            this.strengthText.textContent = 'متوسطة';
            this.strengthText.style.color = 'var(--strength-medium)';
        } else {
            this.strengthFill.style.background = 'var(--strength-strong)';
            this.strengthText.textContent = 'قوية';
            this.strengthText.style.color = 'var(--strength-strong)';
        }
    }
    
    async copyToClipboard() {
        const password = this.passwordDisplay.value;
        
        if (!password) return;
        
        try {
            await navigator.clipboard.writeText(password);
            this.showCopyNotification();
            
            // Animate copy button
            this.copyBtn.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.copyBtn.style.transform = 'scale(1)';
            }, 200);
            
        } catch (err) {
            // Fallback for older browsers
            this.passwordDisplay.select();
            document.execCommand('copy');
            this.showCopyNotification();
        }
    }
    
    showCopyNotification() {
        this.copyNotification.classList.add('show');
        
        setTimeout(() => {
            this.copyNotification.classList.remove('show');
        }, 2000);
    }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new PasswordGenerator();
    });
} else {
    new PasswordGenerator();
}

// Add smooth transitions to password display
document.addEventListener('DOMContentLoaded', () => {
    const passwordDisplay = document.getElementById('password-display');
    passwordDisplay.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
});
