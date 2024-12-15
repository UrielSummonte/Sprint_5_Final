document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("add-pais-form");

  form.addEventListener("submit", async (event) => {
    // Evita que el formulario se envíe de forma tradicional
    event.preventDefault();

    // Recoge los datos del formulario
    const formData = new FormData(form);
    // Convierte el form a un objeto literal js
    const data = Object.fromEntries(formData.entries());
    const mapasFormateados = data.mapas.split(",").map((mapa) => mapa.trim()); // Dividir por comas y eliminar espacios

    // Función como arrow function
    const primeraLetraMayuscula = (cadena) =>
      cadena
        ? cadena
            .toLowerCase()
            .split(" ")
            .map(
              (palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1)
            )
            .join(" ")
        : null;

    console.log("datos a enviar", data);

    // Transformar los datos para cumplir con el modelo
    const datosACargar = {
      name: {
        common: primeraLetraMayuscula(data.nombreComun) || null,
        official: primeraLetraMayuscula(data.nombreOficial) || null,
        nativeName: {
          spa: {
            common: primeraLetraMayuscula(data.nombreComun) || null,
            official: primeraLetraMayuscula(data.nombreOficial) || null,
          },
        },
      },
      capital: primeraLetraMayuscula(data.nombreCapital)
        ? [primeraLetraMayuscula(data.nombreCapital)]
        : [],
      borders: data.fronteras
        ? data.fronteras
            .split(",")
            .map((frontera) => frontera.trim().toUpperCase()) // Convertir a mayúsculas
        : [],
      area: data.area ? parseFloat(data.area) : 0,
      population: data.poblacion ? parseInt(data.poblacion, 10) : 0,
      gini: data.gini ? { latest: parseFloat(data.gini) } : {},
      creador: primeraLetraMayuscula(data.creador) || "Desconocido",
      maps: {
        googleMaps: mapasFormateados[0] || null,
        openStreetMaps: mapasFormateados[1] || null,
      },
      timezones: data.zonasHorarias
        ? data.zonasHorarias
            .split(",") // Si es un string separado por comas
            .map((zona) => zona.trim().toUpperCase()) // Convertir a mayúsculas
        : [],
      flags: {
        alt: "Bandera del pais" || null,
        png: data.bandera || null,
        svg: data.bandera || null,
      },
    };

    console.log("datos a enviar", datosACargar);

    try {
      // Realiza la solicitud POST al backend
      const response = await fetch("/api/paises/cargar/nuevo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosACargar),
      });
      if (response.ok) {
        const result = await response.json();
        // Limpia el formulario después de enviar
        form.reset();
        // Mostrar alerta de éxito
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "País creado con éxito",
          showConfirmButton: false,
          timer: 2200,
        });
        // Redirige a la página de listado de superhéroes
        setTimeout(() => {
          window.location.href = "/api/paises/listar";
        }, 2200);
      } else {
        const errorData = await response.json();
        console.error("Errores del servidor:", errorData.errors);
        console.log("Hubo un problema al agregar el país.");
        // Mostrar alerta de problema
        Swal.fire({
          title: "Hubo un problema al agregar el país",
          text: "Verifique que los campos cumplen las condiciones",
          icon: "warning",
        });
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      alert("No se pudo conectar con el servidor.");
    }
  });

  // Captura el evento de clic en el botón de cancelar
  document.getElementById("cancel-btn").addEventListener("click", function (e) {
    e.preventDefault();

    // Mostrar SweetAlert de confirmación
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Los cambios no guardados se perderán.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Sí, cancelar",
    }).then((result) => {
      // Si el usuario confirma, redirige al listado de superhéroes
      if (result.isConfirmed) {
        window.location.href = "/api/paises/listar";
      }
    });
  });
});
