function validateStep(step) {
    let isValid = true;
    const inputs = document.querySelectorAll(`#${step} input`);
    
    inputs.forEach(input => {
        const errorSpan = input.nextElementSibling;
        if (!input.checkValidity()) {
            isValid = false;
            if (errorSpan && errorSpan.classList.contains('error-message')) {
                errorSpan.textContent = input.validationMessage;
            } else {
                const span = document.createElement('span');
                span.classList.add('error-message');
                span.style.color = 'red';
                span.textContent = input.validationMessage;
                input.after(span);
            }
        } else if (errorSpan && errorSpan.classList.contains('error-message')) {
            errorSpan.textContent = '';
        }
    });

    if (step === "step-2") {
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;
        const confirmPasswordInput = document.getElementById("confirm-password");
        const errorSpan = confirmPasswordInput.nextElementSibling;

        if (password !== confirmPassword) {
            isValid = false;
            if (errorSpan && errorSpan.classList.contains('error-message')) {
                errorSpan.textContent = "Las contraseñas no coinciden.";
            } else {
                const span = document.createElement('span');
                span.classList.add('error-message');
                span.style.color = 'red';
                span.textContent = "Las contraseñas no coinciden.";
                confirmPasswordInput.after(span);
            }
        }
    }

    return isValid;
}


document.getElementById("next-step-1").addEventListener("click", function() {
    if (validateStep("step-1")) {
        document.getElementById("step-1").style.display = "none";
        document.getElementById("step-2").style.display = "block";
    }
});

document.getElementById("next-step-2").addEventListener("click", function() {
    if (validateStep("step-2")) {
        document.getElementById("step-2").style.display = "none";
        document.getElementById("step-3").style.display = "block";
    }
});

document.getElementById("next-step-3").addEventListener("click", function() {
    if (validateStep("step-3")) {
        document.getElementById("step-3").style.display = "none";
        document.getElementById("step-4").style.display = "block";
    }
});

document.getElementById("submit-form").addEventListener("click", function(event) {
    event.preventDefault();

    if (validateStep("step-4")) {
        const email = document.getElementById("email").value;
        document.getElementById("confirmation-email").textContent = email;

        document.getElementById("step-4").style.display = "none";
        document.getElementById("step-5").style.display = "block";
    }
});

document.getElementById("back-home").addEventListener("click", function(event) {
    event.preventDefault();
    window.location.href = "/index.html";
});