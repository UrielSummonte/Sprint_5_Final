import { obtenerPaisesService, insertarPaisesService, buscarPaisesPorAtributoService, eliminarPaisPorIdService, obtenerPaisPorIdService, editarPaisByIdService, eliminarPaisesService } from "../services/paisesService.mjs"; 
import { renderizarPais, renderizarListaPaises } from "../views/responseView.mjs";

export async function obtenerTodosLosPaisesController(req, res) {
    try {
        const atributo = "creador";
        const valor = "Uriel Summonte";
        const paises = await obtenerPaisesService(atributo, valor);

        if (paises.length > 0) {
            // Sumar la población de todos los países
            const poblacionTotal = paises.reduce((total, pais) => total + (pais.population || 0), 0);
            const areaTotal = paises.reduce((total, pais) => total + (pais.area || 0), 0);

            // Calcular el promedio del índice de Gini
            const giniValores = paises
                .map(pais => {
                    const gini = Object.values(pais.gini || {})[0];
                    return typeof gini === "number" ? gini : null;
                })
                .filter(gini => gini !== null);

            const promedioGini = giniValores.length > 0
                ? giniValores.reduce((total, valor) => total + valor, 0) / giniValores.length
                : 0;

            // Renderizar la lista si hay países
            res.render("listaPaises", { paises, poblacionTotal, areaTotal, promedioGini });
        } else {
            // Enviar respuesta JSON si la lista está vacía
            res.status(200).send({
                vacio: true,
                mensaje: "La base de datos está vacía. Redirigiendo al dashboard.",
                redireccion: "/api/paises",
            });
        }
    } catch (error) {
        console.error("Error en obtener todos los paises:", error);
        res.status(500).send({ mensaje: "Error interno del servidor" });
    }
}

export async function insertarPaisesController(req, res) {
    try {
        const datos = req.body;
        
        const pais = await insertarPaisesService(datos);
        if (pais) {
            res.send(renderizarPais(pais));
        } else {
            res.status(400).send({ mensaje: "No se pudo crear el pais" });
        }
    } catch (error) {
        console.error("Error en insertarPaisesController:", error);
        res.status(500).send({ mensaje: "Error interno del servidor" });
    }
}

export async function buscarPaisPorAtributoController(req, res) {
    try {
        const { atributo, valor } = req.params;
    
        const paises = await buscarPaisesPorAtributoService(atributo, valor);
        
        if (paises.length > 0) {
            res.send(renderizarListaPaises(paises));
        } else {
            res.status(404).send({ mensaje: "No se encontraron paises con ese atributo" });
        }
    } catch (error) {
        console.error("Error en buscar los paises por atributo:", error);
        res.status(500).send({ mensaje: "Error interno del servidor" });
    }
}

export async function eliminarPaisPorIdController(req, res) {
    try {
        const { id } = req.params;
        const pais = await eliminarPaisPorIdService(id);
        if (pais) {
            res.send(renderizarPais(pais));
        } else {
            res.status(400).send({ mensaje: "No se pudo eliminar el pais por id" });
        }
    } catch (error) {
        console.error("Error en eliminarPaisPorIdController:", error);
        res.status(500).send({ mensaje: "Error interno del servidor" });
    }
}

export async function eliminarPaisesController(req, res) {
    try {
        const atributo = "creador";
        const valor = "Uriel Summonte";
        const pais = await eliminarPaisesService(atributo, valor);

        if (pais) {
            console.log("Se eliminaron los países.");
            res.status(200).send({ mensaje: "Base de datos borrada con éxito" }); // Respuesta exitosa
        } else {
            console.log("No se eliminaron los países.");
            res.status(400).send({ mensaje: "No se pudieron eliminar los países" }); // Error del cliente
        }
    } catch (error) {
        console.error("Error en eliminarPaisesController:", error);
        res.status(500).send({ mensaje: "Error interno del servidor" }); // Error del servidor
    }
}


export async function obtenerPaisPorIdController(req, res) {
    try {
        const { id } = req.params;
        const pais = await obtenerPaisPorIdService(id);

        if (pais) {
            res.render("editPais", { pais });
        } else {
            res.status(404).send({ mensaje: "País no encontrado" });
        }
    } catch (error) {
        console.error("Error en obtener el país por id:", error);
        res.status(500).send({ mensaje: "Error interno del servidor" });
    }
}

export async function editarPaisByIdController(req, res) {
    try {
        const { id } = req.params;
        const datos = req.body;
               
        const pais = await editarPaisByIdService(id, datos);
        if (pais) {
             res.send(renderizarPais(pais));
        } else {
            res.status(400).send({ mensaje: "No se pudo editar el pais" });
        }
    } catch (error) {
        console.error("Error en editarPaisByIdController:", error);
        res.status(500).send({ mensaje: "Error interno del servidor" });
    }
}