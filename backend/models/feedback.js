const db = require('../db');

const feedback = {
    create: async (userId, description) => {
        const insertText = "INSERT INTO feedback (user_id, description) VALUES ($1, $2)";
        const result = await db.query(insertText, [userId, description]);
        return result;
    },
    getAll: async () => {
        const queryText = "SELECT name, description FROM usermodel As us, feedback As fd WHERE us.id = fd.user_id";
        const result = await db.query(queryText);
        return result;
    }
};

module.exports = feedback;