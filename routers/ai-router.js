const express = require('express');
const aiRouter = express.Router();
const ai = require(`${process.cwd()}/ai`);

aiRouter.all('/api/ai/recommend-standard', async function (req, res) {
    try {
        let aiResult;
        if (req.method === 'GET') {
            aiResult = await ai.getStandard(req.query.seed, req.session.access_token);
        }
        res.json(aiResult);
    } catch (err) {
        res.status(500);
        res.end();
        console.error(err);
    }
});

aiRouter.all('/api/ai/recommend-standard-tests', async function (req, res) {
    try {
        let aiResult;
        if (req.method === 'GET') {
            aiResult = await ai.getStandardTests(req.session.access_token);
        }
        res.json(aiResult);
    } catch (err) {
        res.status(500);
        res.end();
        console.error(err);
    }
});

aiRouter.all('/api/ai/recommend-depth-first', async function (req, res) {
    try {
        let aiResult;
        if (req.method === 'GET') {
            aiResult = await ai.getDepthFirst(req.query.seed, req.session.access_token);
        }
        res.json(aiResult);
    } catch (err) {
        res.status(500);
        res.end();
        console.error(err);
    }
});

aiRouter.all('/api/ai/recommend-depth-first-tests', async function (req, res) {
    try {
        let aiResult;
        if (req.method === 'GET') {
            aiResult = await ai.getDepthFirstTests(req.session.access_token);
        }
        res.json(aiResult);
    } catch (err) {
        res.status(500);
        res.end();
        console.error(err);
    }
});

/*
aiRouter.all('/api/ai/recommend-a-star', async function (req, res) {
    try {
        let aiResult;
        if (req.method === 'GET') {
            aiResult = await ai.getAStar(req.query.seed, req.session.access_token);
        }
        res.json(aiResult);
    } catch (err) {
        res.status(500);
        res.end();
        console.error(err);
    }
});
*/

aiRouter.all('/api/ai/recommend-a-star-mean-popularity', async function (req, res) {
    try {
        let aiResult;
        if (req.method === 'GET') {
            aiResult = await ai.getAStarMeanPopularity(req.query.seed, req.session.access_token);
        }
        res.json(aiResult);
    } catch (err) {
        res.status(500);
        res.end();
        console.error(err);
    }
});

aiRouter.all('/api/ai/recommend-a-star-mean-popularity-tests', async function (req, res) {
    try {
        let aiResult;
        if (req.method === 'GET') {
            aiResult = await ai.getAStarMeanPopularityTests(req.session.access_token);
        }
        res.json(aiResult);
    } catch (err) {
        res.status(500);
        res.end();
        console.error(err);
    }
});

module.exports = aiRouter;
