const express = require('express');
const router = express.Router();
const controller = require('../Controller/controllerCobrança');

router.get('/cobranca', controller.createChange);

router.get('/cobrancas', controller.getChanges);

router.get('/pix', controller.getPix);

// (/pix)? endpoint opcional solicitado pela API EFI
router.post('/webhook(/pix)?', (req, res) => {
    console.log(req.body); //Instalado o body-parser para receber response extra servidor
    res.send('200');
});

module.exports = router;
