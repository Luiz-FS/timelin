const db = require('../db');

 const user = {
    findById: async (id) => {
        const queryText = "SELECT name, email FROM usermodel WHERE id = $1";
        const result = await db.query(queryText, [id]);
        return result;
    },
    findByName: async (name) => {
        const queryText = "SELECT name, email FROM usermodel WHERE name = $1";
        const result = await db.query(queryText, [name]);
        return result;
    },
    findByEmail: async (email) => {
        const queryText = "SELECT name, email FROM usermodel WHERE email = $1";
        const result = await db.query(queryText, [email]);
        return result;
    },
    create: async (name, email, password) => {
        const insertText = "INSERT INTO usermodel (name, email, password) VALUES ($1, $2, crypt($3, gen_salt('bf')))";
        const result = await db.query(insertText, [name, email, password]);
        return result;
    },
    checkCredentials: async (email, password) => {
        const queryText = "SELECT id, name, email FROM usermodel WHERE email = $1 AND password = crypt($2, password)";
        const result = await db.query(queryText, [email, password]);
        return result;
    },
    checkCredentialsById: async (id, password) => {
        const queryText = "SELECT id FROM usermodel WHERE id = $1 AND password = crypt($2, password)";
        const result = await db.query(queryText, [id, password]);
        return result;
    },
    update: async (id, name, email) => {
        const updateText = "UPDATE usermodel SET name = $1, email = $2 WHERE id = $3";
        const result = await db.query(updateText, [name, email, id]);
        return result;
    },
    updatePassword: async (id, password) => {
        const updateText = "UPDATE usermodel SET password = crypt($1, gen_salt('bf')) WHERE id = $2";
        const result = await db.query(updateText, [password, id]);
        return result;
    }
};

module.exports = user