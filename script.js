// Tab switching functionality
document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and forms
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
        
        // Add active class to clicked button and corresponding form
        button.classList.add('active');
        const tab = button.dataset.tab;
        document.getElementById(tab + 'Form').classList.add('active');
    });
});

// Password visibility toggle
document.querySelectorAll('.toggle-password').forEach(button => {
    button.addEventListener('click', () => {
        const input = button.previousElementSibling;
        const icon = button.querySelector('i');
        
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    });
});

// Password strength checker
const passwordInput = document.getElementById('registerPassword');
const strengthFill = document.querySelector('.strength-fill');
const strengthText = document.querySelector('.strength-text');

if (passwordInput) {
    passwordInput.addEventListener('input', () => {
        const password = passwordInput.value;
        let strength = 0;
        
        if (password.length >= 8) strength += 25;
        if (password.match(/[a-z]/)) strength += 25;
        if (password.match(/[A-Z]/)) strength += 25;
        if (password.match(/[0-9]/)) strength += 25;
        
        strengthFill.style.width = strength + '%';
        
        if (strength < 50) {
            strengthFill.style.backgroundColor = '#e74c3c';
            strengthText.textContent = 'Weak password';
        } else if (strength < 75) {
            strengthFill.style.backgroundColor = '#f39c12';
            strengthText.textContent = 'Medium password';
        } else {
            strengthFill.style.backgroundColor = '#27ae60';
            strengthText.textContent = 'Strong password';
        }
    });
}

// Form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        const errorMessage = input.parentElement.nextElementSibling;
        
        if (!input.value.trim()) {
            errorMessage.textContent = 'This field is required';
            isValid = false;
        } else if (input.type === 'email' && !input.value.match(/^[\w.-]+@[\w.-]+\.\w+$/)) {
            errorMessage.textContent = 'Please enter a valid email';
            isValid = false;
        } else {
            errorMessage.textContent = '';
        }
    });
    
    // Password confirmation validation
    const password = form.querySelector('#registerPassword');
    const confirmPassword = form.querySelector('#confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
        confirmPassword.parentElement.nextElementSibling.textContent = 'Passwords do not match';
        isValid = false;
    }
    
    return isValid;
}

// Login form submission
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (validateForm(e.target)) {
        const submitBtn = e.target.querySelector('.btn-primary');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            alert('Login successful! Welcome back.');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    }
});

// Register form submission
document.getElementById('registerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (validateForm(e.target)) {
        const submitBtn = e.target.querySelector('.btn-primary');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            alert('Account created successfully! Please check your email to verify.');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Switch to login tab
            document.querySelector('[data-tab="login"]').click();
        }, 1500);
    }
});

// Social login buttons
document.querySelectorAll('.social-btn').forEach(button => {
    button.addEventListener('click', () => {
        const platform = button.classList.contains('google') ? 'Google' : 'Facebook';
        alert(`Redirecting to ${platform} authentication...`);
    });
});

// Forgot password
document.querySelector('.forgot-password').addEventListener('click', (e) => {
    e.preventDefault();
    const email = prompt('Enter your email address:');
    if (email) {
        alert('Password reset link sent to your email!');
    }
});