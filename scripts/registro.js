document.getElementById("next-step-1").addEventListener("click", function() {
    document.getElementById("step-1").style.display = "none";
    document.getElementById("step-2").style.display = "block";
});

document.getElementById("next-step-2").addEventListener("click", function() {
    document.getElementById("step-2").style.display = "none";
    document.getElementById("step-3").style.display = "block";
});

document.getElementById("next-step-3").addEventListener("click", function() {
    document.getElementById("step-3").style.display = "none";
    document.getElementById("step-4").style.display = "block";
});

document.getElementById("submit-form").addEventListener("click", function(event) {
    event.preventDefault();
    alert("Formulario completado. Redirigiendo al siguiente paso.");
    // Aquí se puede agregar la lógica para enviar el formulario
});
