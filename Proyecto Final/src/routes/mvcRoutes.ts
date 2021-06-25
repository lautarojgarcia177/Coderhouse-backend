import express from 'express';
const router = express.Router();

// importo la instancia del controlador
const productos = require('../controllers/productos');

router.get('/', (req: express.Request, res: express.Response) => {
    res.send('Funciona!');
});

module.exports = router;