document.addEventListener("DOMContentLoaded", () => {
  // Selección de los campos del formulario

  const nombreComun = document.getElementById("nombreComun");
  const nombreOficial = document.getElementById("nombreOficial");
  const nombreCapital = document.getElementById("nombreCapital");
  const fronteras = document.getElementById("fronteras");
  const area = document.getElementById("area");
  const poblacion = document.getElementById("poblacion");
  const gini = document.getElementById("gini");
  const zonasHorarias = document.getElementById("zonasHorarias");
  const mapas = document.getElementById("mapas");
  const bandera = document.getElementById("bandera");
  const creador = document.getElementById("creador");

  // Función para mostrar mensajes de error
  const mostrarError = (campoError, mensaje) => {
    document.getElementById(campoError).textContent = mensaje;
  };

  // Función para eliminar espacios iniciales automáticamente
  const eliminarEspaciosIniciales = (campo) => {
    campo.value = campo.value.replace(/^\s+/, "");
  };

  // Validar texto con solo letras y espacios
  const validarSoloLetrasYEspacios = (valor) => {
    return /^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/.test(valor);
  };

  // Validar el Gini
  const validarGini = (valor) => {
    // Asegurarnos de que se use el punto como separador decimal
    valor = valor.replace(",", "."); // Reemplazar cualquier coma por punto
    return /^(100(\.00)?|\d{1,2}(\.\d{1,2})?)$/.test(valor); // Acepta hasta dos decimales
  };

  // Función para validar si contiene espacios
  const contieneEspacios = (valor) => {
    return /\s/.test(valor); // Verifica si hay cualquier espacio en blanco
  };

  // Validar nombreComun
  nombreComun.addEventListener("input", () => {
    eliminarEspaciosIniciales(nombreComun);
    const valor = nombreComun.value.trim();
    if (
      valor.length < 3 ||
      valor.length > 50 ||
      !validarSoloLetrasYEspacios(valor)
    ) {
      mostrarError(
        "nombreComunError",
        "Debe tener entre 3 y 50 caracteres y solo puede contener letras y espacios."
      );
    } else {
      mostrarError("nombreComunError", ""); // Limpia el error si es válido
    }
  });

  // Validar nombreOficial
  nombreOficial.addEventListener("input", () => {
    eliminarEspaciosIniciales(nombreOficial);
    const valor = nombreOficial.value.trim();
    if (
      valor.length < 3 ||
      valor.length > 90 ||
      !validarSoloLetrasYEspacios(valor)
    ) {
      mostrarError(
        "nombreOficialError",
        "Debe tener entre 3 y 90 caracteres y solo puede contener letras y espacios."
      );
    } else {
      mostrarError("nombreOficialError", "");
    }
  });

  // Validar nombreCapital
  nombreCapital.addEventListener("input", () => {
    eliminarEspaciosIniciales(nombreCapital);
    const valor = nombreCapital.value.trim();
    if (
      valor.length < 3 ||
      valor.length > 40 ||
      !validarSoloLetrasYEspacios(valor)
    ) {
      mostrarError(
        "nombreCapitalError",
        "Debe tener entre 3 y 40 caracteres y solo puede contener letras y espacios."
      );
    } else {
      mostrarError("nombreCapitalError", "");
    }
  });

  // Validar fronteras
  fronteras.addEventListener("input", () => {
    eliminarEspaciosIniciales(fronteras);
    const valor = fronteras.value.trim().split(",");
    const fronterasInvalidas = valor.some(
      (frontera) => !/^[a-zA-ZÁÉÍÓÚáéíóúÑñ]{3}$/.test(frontera.trim())
    );

    if (valor.length === 0 || fronterasInvalidas) {
      mostrarError(
        "fronterasError",
        "Cada frontera debe tener exactamente 3 letras."
      );
    } else {
      mostrarError("fronterasError", "");
    }
  });

  // Validar area
  area.addEventListener("input", () => {
    eliminarEspaciosIniciales(area);
    const valor = area.value.trim();
    if (!valor || isNaN(Number(valor)) || Number(valor) <= 100) {
      mostrarError("areaError", "Debe ser un número mayor que 100.");
    } else {
      mostrarError("areaError", "");
    }
  });

  // Validar poblacion
  poblacion.addEventListener("input", () => {
    eliminarEspaciosIniciales(poblacion);
    const valor = poblacion.value.trim();
    if (!valor || isNaN(Number(valor)) || Number(valor) <= 100) {
      mostrarError("poblacionError", "Debe ser un número mayor que 100.");
    } else {
      mostrarError("poblacionError", "");
    }
  });

  // Validar gini
  gini.addEventListener("input", () => {
    eliminarEspaciosIniciales(gini);
    const valor = gini.value.trim();

    // Validar si el valor está entre 0.00 y 100.00 con hasta dos decimales
    if (
      !valor ||
      !validarGini(valor) ||
      parseFloat(valor) <= 0 ||
      parseFloat(valor) > 100
    ) {
      mostrarError(
        "giniError",
        "Debe ser un número mayor que 0.00 y menor o igual que 100.00 con hasta dos decimales."
      );
    } else {
      mostrarError("giniError", ""); // Limpia el error si es válido
    }
  });

  // Validar zonas horarias
  zonasHorarias.addEventListener("input", () => {
    eliminarEspaciosIniciales(zonasHorarias);
    const valor = zonasHorarias.value.trim().split(",");

    // Validamos si alguna de las zonas horarias no cumple con el formato esperado
    const zonasInvalidas = valor.some(
      (zonaHoraria) =>
        !/^utc([+-])([01]?[0-9]|2[0-4]):([0-5][0-9])$/i.test(zonaHoraria.trim())
    );

    // Si hay zonas inválidas o no se ingresó ninguna zona horaria, mostramos un mensaje de error
    if (valor.length === 0 || zonasInvalidas) {
      mostrarError(
        "zonasHorariasError",
        "Debe seguir el formato UTC±hh:mm, donde hh es de 00 a 24 y mm de 00 a 59, separadas por comas."
      );
    } else {
      mostrarError("zonasHorariasError", ""); // Limpia el error si es válido
    }
  });

  // Validar mapas
  mapas.addEventListener("input", () => {
    eliminarEspaciosIniciales(mapas);
    const valor = mapas.value.trim().split(",");

    // Validar que haya entre 1 y 2 elementos y que no estén vacíos
    if (
      valor.length < 1 ||
      valor.length > 2 ||
      valor.some((elemento) => elemento.trim() === "")
    ) {
      mostrarError(
        "mapasError",
        "Debe contener entre 1 y 2 direcciones, separadas por coma. Las direcciones no deben estar vacíos."
      );
    } else {
      mostrarError("mapasError", ""); // Limpia el error si es válido
    }
  });

  // Validar bandera
  bandera.addEventListener("input", () => {
    eliminarEspaciosIniciales(bandera);
    const valor = bandera.value.trim();

    if (valor.length < 15 || contieneEspacios(valor)) {
      mostrarError(
        "banderaError",
        "Debe tener un mínimo de 15 caracteres y no puede contener espacios."
      );
    } else {
      mostrarError("banderaError", "");
    }
  });

  // Validar creador
  creador.addEventListener("input", () => {
    eliminarEspaciosIniciales(creador);
    const valor = creador.value.trim();
    if (
      valor.length < 3 ||
      valor.length > 50 ||
      !validarSoloLetrasYEspacios(valor)
    ) {
      mostrarError(
        "creadorError",
        "Debe tener entre 3 y 50 caracteres y solo puede contener letras y espacios."
      );
    } else {
      mostrarError("creadorError", ""); // Limpia el error si es válido
    }
  });
});
