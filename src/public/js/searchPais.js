document
  .getElementById("formBusqueda")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const nombre = document.getElementById("nombreBusqueda").value.trim();

    // Limpiar el campo de búsqueda antes de hacer la búsqueda
    document.getElementById("nombreBusqueda").value = "";

    if (nombre === "") {
      Swal.fire({
        icon: "warning",
        title: "Por favor, ingresa un nombre para buscar.",
        timer: 2500,
      });
      return;
    }

    try {
      const response = await fetch(
        `/api/paises/buscar/name.common/${encodeURIComponent(nombre)}`
      );
      const data = await response.json();

      const resultadoDiv = document.getElementById("resultadoBusqueda");
      resultadoDiv.innerHTML = "";

      if (response.ok && data.length > 0) {
        // Mostrar tarjeta del pais encontrado
        const pais = data[0];

        resultadoDiv.innerHTML = `
          <div class="card shadow-lg mb-4 mx-auto" style="max-width: 500px; border: 2px solid #007bff; border-radius: 10px;">
          <div class="card-header text-center" style="background-color: #007bff; color: white;">
          <img 
          src="${pais.flags.svg || pais.flags.png}" 
          alt="Bandera de ${pais.name.common}" 
          class="card-img-top bandera" 
          >
          <h4 class="card-title font-weight-bold" style="text-transform: uppercase;">${
              pais.name.common
            }</h4>
          </div>
          <div class="card-body" style="background-color: #f8f9fa;">
             <p><strong>Area:</strong> ${pais.area} </p>
              <p><strong>Limites:</strong> ${pais.borders ? pais.borders.join(', ') : 'No disponible'} </p>
              <p><strong>Capital:</strong> ${pais.capital || 'No disponible'} </p>
              <p><strong>Continente:</strong> ${pais.continents ? pais.continents.join(', ') : 'No disponible'} </p>
              <p><strong>Gini:</strong> ${pais.gini ? Object.values(pais.gini).join(', ') : 'No disponible'} </p>
              <p><strong>Lenguajes:</strong> ${pais.languages ? Object.values(pais.languages).join(', ') : 'No disponible'} </p>
              <p><strong>Maps:</strong>
              ${pais.maps ? Object.entries(pais.maps).map(([key, value]) => `<a href="${value}" target="_blank">${key}</a>`).join(' | ') : 'No disponible'}
              </p>              
              <p><strong>Población:</strong> ${pais.population} </p>
              <p><strong>Creador:</strong> ${pais.creador || 'No disponible'} </p>
          </div>
        </div>
        `;
      } else {
        // Mostrar mensaje de error
        resultadoDiv.innerHTML = `
          <div class="alert alert-danger text-center" role="alert">
            No se encontró un pais con el nombre <strong>${nombre}</strong>.
          </div>
        `;
      }

      // Mostrar resultado durante 4 segundos
      setTimeout(() => {
        resultadoDiv.innerHTML = "";
      }, 3400);
    } catch (error) {
      console.error("Error al buscar el pais:", error);
      Swal.fire({
        icon: "error",
        title: "Error al realizar la búsqueda.",
        text: error.message,
      });
    }
  });
