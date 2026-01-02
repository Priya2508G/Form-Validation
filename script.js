// ================== ELEMENT SELECTION ==================
const form = document.getElementById("userForm");

const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const togglePassword = document.getElementById("togglePassword");
const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");

// Error message elements
const errors = {
    name: document.getElementById("nameError"),
    email: document.getElementById("emailError"),
    phone: document.getElementById("phoneError"),
    password: document.getElementById("passwordError"),
    confirmPassword: document.getElementById("confirmPasswordError")
};

// ================== HELPER FUNCTIONS ==================

// Show error message
function showError(element, message) {
    element.textContent = message;
}

// Clear error message
function clearError(element) {
    element.textContent = "";
}

// ================== VALIDATION FUNCTIONS ==================

// Validate Full Name
function validateName() {
    if (fullName.value.trim().length < 5) {
        showError(errors.name, "Name must be at least 5 characters");
        return false;
    }
    clearError(errors.name);
    return true;
}

// Validate Email
function validateEmail() {
    if (!email.value.includes("@")) {
        showError(errors.email, "Enter correct email");
        return false;
    }
    clearError(errors.email);
    return true;
}

// Validate Phone Number
function validatePhone() {
    if (
        phone.value.length !== 10 ||
        phone.value === "1234567890" ||
        isNaN(phone.value)
    ) {
        showError(errors.phone, "Enter valid 10-digit phone number");
        return false;
    }
    clearError(errors.phone);
    return true;
}

// Validate Password
function validatePassword() {
    const passwordValue = password.value.toLowerCase();
    const nameValue = fullName.value.toLowerCase();

    if (
        password.value.length < 8 ||
        passwordValue === "password" ||
        passwordValue === nameValue
    ) {
        showError(errors.password, "Password is not strong");
        return false;
    }
    clearError(errors.password);
    return true;
}

// Validate Confirm Password
function validateConfirmPassword() {
    if (password.value !== confirmPassword.value) {
        showError(errors.confirmPassword, "Passwords do not match");
        return false;
    }
    clearError(errors.confirmPassword);
    return true;
}

// ================== PASSWORD TOGGLE ==================

// Show / Hide Password
togglePassword.addEventListener("click", function () {
    if (password.type === "password") {
        password.type = "text";
        togglePassword.textContent = "Hide";
    } else {
        password.type = "password";
        togglePassword.textContent = "Show";
    }
});

// Show / Hide Confirm Password
toggleConfirmPassword.addEventListener("click", function () {
    if (confirmPassword.type === "password") {
        confirmPassword.type = "text";
        toggleConfirmPassword.textContent = "Hide";
    } else {
        confirmPassword.type = "password";
        toggleConfirmPassword.textContent = "Show";
    }
});

// ================== EVENT LISTENERS ==================

// Real-time validation
fullName.addEventListener("change", validateName);
email.addEventListener("change", validateEmail);
phone.addEventListener("change", validatePhone);
password.addEventListener("change", validatePassword);
confirmPassword.addEventListener("change", validateConfirmPassword);

// Form submit validation
form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default submission

    const validations = [
        validateName(),
        validateEmail(),
        validatePhone(),
        validatePassword(),
        validateConfirmPassword()
    ];

    // Loop to check validation results
    for (let i = 0; i < validations.length; i++) {
        if (!validations[i]) {
            return;
        }
    }

    alert("Form submitted successfully! ✅");
    form.reset();

    // Reset toggle text
    togglePassword.textContent = "Show";
    toggleConfirmPassword.textContent = "Show";
});
