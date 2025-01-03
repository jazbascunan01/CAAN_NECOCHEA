document.addEventListener('DOMContentLoaded', function () {
    const nextStep1Btn = document.getElementById('next-step-1');
    const nextStep2Btn = document.getElementById('next-step-2');
    const nextStep3Btn = document.getElementById('next-step-3');
    const backHomeBtn = document.getElementById('back-home');
    const requestForm = document.getElementById('request-form');
    const progressBar = document.getElementById('progress-bar');

    let currentStep = 1;

     // Verificar si el usuario está logueado
     const user = JSON.parse(localStorage.getItem('loggedInUser'));

     if (user) {
         // Prellenar el formulario con los datos del usuario
         document.getElementById('full-name').value = user.name;
         document.getElementById('email').value = user.email;
     }
     
  

    // Actualiza la barra de progreso
    function updateProgress() {
        progressBar.style.width = `${(currentStep - 1) * 25}%`;
    }

    // Muestra la siguiente sección
    function showNextStep() {
        const steps = document.querySelectorAll('.step');
        steps.forEach((step, index) => {
            if (index + 1 === currentStep) {
                step.style.display = 'block';
            } else {
                step.style.display = 'none';
            }
        });
    }

    // Validación de campos de texto con mensaje de error
    function validateStep(step) {
        let isValid = true;
        const inputs = document.querySelectorAll(`#${step} input, #${step} select`);

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

    // Actualizar el progreso en la barra
    function updateProgress(step) {
        const totalSteps = 4;
        const progressPercentage = (step / totalSteps) * 100;
        progressBar.style.width = `${progressPercentage}%`;
    }

    // Avanzar al siguiente paso
    nextStep1Btn.addEventListener('click', function () {
        if (validateStep("step-1")) {
            currentStep++;
            updateProgress(currentStep);
            showNextStep();
        }
    });

    nextStep2Btn.addEventListener('click', function () {
        if (validateStep("step-2")) {
            currentStep++;
            updateProgress(currentStep);
            showNextStep();
        }
    });

    nextStep3Btn.addEventListener('click', function () {
        if (validateStep("step-3")) {
            currentStep++;
            updateProgress(currentStep);
            showNextStep();
        }
    });


    // Volver al inicio
    backHomeBtn.addEventListener('click', function (event) {
        event.preventDefault();
        window.location.href = 'index.html';
    });

    // Mostrar el primer paso al cargar
    showNextStep();
});
