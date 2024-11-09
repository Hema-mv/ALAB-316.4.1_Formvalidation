document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registration');
    const errorDisplay = document.getElementById('errorDisplay');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        console.log('here')
        const username = form.elements['username'].value.toLowerCase();
        const email = form.elements['email'].value.toLowerCase();
        const password = form.elements['password'].value;
        const passwordCheck = form.elements['passwordCheck'].value;
        const terms = form.elements['terms'].checked;

        let errors = [];

        // Username validation
        if (username.length < 4) {
            errors.push("Username must be at least 4 characters long.");
        }
        if (new Set(username).size < 2) {
            errors.push("Username must contain at least two unique characters.");
        }
        if (/[^a-z0-9]/i.test(username)) {
            errors.push("Username cannot contain special characters or whitespace.");
        }

        // Email validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.push("Email must be a valid email address.");
        }
        if (email.endsWith("@example.com")) {
            errors.push("Email cannot be from the domain 'example.com'.");
        }

        // Password validation
        if (password.length < 12) {
            errors.push("Password must be at least 12 characters long.");
        }
        if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
            errors.push("Password must contain at least one uppercase and one lowercase letter.");
        }
        if (!/\d/.test(password)) {
            errors.push("Password must contain at least one number.");
        }
        if (!/[^a-zA-Z0-9]/.test(password)) {
            errors.push("Password must contain at least one special character.");
        }
        if (/password/i.test(password)) {
            errors.push("Password cannot contain the word 'password'.");
        }
        if (password.includes(username)) {
            errors.push("Password cannot contain the username.");
        }
        if (password !== passwordCheck) {
            errors.push("Passwords must match.");
        }

        // Terms and conditions validation
        if (!terms) {
            errors.push("You must accept the terms and conditions.");
        }

        // Display errors or store data
        if (errors.length > 0) {
            errorDisplay.innerHTML = errors.join('<br>');
            errorDisplay.style.display = 'block';
        } else {
            errorDisplay.style.display = 'none';
            const users = JSON.parse(localStorage.getItem('users')) || {};
            if (users[username]) {
                errorDisplay.innerHTML = "That username is already taken.";
                errorDisplay.style.display = 'block';
            } else {
                users[username] = { email, password };
                localStorage.setItem('users', JSON.stringify(users));
                form.reset();
                alert("Registration successful!");
            }
        }
    });
});
