const { Router } = require('express');
const findAllDuenoController = require('../controllers/dueno');

const router = Router();

router.get('/', findAllDuenoController);

module.exports = router;