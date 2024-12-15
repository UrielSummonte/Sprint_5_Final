export function renderizarPais(pais) {
  return {
    "area": pais.area, // Área del país
    "borders": pais.borders, // Fronteras con otros países
    "capital": pais.capital, // Capital(es)
    "capitalInfo": {
      "latlng": pais.capitalInfo.latlng, // Coordenadas de la capital
    },
    "continents": pais.continents, // Continentes donde se encuentra
    "creador": pais.creador, // Nombre del creador del dato
    "currencies": pais.currencies, // Monedas utilizadas en el país
    "fifa": pais.fifa, // Código FIFA del país
    "flag": pais.flag, // Emoji de la bandera
    "flags": {
      "alt": pais.flags.alt, // Descripción alternativa de la bandera
      "png": pais.flags.png, // URL de la bandera PNG
      "svg": pais.flags.png, // URL de la bandera SVG
    },
    "gini": pais.gini, // Índice de Gini
    "idd": {
      "root": pais.idd.root, // Prefijo del código telefónico
      "suffixes": pais.idd.suffixes, // Sufijos telefónicos
    },
    "independent": pais.independent, // ¿Es independiente?
    "landlocked": pais.landlocked, // ¿Es un país sin salida al mar?
    "languages": pais.languages, // Idiomas hablados
    "latlng": pais.latlng, // Coordenadas del país
    "maps": {
      "googleMaps": pais.maps.googleMaps, // URL de Google Maps
      "openStreetMaps": pais.maps.openStreetMaps, // URL de OpenStreetMaps
    },
    "name": {
      "common": pais.name.common, // Nombre común
      "official": pais.name.official, // Nombre oficial
      "nativeName": pais.name.nativeName, // Nombre en idioma nativo
    },
    "population": pais.population, // Población del país
    "region": pais.region, // Región
    "startOfWeek": pais.startOfWeek, // Día de inicio de la semana
    "status": pais.status, // Estado (e.g., oficialmente asignado)
    "subregion": pais.subregion, // Subregión
    "timezones": pais.timezones, // Zonas horarias
    "unMember": pais.unMember, // ¿Es miembro de la ONU?
  };
}

export function renderizarListaPaises(paises) {
  return paises.map((pais) => renderizarPais(pais));
}
