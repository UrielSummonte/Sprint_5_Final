import Pais from "../models/Pais.mjs";
import IRepository from "./IRepository.mjs";

class PaisRepository extends IRepository {
  // async obtenerPaisesRepository() {
  //   try {
  //     return await Pais.find({});
  //   } catch (error) {
  //     console.error("Error al obtener todos los paises:", error);
  //     throw error;
  //   }
  // }

  async obtenerPaisesRepository(atributo, valor) {
    try {
      const query = { [atributo]: new RegExp(valor, "i") };
      return await Pais.find(query);
    } catch (error) {
      console.error("Error al buscar los paises creados por el autor:", error);
      throw error;
    }
  }

  async insertarPaisesRepository(datos) {
    try {
      return await Pais.create(datos);
    } catch (error) {
      console.error("Error al insertar los paises:", error);
      throw error;
    }
  }

  async buscarPorAtributoRepository(atributo, valor) {
    try {
      // Verifica que el atributo no esté vacío o mal formado
      if (!atributo || !valor) {
        throw new Error("Atributo o valor no válidos");
      }

      // Asegurando que el atributo sea un campo válido en el modelo
      const query = { [atributo]: { $regex: valor, $options: "i" } };

      // Ejecutando la consulta
      return await Pais.find(query);
    } catch (error) {
      console.error("Error al buscar paises por atributo:", error);
      throw error; // Re-lanza el error para ser manejado en el controlador
    }
  }

  async eliminarPaisPorIdRepository(id) {
    try {
      // Usamos findByIdAndDelete para obtener el documento actualizado
      return await Pais.findByIdAndDelete({ _id: id });
    } catch (error) {
      console.error("Error al eliminar el pais por id:", error);
      throw error;
    }
  }

  async EliminarPaisesRepository(atributo, valor) {
    try {
      // Verifica que el atributo no esté vacío o mal formado
      if (!atributo || !valor) {
        throw new Error("Atributo o valor no válidos");
      }
      
      const query = { [atributo]: new RegExp(valor, "i") };

      // Ejecutando la consulta
      return await Pais.deleteMany(query);
    } catch (error) {
      console.error("Error al eliminar paises por atributo:", error);
      throw error; // Re-lanza el error para ser manejado en el controlador
    }
  }

  async obtenerPorIdRepository(id) {
    try {
      return await Pais.findById(id);
    } catch (error) {
      console.error("Error al obtener el pais por id:", error);
      throw error;
    }
  }

  async editarPaisByIdRepository(id, datos) {
      try {
        // Usamos findOneAndUpdate con { new: true } para obtener el documento actualizado
        return await Pais.findByIdAndUpdate(
          // Filtro por id
          { _id: id }, 
          // Datos a actualizar
          { $set: datos }, 
          // Devuelve el documento actualizado
          { new: true } 
        );
      } catch (error) {
        console.error("Error al editar el pais:", error);
        throw error;
      }
    }
}


export default new PaisRepository();
