const express = require('express');
const { getNewsList, getNewsDetails, createNews, updateNews, deleteNews } = require('../controllers/newsController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { authorizeRole } = require('../middlewares/authorizeRole');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: News
 *   description: News management and viewing
 */

/**
 * @swagger
 * /news:
 *   get:
 *     summary: Get list of all news
 *     tags: [News]
 *     responses:
 *       200:
 *         description: A list of news
 */
router.get('/', getNewsList);

/**
 * @swagger
 * /news/{id}:
 *   get:
 *     summary: Get news details
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: News ID
 *     responses:
 *       200:
 *         description: News details
 *       404:
 *         description: News not found
 */
router.get('/:id', getNewsDetails);

/**
 * @swagger
 * /news:
 *   post:
 *     summary: Add a new news article
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               categoryId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: News created successfully
 *       403:
 *         description: Unauthorized
 */
router.post('/', authenticateToken, authorizeRole(['admin']), createNews);

/**
 * @swagger
 * /news/{id}:
 *   put:
 *     summary: Update news article
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: News ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: News updated successfully
 *       403:
 *         description: Unauthorized
 */
router.put('/:id', authenticateToken, authorizeRole(['admin']), updateNews);

/**
 * @swagger
 * /news/{id}:
 *   delete:
 *     summary: Delete news article
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: News ID
 *     responses:
 *       204:
 *         description: News deleted successfully
 *       403:
 *         description: Unauthorized
 */
router.delete('/:id', authenticateToken, authorizeRole(['admin']), deleteNews);

module.exports = router;
