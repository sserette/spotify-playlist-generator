const express = require('express');
const aiRouter = express.Router();
const ai = require(`${process.cwd()}/ai`);

aiRouter.all('/api/ai/recommend', async function (req, res) {
    try {
        let aiResult;
        if (req.method === 'GET') {
            aiResult = await ai.get(req.query.seed, req.session.access_token);
        }
        res.json(aiResult);
    } catch (err) {
        res.status(500);
        res.end();
        console.error(err);
    }
});

module.exports = aiRouter;
