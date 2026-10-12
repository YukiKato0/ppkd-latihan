import CategoryService from './category.service.js'

const CategoryController = {
  async getAll(req, res) {
    try {
      const categories = await CategoryService.getAllCategories();
      res.status(200).json({ success: true, data: categories });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async getById(req, res) {
    try {
      const category = await CategoryService.getCategoryById(req.params.id);
      res.status(200).json({ success: true, data: category });
    } catch (error) {
      const status = error.message === 'Category tidak ditemukan' ? 404 : 500;
      res.status(status).json({ success: false, message: error.message });
    }
  },

  async create(req, res) {
    try {
      const newCategory = await CategoryService.createCategory(req.body);
      res.status(201).json({ success: true, data: newCategory });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  async update(req, res) {
    try {
      const updatedCategory = await CategoryService.updateCategory(req.params.id, req.body);
      res.status(200).json({ success: true, data: updatedCategory });
    } catch (error) {
      const status = error.message === 'Category tidak ditemukan' ? 404 : 400;
      res.status(status).json({ success: false, message: error.message });
    }
  },

  async delete(req, res) {
    try {
      await CategoryService.deleteCategory(req.params.id);
      res.status(200).json({ success: true, message: 'Category berhasil dihapus' });
    } catch (error) {
      const status = error.message === 'Category tidak ditemukan' ? 404 : 500;
      res.status(status).json({ success: false, message: error.message });
    }
  }
};

export default CategoryController;