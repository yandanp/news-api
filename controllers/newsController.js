const News = require('../models/News');

exports.getNewsList = async (req, res) => {
    const newsList = await News.findAll();
    res.json(newsList);
};

exports.getNewsDetails = async (req, res) => {
    const { id } = req.params;
    const news = await News.findByPk(id);
    if (!news) return res.sendStatus(404);
    res.json(news);
};

exports.createNews = async (req, res) => {
    const news = await News.create(req.body);
    res.status(201).json(news);
};

exports.updateNews = async (req, res) => {
    const { id } = req.params;
    const news = await News.update(req.body, { where: { id } });
    res.json(news);
};

exports.deleteNews = async (req, res) => {
    const { id } = req.params;
    await News.destroy({ where: { id } });
    res.sendStatus(204);
};
