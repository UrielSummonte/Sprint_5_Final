document.addEventListener("DOMContentLoaded", () => {
  // Captura el evento de clic en el botón de cargar
  document
    .getElementById("boton-cargar")
    .addEventListener("click", function (e) {
      e.preventDefault();

      // Consumir la API de todos los países
      fetch("https://restcountries.com/v3.1/all")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al obtener los datos");
          }
          return response.json();
        })
        .then((data) => {
          // Filtrar los países que incluyen el idioma español
          const paisesHablaEspaniol = data.filter((pais) => {
            return (
              pais.languages &&
              Object.values(pais.languages).includes("Spanish")
            );
          });

          // Mostrar todos los paises que hablan español
          //console.log("Países que hablan español:", paisesHablaEspaniol);

          // Eliminar las propiedades solicitadas
          const paisesHablaEspaniolSanitizado = paisesHablaEspaniol.map(
            (pais) => {
              // Uso de destructuración para eliminar las propiedades
              const {
                translations,
                tld,
                cca2,
                ccn3,
                cca3,
                cioc,
                t1d,
                altSpellings,
                car,
                coatOfArms,
                postalCode,
                demonyms,
                ...rest
              } = pais;
              // Retorno los paises sanitizado y agrego propiedad "creador"
              return { ...rest, creador: "Uriel Summonte" };
            }
          );

          // Mostrar todos los paises que hablan español sanitizado
          console.log(
            "Países que hablan español sanitizado:",
            paisesHablaEspaniolSanitizado
          );

          // Mostrar los nombres de los países que hablan español sanitizado
          // console.log("Nombres de Países que hablan español sanitizado:");
          // paisesHablaEspaniolSanitizado.forEach((pais) => {
          //   console.log(pais.name.common);
          // });

          const test = paisesHablaEspaniolSanitizado.slice(0, 9);
          // console.log("test", test);

          // Crear un array de promesas para los fetch
          const promesas = test.map(
            (pais) =>
              fetch("http://localhost:3000/api/paises/cargar", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(pais),
              })
                .then((response) => {
                  if (!response.ok) {
                    throw new Error("Error al enviar el dato al servidor");
                  }
                  return true; // Indica que se cargó correctamente
                })
                .catch(() => false) // Indica que falló
          );

          // Ejecutar todas las promesas y manejar el resultado
          Promise.all(promesas).then((resultados) => {
            const exitos = resultados.filter((resultado) => resultado).length;

            if (exitos > 0) {
              // Mostrar mensaje de éxito si al menos uno se cargó
              Swal.fire({
                title: "¡Éxito!",
                text: `Se cargaron ${exitos} países correctamente.`,
                icon: "success",
                showConfirmButton: false,
                //confirmButtonText: "OK",
              });
              // Redirige a la página listado de paises después del tiempo de la alerta
              setTimeout(() => {
                window.location.href = "/api/paises/listar";
              }, 2200);
            } else {
              // Mostrar mensaje de error si todos fallaron
              Swal.fire({
                title: "Error",
                text: "No se pudo cargar ningún país.",
                icon: "error",
                confirmButtonText: "Entendido",
              });
            }
          });
        })
        .catch((error) => {
          console.error("Hubo un problema con la solicitud:", error);
        });
    });

  document
    .getElementById("boton-borrar")
    .addEventListener("click", async function (e) {
      e.preventDefault();
      try {
        // Realiza la solicitud DELETE al backend
        const response = await fetch("/api/paises/eliminar", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json(); // Parsear la respuesta como JSON

        if (response.ok) {
          // Mostrar alerta de éxito
          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: data.mensaje, // Usar el mensaje enviado desde el backend
            showConfirmButton: false,
            timer: 2200,
          });

          // Redirige a la página principal después del tiempo de la alerta
          setTimeout(() => {
            window.location.href = "/api/paises";
          }, 2200);
        } else {
          // Mostrar alerta de error
          Swal.fire({
            title: "Error",
            text:
              data.mensaje || "Hubo un problema al eliminar la base de datos.",
            icon: "warning",
          });
        }
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);

        // Mostrar alerta de error por problemas de conexión
        Swal.fire({
          title: "Error de conexión",
          text: "No se pudo conectar con el servidor. Por favor, inténtalo más tarde.",
          icon: "error",
          confirmButtonText: "Entendido",
        });
      }
    });

  document
    .getElementById("boton-listar")
    .addEventListener("click", async function (e) {
      e.preventDefault();
      try {
        const response = await fetch("/api/paises/listar");

        // Verificar si la respuesta es JSON o HTML
        const contentType = response.headers.get("content-type");

        if (response.ok) {
          if (contentType && contentType.includes("application/json")) {
            const data = await response.json();

            if (data.vacio) {
              // Mostrar alerta y redirigir si la lista está vacía
              Swal.fire({
                title: "Base de datos vacía",
                text: data.mensaje,
                icon: "warning",
                confirmButtonText: "Entendido",
              }).then(() => {
                window.location.href = data.redireccion;
              });
            }
          } else {
            // Si la respuesta es HTML, redirigir a la página renderizada
            window.location.href = "/api/paises/listar";
          }
        } else {
          // Mostrar alerta de error
          Swal.fire({
            title: "Error",
            text: "Hubo un problema al obtener los datos.",
            icon: "error",
          });
        }
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);

        // Mostrar alerta de error de conexión
        Swal.fire({
          title: "Error de conexión",
          text: "No se pudo conectar con el servidor. Por favor, inténtalo más tarde.",
          icon: "error",
          confirmButtonText: "Entendido",
        });
      }
    });
});
