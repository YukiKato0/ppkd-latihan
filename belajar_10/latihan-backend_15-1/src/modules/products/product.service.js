import ProductModel from './product.model.js'

const ProductService = {
  async getAllCategories() {
    return await ProductModel.findAll();
  },

  async getProductById(id) {
    const Product = await ProductModel.findById(id);
    if (!Product) {
      throw new Error('Product tidak ditemukan');
    }
    return Product;
  },

  async createProduct(data) {
    if (!data.name) {
      throw new Error('Name wajib diisi');
    }
    const ProductId = await ProductModel.create(data);
    return await ProductModel.findById(ProductId);
  },

  async updateProduct(id, data) {
    await ProductService.getProductById(id);
    await ProductModel.update(id, data);
    return await ProductModel.findById(id);
  },

  async deleteProduct(id) {
    await ProductService.getProductById(id);
    return await ProductModel.delete(id);
  }
};

export default ProductService;