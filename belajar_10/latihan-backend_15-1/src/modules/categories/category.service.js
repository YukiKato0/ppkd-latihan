import CategoryModel from './category.model.js'

const CategoryService = {
  async getAllCategories() {
    return await CategoryModel.findAll();
  },

  async getCategoryById(id) {
    const Category = await CategoryModel.findById(id);
    if (!Category) {
      throw new Error('Category tidak ditemukan');
    }
    return Category;
  },

  async createCategory(data) {
    if (!data.name) {
      throw new Error('Name wajib diisi');
    }
    const CategoryId = await CategoryModel.create(data);
    return await CategoryModel.findById(CategoryId);
  },

  async updateCategory(id, data) {
    await CategoryService.getCategoryById(id);
    await CategoryModel.update(id, data);
    return await CategoryModel.findById(id);
  },

  async deleteCategory(id) {
    await CategoryService.getCategoryById(id);
    return await CategoryModel.delete(id);
  }
};

export default CategoryService;