// __tests__/app.test.js
const request = require('supertest');
const app = require('../app');
const db = require('../models');
const bcrypt = require('bcryptjs');

beforeAll(async () => {
  await db.sequelize.sync({ force: true });

  // Buat user admin dengan hashed password '12345'
  await db.User.create({
    username: 'admin',
    password: await bcrypt.hash('12345', 10), // Hashing password
    role: 'admin',
  });
});

afterAll(async () => {
  await db.sequelize.close();
});

describe('Authentication', () => {
  it('should login successfully with valid credentials', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        username: 'admin',
        password: '12345', // Menggunakan password '12345'
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should fail to login with invalid credentials', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        username: 'admin',
        password: 'wrongpassword',
      });

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('message', 'Invalid credentials');
  });
});

describe('News API', () => {
  let token;

  beforeAll(async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        username: 'admin',
        password: '12345', // Menggunakan password '12345'
      });

    token = response.body.token;
  });

  it('should create a news article', async () => {
    const response = await request(app)
      .post('/news')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test News',
        content: 'This is a test news content.',
        categoryId: 1,
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('title', 'Test News');
  });

  it('should fetch news list', async () => {
    const response = await request(app).get('/news');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  it('should fetch news details', async () => {
    const news = await db.News.create({
      title: 'Test News',
      content: 'This is a test news content.',
      categoryId: 1,
      userId: 1,
    });

    const response = await request(app).get(`/news/${news.id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('title', 'Test News');
  });

  it('should update a news article', async () => {
    const news = await db.News.create({
      title: 'Update News',
      content: 'This is an update news content.',
      categoryId: 1,
      userId: 1,
    });

    const response = await request(app)
      .put(`/news/${news.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Updated News',
        content: 'This content has been updated.',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('title', 'Updated News');
  });

  it('should delete a news article', async () => {
    const news = await db.News.create({
      title: 'Delete News',
      content: 'This news will be deleted.',
      categoryId: 1,
      userId: 1,
    });

    const response = await request(app)
      .delete(`/news/${news.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(204);
  });
});

describe('Category API', () => {
  let token;

  beforeAll(async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        username: 'admin',
        password: '12345', // Menggunakan password '12345'
      });

    token = response.body.token;
  });

  it('should create a category', async () => {
    const response = await request(app)
      .post('/categories')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Test Category' });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('name', 'Test Category');
  });

  it('should fetch categories', async () => {
    const response = await request(app).get('/categories');
    
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  it('should delete a category', async () => {
    const category = await db.Category.create({ name: 'Category to Delete' });

    const response = await request(app)
      .delete(`/categories/${category.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(204);
  });
});
