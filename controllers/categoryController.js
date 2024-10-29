const Category = require('../models/Category');

exports.getCategories = async (req, res) => {
    const categories = await Category.findAll();
    res.json(categories);
};

exports.createCategory = async (req, res) => {
    const category = await Category.create(req.body);
    res.status(201).json(category);
};

exports.updateCategory = async (req, res) => {
    const { id } = req.params;
    const category = await Category.update(req.body, { where: { id } });
    res.json(category);
};

exports.deleteCategory = async (req, res) => {
    const { id } = req.params;
    await Category.destroy({ where: { id } });
    res.sendStatus(204);
};
