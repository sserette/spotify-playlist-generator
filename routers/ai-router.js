const express = require('express');
const aiRouter = express.Router();
const ai = require(`${process.cwd()}/ai`);

aiRouter.all('/api/ai', async function (req, res) {
    try {
        let aiResult;
        if (req.method === 'GET') {
            aiResult = await ai.get(req.query.endpoint, req.session.access_token);
        }
        res.json(aiResult);
    } catch (err) {
        res.status(500);
        res.end();
        console.error(err);
    }
});

module.exports = aiRouter;
