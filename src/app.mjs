import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import { connectDB } from './config/dbConfig.mjs';
import paisRoutes from './routes/paisRoutes.mjs'

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Conexión a MongoDB
connectDB();

// Middleware para servir archivos estáticos (CSS, JS, imágenes)
app.use(express.static('public'));
//app.use(methodOverride("_method"));

// Middleware para parsear cuerpos de solicitudes con formularios
app.use(express.urlencoded({ extended: true }));

// Middleware para implementar layout
app.use(expressLayouts);

// Configuro ejs como motor de  plantillas
app.set('view engine', 'ejs');

// Establece el layout predeterminado para todas las vistas
app.set('layout', 'layout');

// Configuración de rutas
app.use('/api', paisRoutes);

// Manejo de errores pra rutas no encontradas
app.use((req, res) => {
    res.status(404).send({ mensaje: "Ruta no encontrada" });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});