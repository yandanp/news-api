const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user || !bcrypt.compareSync(password, user.password)) return res.sendStatus(403);

    const token = jwt.sign({ id: user.id }, 'your_jwt_secret');
    res.json({ token });
};

exports.logout = (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token) {
        tokenBlacklist.add(token);  // Tambahkan token ke dalam blacklist
    }
    res.status(200).json({ message: "Logout successful" });
};

