const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize.js');
const Inventory = require('../models/Inventory.js');

module.exports = Router()
  .post('/', authenticate, authorize, async (req, res, next) => {
    try {
      const inventory = await Inventory.insert(req.body);
      res.send(inventory);
    } catch (err) {
      next(err);
    }
  })
  .get('/', async (_req, res, next) => {
    try {
      const inventories = await Inventory.getAll();
      res.send(inventories);
    } catch (err) {
      next(err);
    }
  })
  .get('/:id', async ({ params }, res, next) => {
    try {
      const inventory = await Inventory.getById(params.id);
      if (!inventory) {
        return next();
      }
      res.send(inventory);
    } catch (err) {
      next(err);
    }
  })
  .put('/:id', async ({ params, body }, res, next) => {
    try {
      const updatedCount = await Inventory.update(params.id, body);
      res.sendStatus(updatedCount === 1 ? 201 : 404);
    } catch (err) {
      next(err);
    }
  })
  .delete('/:id', async ({ params }, res, next) => {
    try {
      const deletedCount = await Inventory.del(params.id);
      res.sendStatus(deletedCount > 0 ? 201 : 404);
    } catch (err) {
      next(err);
    }
  });
