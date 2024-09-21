const express = require('express');
const cookieParser = require('cookie-parser');
const mysql = require('./db');

const checkAuth = async (req, res) => {

const app = express();
app.use(cookieParser());

    console.log("Checking authentication...");
    console.log("Request cookies:", req.cookies);  // Log the request cookies

    try {
        const LoginCookie = req.cookies.LoginCookie;
        const UserID = req.cookies.UserID;

        if (!LoginCookie || !UserID) {
            return res.status(401).send('Unauthorized');
        }

        const [results] = await mysql.query('SELECT cookie FROM Users WHERE id = ?', [UserID]);
        if (results.length === 0) {
            return res.status(401).send('Unauthorized');
        } else if (results[0].cookie !== LoginCookie) {
            return res.status(401).send('Unauthorized');
        } else {
            return res.send('Authenticated');
        }


    } catch (err) {
        console.error("Nastala Chyba:", err);
        return res.status(500).send('Database error');
    }
};

module.exports = checkAuth;
