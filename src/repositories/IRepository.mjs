class IRepository {
  obtenerPorIdRepository(id) {
    throw new Error("Método 'obtenerPorId()' no implementado");
  }
  obtenerPaisesRepository() {
    throw new Error("Método 'obtenerPaisesRepository()' no implementado");
  }
  buscarPorAtributoRepository(atributo, valor) {
    throw new Error("Método 'buscarPorAtributoRepository()' no implementado");
  }
  insertarPaisRepository() {
    throw new Error("Método 'insertarPaisRepository()' no implementado");
  }
  editarPaisRepository() {
    throw new Error("Método 'editarPaisRepository()' no implementado");
  }
  eliminarPorIdRepository() {
    throw new Error("Método 'eliminarPorIdRepository()' no implementado");
  }
  eliminarTodoRepository() {
    throw new Error("Método 'eliminarTodoRepository()' no implementado");
  }
}

export default IRepository;
