document.addEventListener('DOMContentLoaded', function () {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));

    if (user) {
        document.getElementById('full-name').value = user.name;
        document.getElementById('email').value = user.email;
        document.getElementById('phone').value = user.phone;
    }

    function validateStep(step) {
        let isValid = true;
        const inputs = document.querySelectorAll(`#${step} input, #${step} textarea, #${step} select`);
        inputs.forEach(input => {
            if (!input.checkValidity()) {
                isValid = false;
                const error = input.nextElementSibling;
                if (!error || !error.classList.contains('error-message')) {
                    const errorMessage = document.createElement('span');
                    errorMessage.classList.add('error-message');
                    errorMessage.textContent = input.validationMessage;
                    input.after(errorMessage);
                }
            } else {
                const error = input.nextElementSibling;
                if (error && error.classList.contains('error-message')) {
                    error.remove();
                }
            }
        });
        return isValid;
    }

    function updateProgress(step) {
        const totalSteps = 4;
        document.getElementById('progress-bar').style.width = `${(step / totalSteps) * 100}%`;
    }

    function togglePaymentSection(method) {
        // Ocultar todas las secciones
        document.querySelectorAll('.payment-section').forEach(section => {
            section.style.display = 'none';
        });

        // Mostrar la sección correspondiente
        const selectedSection = document.getElementById(`${method}-section`);
        if (selectedSection) {
            selectedSection.style.display = 'block';
        }
    }

    updateProgress(1);

    document.getElementById('next-step-1').addEventListener('click', function () {
        if (validateStep('step-1')) {
            document.getElementById('step-1').style.display = 'none';
            document.getElementById('step-2').style.display = 'block';
            updateProgress(2);
        }
    });

    document.getElementById('next-step-2').addEventListener('click', function () {
        if (validateStep('step-2')) {
            document.getElementById('step-2').style.display = 'none';
            document.getElementById('step-3').style.display = 'block';
            updateProgress(3);
        }
    });
    document.getElementById('next-step-3').addEventListener('click', function (event) {
        event.preventDefault();
        if (validateStep('step-3')) {
            document.getElementById('step-3').style.display = 'none';
            document.getElementById('step-4').style.display = 'block';
            updateProgress(4);
        }
    });
    document.getElementById('payment-method').addEventListener('change', function (event) {
        togglePaymentSection(event.target.value);
    });

    document.getElementById('submit-form').addEventListener('click', function (event) {
        event.preventDefault();
        if (validateStep('step-4')) {
            document.getElementById('step-4').style.display = 'none';
            document.getElementById('step-5').style.display = 'block';
            document.getElementById('confirmation-email').textContent = document.getElementById('email').value;
            updateProgress(5);
        }
    });

    document.getElementById('back-home').addEventListener('click', function (event) {
        event.preventDefault();
        window.location.href = '/index.html';
    });
});
