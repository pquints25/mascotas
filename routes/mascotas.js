const express = require('express');
const {findAllMascotasController, findByIdMascotasController, createMascotaController, updateMascotaController, deleteMascotaController} = require("../controllers/mascotas");
const router  = express.Router();

router.get('/', findAllMascotasController);
router.get('/:id', findByIdMascotasController);
router.post('/', createMascotaController );
router.put('/:id', updateMascotaController);
router.delete('/:id', deleteMascotaController);


module.exports = router;