const express = require('express');
const ProductManager = require('./ProductManager');
const app = express();
const port = 8080;


const productManager = new ProductManager('products.json');

app.use(express.json());

app.get('/products', async (req, res) => {
    const limit = req.query.limit;
    try {
        const products = await productManager.getProducts(limit);
        res.json(products);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});


app.get('/products/:pid', async (req, res) => {
    const productId = parseInt(req.params.pid);
    try {
        const product = await productManager.getProductById(productId);
        res.json(product);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});


app.listen(port, () => {
    console.log(`Servidor en puerto ${port}`);
});