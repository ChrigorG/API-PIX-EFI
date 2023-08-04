if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const GNRequest = require('./apis/afi');


const app = express();
app.set('view engine', 'ejs');
app.set('views', 'src/views');

const reqGNAlready = GNRequest.GNRequest();

app.get('/', async(req, res) => {
    const reqGN = await reqGNAlready;
    const urlCharge = '/v2/cob';
    const urlQRCode = (idLoc) => {
        return `/v2/loc/${idLoc}/qrcode`;
    };

    const dataCob = {
        calendario: {
            expiracao: 3600
        },
        devedor: {
            cpf: '12345678909',
            nome: 'Francisco da Silva'
        },
        valor: {
            original: '12.45'
        },
        chave: '068a706d-e46d-4aff-afbf-450c751ad5ee',
        solicitacaoPagador: 'Cobrança dos serviços prestados.'
    };

    const cobResponse = await reqGN.post(urlCharge, dataCob);
    const qrcodeResponse = await reqGN.get(urlQRCode(cobResponse.data.loc.id));

    res.send(qrcodeResponse.data);
});


app.listen(8000, () => {
    console.log('Server only API PIX');
});


