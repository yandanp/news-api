const express = require('express');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const newsRoutes = require('./routes/newsRoutes');
const swagger = require('./swagger');

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/categories', categoryRoutes);
app.use('/news', newsRoutes);

swagger(app);

sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('Server is running on http://localhost:3000');
    });
});

module.exports = app; // Pastikan app diekspor