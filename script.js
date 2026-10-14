const ENDPOINT = "http://18.213.233.132:8000/contactos";
const cuerpoTabla = document.querySelector("#contactos");
const estado = document.querySelector("#estado");
const botonActualizar = document.querySelector("#actualizar");
const columnas = ["id_contacto", "nombre", "apellido", "telefono", "correo", "ciudad", "categoria"];

function mostrarContactos(contactos) {
  cuerpoTabla.replaceChildren();

  for (const contacto of contactos) {
    const fila = document.createElement("tr");

    for (const columna of columnas) {
      const celda = document.createElement("td");
      celda.textContent = contacto[columna] ?? "—";
      fila.append(celda);
    }

    cuerpoTabla.append(fila);
  }
}

async function cargarContactos() {
  estado.textContent = "Cargando contactos…";
  estado.classList.remove("error");
  botonActualizar.disabled = true;

  try {
    const respuesta = await fetch(ENDPOINT);
    if (!respuesta.ok) {
      throw new Error(`La API respondió con el estado ${respuesta.status}.`);
    }

    const contactos = await respuesta.json();
    if (!Array.isArray(contactos)) {
      throw new Error("La respuesta de la API no tiene el formato esperado.");
    }

    mostrarContactos(contactos);
    estado.textContent = `${contactos.length} contacto${contactos.length === 1 ? "" : "s"} cargado${contactos.length === 1 ? "" : "s"}.`;
  } catch (error) {
    cuerpoTabla.replaceChildren();
    estado.textContent = `No se pudieron cargar los contactos. ${error.message} Revisa que la API esté disponible y permita solicitudes desde este sitio.`;
    estado.classList.add("error");
  } finally {
    botonActualizar.disabled = false;
  }
}

botonActualizar.addEventListener("click", cargarContactos);
cargarContactos();
