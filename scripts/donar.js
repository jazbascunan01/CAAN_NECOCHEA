const metodoPago = document.getElementById("metodo-pago");
const tarjetaInfo = document.getElementById("tarjeta-info");
const transferenciaInfo = document.getElementById("transferencia-info");
const paypalInfo = document.getElementById("paypal-info");

metodoPago.addEventListener("change", function () {
    tarjetaInfo.style.display = "none";
    transferenciaInfo.style.display = "none";
    paypalInfo.style.display = "none";

    if (metodoPago.value === "tarjeta") {
        tarjetaInfo.style.display = "block";
    } else if (metodoPago.value === "transferencia") {
        transferenciaInfo.style.display = "block";
    } else if (metodoPago.value === "paypal") {
        paypalInfo.style.display = "block";
    }
});
document.getElementById("submit-form").addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("step-1donacion").style.display = "none";
    document.getElementById("formulario-don").style.display = "none";
    document.getElementById("formulario-d").style.display = "none";
    document.getElementById("step-5").style.display = "block";
});

document.getElementById("back-home").addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "/index.html";
});