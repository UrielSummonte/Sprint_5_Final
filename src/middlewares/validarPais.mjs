import { body, validationResult } from "express-validator";

export const validarPais = [
  // Valido que el nombreComun no este vacio, tenga entre 3 y 60 caracteres, acepte letras y espacios y elmino blancos
  body("name.nativeName.spa.common")
    .trim()
    .notEmpty()
    .withMessage("El nombre del pais no puede estar vacio")
    .isLength({ min: 3, max: 50 })
    .withMessage("El nombre del pais debe tener entre 3 y 50 caracateres")
    .matches(/^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/)
    .withMessage("El nombre del país solo puede contener letras y espacios"),

  // Valido que el nombreOficial no este vacio, tenga entre 3 y 90 caracteres, acepte letras y espacios y elmino blancos
  body("name.official")
    .trim()
    .notEmpty()
    .withMessage("El nombre oficial del pais no puede estar vacio")
    .isLength({ min: 3, max: 90 })
    .withMessage(
      "El nombre oficial del pais debe tener entre 3 y 90 caracateres"
    )
    .matches(/^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/)
    .withMessage("El nombre del país solo puede contener letras y espacios"),

  // Valido que el nombreCapital no este vacio, tenga entre 3 y 40 caracteres, acepte letras y espacios y elmino blancos
  body("capital")
    .trim()
    .notEmpty()
    .withMessage("El nombre de la capital del pais no puede estar vacio")
    .isLength({ min: 3, max: 40 })
    .withMessage(
      "El nombre de la capital del pais debe tener entre 3 y 40 caracateres"
    )
    .matches(/^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/)
    .withMessage("El nombre del país solo puede contener letras y espacios"),

  // Valido que  fronteras sea un array de string no vacio
  // y que cada elemento no tenga blancos y una longitud de 3 caracteres
  body("borders")
    .isArray({ min: 1 })
    .withMessage("Fronteras debe ser un array con al menos un elemento.")
    .custom((borders) => {
      for (let frontera of borders) {
        if (typeof frontera !== "string") {
          throw new Error("Cada frontera debe ser un string.");
        }
        if (!/^[a-zA-ZÁÉÍÓÚáéíóúÑñ]{3}$/.test(frontera.trim())) {
          throw new Error(
            "Cada frontera debe tener exactamente 3 letras y solo letras."
          );
        }
      }
      return true;
    }),
  (req, res, next) => {
    // Manejo de errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Fallo en la validación",
        errors: errors.array().map((error) => ({
          field: error.param,
          message: error.msg,
        })),
      });
    }
    next();
  },

  // Validación que el area no este vacio, sea un entero mayor que 100, no tenga espacios y elimino blancos
  body("area")
    .trim()
    .notEmpty()
    .withMessage("El area es un campo obligatorio.")
    .isInt({ min: 100 })
    .withMessage("El area debe ser un número entero mayor a 100.")
    .custom((value) => {
      if (value.toString().includes(" ")) {
        throw new Error("El area no debe contener espacios.");
      }
      return true;
    }),

  // Validación que la poblacion no este vacio, sea un entero mayor que 100, no tenga espacios y elimino blancos
  body("population")
    .trim()
    .notEmpty()
    .withMessage("La poblacion es un campo obligatorio.")
    .isInt({ min: 100 })
    .withMessage("La poblacion debe ser un número entero mayor a 100.")
    .custom((value) => {
      if (value.toString().includes(" ")) {
        throw new Error("La poblacion no debe contener espacios.");
      }
      return true;
    }),

  // Validación que el gini no este vacio, sea un numero entre el 0 y el 100, no tenga espacios y elimino blancos
  body("gini.latest")
    .trim()
    .notEmpty()
    .withMessage("El campo Gini no puede estar vacío.")
    .matches(/^\d{1,2}(\.\d{1,2})?$|^100(\.00?)?$/)
    .withMessage(
      "Debe ser un número mayor que 0.00 y menor o igual que 100.00 con hasta dos decimales."
    )
    .custom((valor) => {
      const numero = parseFloat(valor);
      if (numero <= 0 || numero > 100) {
        throw new Error(
          "Debe ser un número mayor que 0.00 y menor o igual que 100.00."
        );
      }
      return true;
    }),
  (req, res, next) => {
    // Manejo de errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Fallo en la validación",
        errors: errors.array().map((error) => ({
          field: error.param,
          message: error.msg,
        })),
      });
    }
    next();
  },

  // Validación que la zonas horarias no este vacio, tenga al menos un elemento, no tenga espacios y elimino blancos
  body("timezones")
    .isArray({ min: 1 })
    .withMessage("Zonas horarias debe ser un array con al menos un elemento.")
    .custom((timezones) => {
      const regex = /^utc([+-])([01]?[0-9]|2[0-4]):([0-5][0-9])$/i;

      for (let zona of timezones) {
        if (typeof zona !== "string") {
          throw new Error("Cada zona horaria debe ser un string.");
        }
        if (!regex.test(zona.trim())) {
          throw new Error(
            "Cada zona horaria debe seguir el formato UTC±hh:mm, donde hh es de 00 a 24 y mm de 00 a 59."
          );
        }
      }
      return true;
    }),
  (req, res, next) => {
    // Manejo de errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Fallo en la validación",
        errors: errors.array().map((error) => ({
          field: error.param,
          message: error.msg,
        })),
      });
    }
    next();
  },

  // Validación que la mapas no este vacio, tenga exactamente 2 elementos, no tenga espacios y elimino blancos
  body("maps.googleMaps")
    .trim()
    .notEmpty()
    .withMessage("El nombre del mapa goolge no puede estar vacio")
    .isLength({ min: 1 })
    .withMessage(
      "El nombre de la google del pais debe tener entre 3 y 40 caracateres"
    ),

  body("maps.openStreetMaps")
    .trim()
    .notEmpty()
    .withMessage("El nombre del mapa no puede estar vacio")
    .isLength({ min: 1 })
    .withMessage(
      "El nombre de la capital del pais debe tener entre 3 y 40 caracateres"
    ),

  // Validación que bandera no este vacio, tenga como minimo 15 caracteres, no tenga espacios y elimino blancos
  body("flags.png")
    .isString()
    .withMessage("La bandera debe ser un string.")
    .isLength({ min: 15 })
    .withMessage("Debe tener un mínimo de 15 caracteres.")
    .custom((valor) => {
      if (/\s/.test(valor)) {
        throw new Error("La bandera no puede contener espacios.");
      }
      return true;
    }),
  (req, res, next) => {
    // Manejo de errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Fallo en la validación",
        errors: errors.array().map((error) => ({
          field: error.param,
          message: error.msg,
        })),
      });
    }
    next();
  },

  // Valido que el creador no este vacio, tenga entre 3 y 50 caracteres, acepte letras y espacios y elmino blancos
  body("creador")
    .trim()
    .notEmpty()
    .withMessage("El nombre del creador no puede estar vacio")
    .isLength({ min: 3, max: 50 })
    .withMessage("El nombre del creador debe tener entre 3 y 50 caracateres")
    .matches(/^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/)
    .withMessage("El nombre del país solo puede contener letras y espacios"),
];
