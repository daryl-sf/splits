import express from 'express';

const router = express.Router();

router.get('/', (_, res) => {
  res.send('Hello Races!');
});

router.get('/:id', (req, res) => {
  res.send(`Race ${req.params.id}!`);
});

router.post('/new', (req, res) => {
  console.log(`Create race ${req.body.name}`);
  req.io.emit('raceCreated', req.body);
  res.json(req.body);
});

export default router;
