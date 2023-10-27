const fs = require("fs");

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = [];
    this.productIdCounter = 1;
    this.initializeProducts();
  }

  initializeProducts() {
    try {
      const data = fs.readFileSync(this.path, "utf8");
      this.products = JSON.parse(data);
      this.updateProductIdCounter();
    } catch (err) {}
  }

  updateProductIdCounter() {
    if (this.products.length > 0) {
      const maxId = Math.max(...this.products.map((product) => product.id));
      this.productIdCounter = maxId + 1;
    }
  }

  saveProducts() {
    fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
  }

addProduct(product) {
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            throw new Error("Todos los campos son obligatorios.");
        }

        if (this.products.some((existingProduct) => existingProduct.code === product.code)) {
            throw new Error("El código del producto ya existe.");
        }

        product.id = this.productIdCounter++;
        this.products.push(product);
        this.saveProducts();
    }

  async getProducts(limit) {
    if (limit) {
      return this.products.slice(0, limit);
    } else {
      return this.products;
    }
  }

  async getProductById(id) {
    const product = this.products.find(
      (existingProduct) => existingProduct.id === id
    );

    if (!product) {
      throw new Error("Nor Seaach.");
    }

    return product;
  }

  updateProduct(id, updatedProduct) {
    const productIndex = this.products.findIndex(
      (product) => product.id === id
    );
    if (productIndex === -1) {
      throw new Error("Nor Seaach.");
    }

    this.products[productIndex] = {
      ...this.products[productIndex],
      ...updatedProduct,
    };
    this.saveProducts();
  }

  deleteProduct(id) {
    const productIndex = this.products.findIndex(
      (product) => product.id === id
    );
    if (productIndex === -1) {
      throw new Error("Nor Seaach.");
    }

    this.products.splice(productIndex, 1);
    this.saveProducts();
  }
}

module.exports = ProductManager;

const testFilePath = "testProducts.json";

const productManager = new ProductManager(testFilePath);


function testAddProduct() {
  try {
    const newProduct = {
      title: "Nuevo Producto",
      price: 19.99,
      stock: 10,
    };

    productManager.addProduct(newProduct);
    console.log("Producto agregado con éxito.");
  } catch (error) {
    console.error("Error al agregar el producto:", error.message);
  }
}

// Función de prueba para obtener todos los productos
function testGetProducts() {
  const products = productManager.getProducts();
  console.log("Lista de productos:");
  console.log(products);
}

// Función de prueba para actualizar un producto
function testUpdateProduct(productId) {
  try {
    const updatedProduct = {
      title: "Producto Actualizado",
      price: 29.99,
    };

    productManager.updateProduct(productId, updatedProduct);
    console.log("Producto actualizado con éxito.");
  } catch (error) {
    console.error("Error al actualizar el producto:", error.message);
  }
}

// Función de prueba para eliminar un producto
function testDeleteProduct(productId) {
  try {
    productManager.deleteProduct(productId);
    console.log("Producto eliminado con éxito.");
  } catch (error) {
    console.error("Error al eliminar el producto:", error.message);
  }
}
