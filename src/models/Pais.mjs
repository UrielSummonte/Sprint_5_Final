import mongoose from "mongoose";

const NameSchema = new mongoose.Schema({
  common: { type: String, required: true }, // Nombre común
  official: { type: String, default: null }, // Nombre oficial
  nativeName: {
    type: Map, // Usamos Map para manejar idiomas dinámicos como `eng` o `spa`
    of: new mongoose.Schema({
      common: { type: String, required: true }, // Nombre común en idioma nativo
      official: { type: String, default: null }, // Nombre oficial en idioma nativo
    }),
    default: {}, // Por defecto es un objeto vacío
  },
});

const paisSchema = new mongoose.Schema({
  area: { type: Number, min: 0 }, // Área del país
  borders: { type: [String], default: [] }, // Fronteras con otros países
  capital: { type: [String], default: [] }, // Capital(es)
  capitalInfo: {
    latlng: { type: [Number], default: [] }, // Coordenadas de la capital
  },
  continents: { type: [String], default: [] }, // Continentes donde se encuentra
  creador: { type: String, default: "Desconocido" }, // Nombre del creador del dato
  currencies: { type: Object, default: {} }, // Monedas utilizadas en el país
  fifa: { type: String, default: null }, // Código FIFA del país
  flag: { type: String, default: null }, // Emoji de la bandera
  flags: {
    alt: { type: String, default: null }, // Descripción alternativa de la bandera
    png: { type: String, default: null }, // URL de la bandera PNG
    svg: { type: String, default: null }, // URL de la bandera SVG
  },
  gini: { type: Object, default: {} }, // Índice de Gini
  idd: {
    root: { type: String, default: null }, // Prefijo del código telefónico
    suffixes: { type: [String], default: [] }, // Sufijos telefónicos
  },
  independent: { type: Boolean, default: false }, // ¿Es independiente?
  landlocked: { type: Boolean, default: false }, // ¿Es un país sin salida al mar?
  languages: { type: Object, default: {} }, // Idiomas hablados
  latlng: { type: [Number], default: [] }, // Coordenadas del país
  maps: {
    googleMaps: { type: String, default: null }, // URL de Google Maps
    openStreetMaps: { type: String, default: null }, // URL de OpenStreetMaps
  },
  name: { type: NameSchema, required: true }, // Estructura completa del nombre
  population: { type: Number, min: 0 }, // Población del país
  region: { type: String, default: null }, // Región
  startOfWeek: { type: String, default: "monday" }, // Día de inicio de la semana
  status: { type: String, default: null }, // Estado (e.g., oficialmente asignado)
  subregion: { type: String, default: null }, // Subregión
  timezones: { type: [String], default: [] }, // Zonas horarias
  unMember: { type: Boolean, default: false }, // ¿Es miembro de la ONU?
});

export default mongoose.model("Pais", paisSchema, "Grupo-15");
