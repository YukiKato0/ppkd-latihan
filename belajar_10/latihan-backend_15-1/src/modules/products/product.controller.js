import ProductService from './product.service.js'

const ProductController = {
  async getAll(req, res) {
    try {
      const products = await ProductService.getAllCategories();
      res.status(200).json({ success: true, data: products });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async getById(req, res) {
    try {
      const product = await ProductService.getProductById(req.params.id);
      res.status(200).json({ success: true, data: product });
    } catch (error) {
      const status = error.message === 'Product tidak ditemukan' ? 404 : 500;
      res.status(status).json({ success: false, message: error.message });
    }
  },

  async create(req, res) {
    try {
      const newProduct = await ProductService.createProduct(req.body);
      res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  async update(req, res) {
    try {
      const updatedProduct = await ProductService.updateProduct(req.params.id, req.body);
      res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
      const status = error.message === 'Product tidak ditemukan' ? 404 : 400;
      res.status(status).json({ success: false, message: error.message });
    }
  },

  async delete(req, res) {
    try {
      await ProductService.deleteProduct(req.params.id);
      res.status(200).json({ success: true, message: 'Product berhasil dihapus' });
    } catch (error) {
      const status = error.message === 'Product tidak ditemukan' ? 404 : 500;
      res.status(status).json({ success: false, message: error.message });
    }
  }
};

export default ProductController;