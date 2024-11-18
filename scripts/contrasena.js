document.addEventListener('DOMContentLoaded', function() {
    // Función para validar los pasos del formulario
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

        return isValid;
    }

    function updateProgress(step) {
        const totalSteps = 2;
        const progressBar = document.getElementById("progress-bar");
        const progressPercentage = (step / totalSteps) * 100;
        progressBar.style.width = `${progressPercentage}%`;
    }

    updateProgress(1);

    document.getElementById("login-form").addEventListener("submit", function(event) {
        event.preventDefault();

        if (validateStep("step-1")) {
            const email = document.getElementById("email").value;
            document.getElementById("confirmation-email").textContent = email;

            document.getElementById("step-1").style.display = "none";
            document.getElementById("step-5").style.display = "block";
            updateProgress(2);
        }
    });

    document.getElementById("back-home").addEventListener("click", function(event) {
        event.preventDefault();
        window.location.href = "/index.html";
    });
});