const express = require('express');
const router = express.Router();
const cors = require('cors');
const productoController = require('../controllers/productoController');

// Aplicar CORS específicamente a estas rutas
router.use(cors());

// Crear un producto
router.post('/', productoController.crearProducto);

// Obtener todos los productos
router.get('/', productoController.obtenerProductos);

// Obtener un solo producto por ID
router.get('/:id', productoController.obtenerProducto);

// Actualizar un producto por ID
router.put('/:id', productoController.actualizarProducto);

// Eliminar un producto por ID
router.delete('/:id', productoController.eliminarProducto);

module.exports = router;
