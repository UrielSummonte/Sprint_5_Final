import PaisRepository from '../repositories/PaisRepository.mjs';

// export async function obtenerPaisesService() {
//     try {
//         return await PaisRepository.obtenerPaisesRepository();
//     } catch (error) {
//         console.error("Error en obtenerPaisesService:", error);
//         throw error;
//     }
// }

export async function obtenerPaisesService(atributo, valor) {
    try {
        return await PaisRepository.obtenerPaisesRepository(atributo, valor);
    } catch (error) {
        console.error("Error en obtenerPaisesService:", error);
        throw error;
    }
}

export async function insertarPaisesService(datos) {
    try {
        return await PaisRepository.insertarPaisesRepository(datos);
    } catch (error) {
        console.error("Error en insertarPaisesService:", error);
        throw error;
    }
}

export async function buscarPaisesPorAtributoService(atributo, valor) {
    try {
        return await PaisRepository.buscarPorAtributoRepository(atributo, valor);
    } catch (error) {
        console.error("Error en buscarPaisesPorAtributo:", error);
        throw error;
    }
}

export async function eliminarPaisPorIdService(id) {
    try {
        return await PaisRepository.eliminarPaisPorIdRepository(id);
    } catch (error) {
        console.error("Error en eliminarPaisPorIdService:", error);
        throw error;
    }
}

export async function eliminarPaisesService(atributo, valor) {
    try {
        return await PaisRepository.EliminarPaisesRepository(atributo, valor);
    } catch (error) {
        console.error("Error en eliminarPaisPorIdService:", error);
        throw error;
    }
}

export async function obtenerPaisPorIdService(id) {
    try {
        return await PaisRepository.obtenerPorIdRepository(id);
    } catch (error) {
        console.error("Error en obtenerPaisPorIdService:", error);
        throw error;
    }
}

export async function editarPaisByIdService(id, datos) {
    try {
        return await PaisRepository.editarPaisByIdRepository(id, datos);
    } catch (error) {
        console.error("Error en editarPaisByIdService:", error);
        throw error;
    }
}