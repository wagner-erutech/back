const express = require('express')
const router = express.Router()

const candidatoController = require('../controller/candidatoFileController') 

router.post('/add',candidatoController.addCandidatos)
router.put('/:id',candidatoController.updateCandidatos)
router.get('/',candidatoController.getCandidatos)
router.delete('/:id',candidatoController.removeCandidatos)

module.exports = router