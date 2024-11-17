function validateStep(step) {
    let isValid = true;
    const inputs = document.querySelectorAll(`#${step} input, #${step} select, #${step} textarea`);

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
    
    // Validación adicional para el paso 2 (disponibilidad)
    if (step === "step-2") {
        const availability = document.getElementById("availability");
        if (!availability.value) {
            isValid = false;
            const errorSpan = availability.nextElementSibling;
            if (errorSpan && errorSpan.classList.contains('error-message')) {
                errorSpan.textContent = "Debes seleccionar tu disponibilidad.";
            } else {
                const span = document.createElement('span');
                span.classList.add('error-message');
                span.style.color = 'red';
                span.textContent = "Debes seleccionar tu disponibilidad.";
                availability.after(span);
            }
        }
    }

    // Validación adicional para el paso 3 (experiencia previa)
    if (step === "step-3") {
        const experience = document.getElementById("experience");
        if (experience && experience.value.trim().length < 20) {
            isValid = false;
            const errorSpan = experience.nextElementSibling;
            if (errorSpan && errorSpan.classList.contains('error-message')) {
                errorSpan.textContent = "La experiencia debe tener al menos 20 caracteres.";
            } else {
                const span = document.createElement('span');
                span.classList.add('error-message');
                span.style.color = 'red';
                span.textContent = "La experiencia debe tener al menos 20 caracteres.";
                experience.after(span);
            }
        }
    }

    // Validación adicional para el paso 4 (términos y condiciones)
    if (step === "step-4") {
        const termsInput = document.getElementById("terms-input");
        if (!termsInput.checked) {
            isValid = false;
            const termsLabel = document.getElementById("terms");
            const errorSpan = document.createElement('span');
            errorSpan.classList.add('error-message');
            errorSpan.style.color = 'red';
            termsLabel.after(errorSpan);
        }
    }

    return isValid;
}

function updateProgress(step) {
    const totalSteps = 5;
    const progressBar = document.getElementById("progress-bar");
    const progressPercentage = (step / totalSteps) * 100;
    progressBar.style.width = `${progressPercentage}%`;
}

const user = JSON.parse(localStorage.getItem('loggedInUser'));

    if (user) {
        // Prellenar el formulario con los datos del usuario
        document.getElementById('full-name').value = user.name;
        document.getElementById('email').value = user.email;
        document.getElementById('phone').value = user.phone;
        document.getElementById('address').value = user.address;
    }

updateProgress(1);

document.getElementById("next-step-1").addEventListener("click", function () {
    if (validateStep("step-1")) {
        document.getElementById("step-1").style.display = "none";
        document.getElementById("step-2").style.display = "block";
        updateProgress(2);
    }
});

document.getElementById("next-step-2").addEventListener("click", function () {
    if (validateStep("step-2")) {
        document.getElementById("step-2").style.display = "none";
        document.getElementById("step-3").style.display = "block";
        updateProgress(3);
    }
});

document.getElementById("next-step-3").addEventListener("click", function () {
    if (validateStep("step-3")) {
        document.getElementById("step-3").style.display = "none";
        document.getElementById("step-4").style.display = "block";
        updateProgress(4);
    }
});

document.getElementById("submit-form").addEventListener("click", function (event) {
    event.preventDefault();

    if (validateStep("step-4")) {
        const email = document.getElementById("email").value;
        document.getElementById("confirmation-email").textContent = email;

        document.getElementById("step-4").style.display = "none";
        document.getElementById("step-5").style.display = "block";
        updateProgress(5);
    }
});

document.getElementById("back-home").addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "/index.html";
});
