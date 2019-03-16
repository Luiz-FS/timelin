const db = require('../db');

const event = {
    findById: async (id) => {
        const queryText = "SELECT id, name, description, event_date, color FROM event WHERE id = $1";
        const result = await db.query(queryText, [id]);
        return result;
    },
    findByUserId: async (userId) => {
        const queryText = "SELECT id, name, description, event_date, color FROM event WHERE user_id = $1";
        const result = await db.query(queryText, [userId]);
        return result;
    },
    create: async (name, description, date, color, userId) => {
        const insertText = "INSERT INTO event (name, description, event_date, color, user_id) VALUES ($1, $2, $3, $4, $5)";
        const result = await db.query(insertText, [name, description, date, color, userId]);
        return result;
    },
    update: async (id, name, description, date, color) => {
        const updateText = "UPDATE event SET name = $1, description = $2, event_date = $3, color = $4 WHERE id = $5";
        const result = await db.query(updateText, [name, description, date, color, id]);
        return result;
    }
};

module.exports = event;