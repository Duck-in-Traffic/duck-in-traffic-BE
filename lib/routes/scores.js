const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize.js');
const Score = require('../models/Score.js');

module.exports = Router()
  .post('/', authenticate, authorize, async (req, res, next) => {
    try {
      const score = await Score.insert(req.body);
      res.send(score);
    } catch (err) {
      next(err);
    }
  })
  .get('/', async (_req, res, next) => {
    try {
      const scores = await Score.getAll();
      res.send(scores);
    } catch (err) {
      next(err);
    }
  })
  .get('/:id', async ({ params }, res, next) => {
    try {
      const score = await Score.getById(params.id);
      if (!score) {
        return next();
      }
      res.send(score);
    } catch (err) {
      next(err);
    }
  })
  .put('/:id', async ({ params, body }, res, next) => {
    try {
      const updatedCount = await Score.update(params.id, body);
      res.sendStatus(updatedCount === 1 ? 201 : 404);
    } catch (err) {
      next(err);
    }
  })
  .delete('/:id', async ({ params }, res, next) => {
    try {
      const deletedCount = await Score.del(params.id);
      res.sendStatus(deletedCount > 0 ? 201 : 404);
    } catch (err) {
      next(err);
    }
  });
