const db = require('../db');

const event = {
    findById: async (id) => {
        const queryText = "SELECT name, description, event_date FROM event WHERE id = $1";
        const result = await db.query(queryText, [id]);
        return result;
    },
    findByUserId: async (userId) => {
        const queryText = "SELECT id, name, description, event_date FROM event WHERE user_id = $1";
        const result = await db.query(queryText, [userId]);
        return result;
    },
    create: async (name, description, date, userId) => {
        const insertText = "INSERT INTO event (name, description, event_date, user_id) VALUES ($1, $2, $3, $4)";
        const result = await db.query(insertText, [name, description, date, userId]);
        return result;
    },
    update: async (id, name, description, date) => {
        const updateText = "UPDATE event SET name = $1, description = $2, event_date = $3 WHERE id = $4";
        const result = await db.query(updateText, [name, description, date, id]);
        return result;
    }
};

module.exports = event;