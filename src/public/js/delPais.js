document.addEventListener("DOMContentLoaded", () => {
  const deleteButtons = document.querySelectorAll(".btn-danger");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      // Prevenir el envío del formulario de manera inmediata
      event.preventDefault();

      // Obtener el ID del superhéroe a eliminar
      const id = button.getAttribute("data-id");
      console.log("ID del pais a eliminar:", id);

      //Usar SweetAlert para preguntar si el usuario está seguro de eliminar
      Swal.fire({
        title: "¿Estás seguro?",
        text: "¡Esta acción no se puede deshacer!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          // Si el usuario confirma, realizar la solicitud de eliminación
          fetch(`/api/paises/eliminar/${id}`, {
            method: "DELETE",
          })
            .then((response) => {
              if (response.ok) {
                Swal.fire({
                  toast: true,
                  position: "top-end",
                  icon: "success",
                  title: "Pais eliminado con éxito",
                  showConfirmButton: false,
                  timer: 2200,
                });
                // Recargar la página después de la eliminación
                setTimeout(() => {
                  window.location.reload();
                }, 2200);
              } else {
                Swal.fire({
                  toast: true,
                  position: "top-end",
                  icon: "error",
                  title: "Hubo un problema al eliminar el pais",
                  showConfirmButton: false,
                  timer: 3500,
                });
              }
            })
            .catch((error) => {
              console.error("Error al eliminar el pais:", error);
              Swal.fire({
                toast: true,
                position: "top-end",
                icon: "error",
                title: "No se pudo eliminar el pais",
                showConfirmButton: false,
                timer: 3500,
              });
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "info",
            title: "Eliminación cancelada",
            showConfirmButton: false,
            timer: 3000,
          });
        }
      });
    });
  });
});
