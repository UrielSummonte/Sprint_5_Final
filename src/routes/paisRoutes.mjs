import express from "express";
import { obtenerTodosLosPaisesController, insertarPaisesController, buscarPaisPorAtributoController, eliminarPaisPorIdController, obtenerPaisPorIdController, editarPaisByIdController, eliminarPaisesController } from "../controllers/paisesController.mjs";
import { validarPais } from '../middlewares/validarPais.mjs'

const router = express.Router();

// Renderiza el dashboard
router.get("/paises", (req, res) => {
  res.render("dashboard");
});
// Ruta para listar los paises
router.get("/paises/listar", obtenerTodosLosPaisesController);
// Ruta para cargar los paises
router.post("/paises/cargar", insertarPaisesController);
// Ruta para cargar un nuevo pais
router.post("/paises/cargar/nuevo", validarPais, insertarPaisesController);
// Ruta para buscar un pais por atributo:valor
router.get(
  "/paises/buscar/:atributo/:valor",
  buscarPaisPorAtributoController
);
// Ruta para eliminar un pais
router.delete("/paises/eliminar/:id", eliminarPaisPorIdController);
// Ruta para renderizar el formulario para cargar un pais
router.get("/paises/insertar", (req, res) => {
  res.render("addPais")
})
// Ruta para buscar un pais po id
router.get("/paises/:id", obtenerPaisPorIdController);
// Ruta para editar un pais
router.put("/paises/editar/:id", validarPais, editarPaisByIdController);
// Ruta para eliminar todos los paises
router.delete("/paises/eliminar", eliminarPaisesController)

export default router;
