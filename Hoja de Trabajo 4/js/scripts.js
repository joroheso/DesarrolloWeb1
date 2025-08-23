const nombres = ["Ana", "Carlos", "Lucía", "Miguel", "Sofía", "David"];
const comentarios = [
  "Una experiencia inolvidable.",
  "Muy bien organizado.",
  "El personal fue muy amable.",
  "Repetiría sin dudarlo.",
  "Excelente atención al detalle.",
  "Actividades muy divertidas."
];

function mostrarTabla(id) {
  document.querySelectorAll(".tabla").forEach(tabla => tabla.style.display = "none");
  document.getElementById(id).style.display = "block";
}

function mostrarComentarios() {
  const contenedor = document.getElementById("comentarios");
  contenedor.innerHTML = "";

  const nombresAleatorios = [...nombres].sort(() => 0.5 - Math.random()).slice(0, 3);
  const comentariosAleatorios = [...comentarios].sort(() => 0.5 - Math.random()).slice(0, 3);

  for (let i = 0; i < 3; i++) {
    const col = document.createElement("div");
    col.className = "col-md-4";
    col.innerHTML = `
      <div class="card card-custom p-3">
        <h5>${nombresAleatorios[i]}</h5>
        <p class="text-muted">${comentariosAleatorios[i]}</p>
      </div>
    `;
    contenedor.appendChild(col);
  }
}

document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const fecha = document.getElementById("fecha").value;
  const email = document.getElementById("email").value.trim();
  const mensaje = document.getElementById("mensaje").value.trim();
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (nombre && fecha && emailValido && mensaje) {
    const modal = new bootstrap.Modal(document.getElementById('confirmModal'));
    modal.show();
    this.reset();
  } else {
    alert("Por favor completa todos los campos correctamente.");
  }
});

window.onload = mostrarComentarios;