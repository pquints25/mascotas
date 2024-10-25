const express = require('express');
const {findAllMascotasController, findByIdMascotasController, createMascotaController, updateMascotaController} = require("../controllers/mascotas");
const router  = express.Router();

router.get('/', findAllMascotasController);
router.get('/:id', findByIdMascotasController);
router.post('/', createMascotaController );
router.put('/:id', updateMascotaController);



module.exports = router;