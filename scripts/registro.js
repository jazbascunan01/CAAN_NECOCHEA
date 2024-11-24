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
        const passwordInput = document.getElementById("password");
        const confirmPasswordInput = document.getElementById("confirm-password");

        if (!validatePassword(password)) {
            isValid = false;
            const errorSpan = passwordInput.nextElementSibling;
            if (errorSpan && errorSpan.classList.contains('error-message')) {
                errorSpan.textContent = "La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula y un número.";
            } else {
                const span = document.createElement('span');
                span.classList.add('error-message');
                span.style.color = 'red';
                span.textContent = "La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula y un número.";
                passwordInput.after(span);
            }
        }

        if (password !== confirmPassword) {
            isValid = false;
            const errorSpan = confirmPasswordInput.nextElementSibling;
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


function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/; // Expresión regular para la validación
    return passwordRegex.test(password);
}

function updateProgress(step) {
    const totalSteps = 5;
    const progressBar = document.getElementById("progress-bar");
    const progressPercentage = (step / totalSteps) * 100;
    progressBar.style.width = `${progressPercentage}%`;
}

updateProgress(1);

document.getElementById("next-step-1").addEventListener("click", function() {
    if (validateStep("step-1")) {
        document.getElementById("step-1").style.display = "none";
        document.getElementById("step-2").style.display = "block";
        updateProgress(2);
    }
});

document.getElementById("next-step-2").addEventListener("click", function() {
    if (validateStep("step-2")) {
        document.getElementById("step-2").style.display = "none";
        document.getElementById("step-3").style.display = "block";
        updateProgress(3);
    }
});

document.getElementById("next-step-3").addEventListener("click", function() {
    if (validateStep("step-3")) {
        document.getElementById("step-3").style.display = "none";
        document.getElementById("step-4").style.display = "block";
        updateProgress(4);
    }
});

document.getElementById("submit-form").addEventListener("click", function(event) {
    event.preventDefault();

    if (validateStep("step-4")) {
        const email = document.getElementById("email").value;
        document.getElementById("confirmation-email").textContent = email;

        document.getElementById("step-4").style.display = "none";
        document.getElementById("step-5").style.display = "block";
        updateProgress(5);
    }
});

document.getElementById("back-home").addEventListener("click", function(event) {
    event.preventDefault();
    window.location.href = "/index.html";
});
// Botón Cancelar
document.querySelectorAll(".btn-cancel").forEach(button => {
    button.addEventListener("click", function () {
        window.location.href = "index.html";
    });
});
document.querySelectorAll(".btn-cancel_1").forEach(button => {
    button.addEventListener("click", function () {
        window.location.href = "index.html";
    });
});

// Botones Anterior
document.getElementById("previous-step-2").addEventListener("click", function () {
    document.getElementById("step-2").style.display = "none";
    document.getElementById("step-1").style.display = "block";
    updateProgress(1);
});
document.getElementById("previous-step-3").addEventListener("click", function () {
    document.getElementById("step-3").style.display = "none";
    document.getElementById("step-2").style.display = "block";
    updateProgress(2);
});
document.getElementById("previous-step-4").addEventListener("click", function () {
    document.getElementById("step-4").style.display = "none";
    document.getElementById("step-3").style.display = "block";
    updateProgress(2);
});