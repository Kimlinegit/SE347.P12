import Category from "../models/categoryModel.js";


const getAllCategories = async (req, res) => {
    try {
      const categories = await Category.find();
      res.json({
        count: categories.length,
        categories: categories
      });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
  };
  
const createCategory = async (req, res) => {

    try {
        let {name, description} = req.body;
        const lowerCaseName = name.toLowerCase();
        const category = await Category.findOne({name: lowerCaseName});
        if(category) {
            // return res.status(400).json({msg: "This category already exists!"})
            return res.status(400).json({msg: "Danh mục đã tồn tại!"})
        } 

        const newCategory = new Category({name, description});

        await newCategory.save();
        // res.json({message: "Created a category successfully!"});
        res.json({message: "Tạo mới danh mục thành công!"});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const updateCategory = async (req, res) => {
    try {
        const { categoryId  } = req.params;
        const { name, description } = req.body;
        const lowerCaseName = name.toLowerCase();
        const updatedCategory = await Category.findByIdAndUpdate(categoryId , { name: lowerCaseName, description }, { new: true });
        // res.json({message: "This category updated successfully", updatedCategory});
        res.json({message: "Cập nhật thông tin danh mục thành công!", updatedCategory});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        await Category.findByIdAndDelete(categoryId);
        // res.json({ message: 'Category deleted successfully.' });
        res.json({ message: 'Đã xóa danh mục thành công!' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export { 
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory
};