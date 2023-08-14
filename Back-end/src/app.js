if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const bodyparser = require('body-parser');
const GNRequest = require('./apis/afi');
const cors = require('cors');


const app = express();

app.use(bodyparser.json());
app.use(cors());

app.set('view engine', 'ejs');
app.set('views', 'src/views');

const reqGNAlready = GNRequest.GNRequest({
    clientID: process.env.GN_CLIENT_ID,
    clientSecret: process.env.GN_CLIENT_SECRET
});

app.get('/gerarcobranca', async(req, res) => {
    const { name, cpf, value, description } = req.query;
    const expiracao = 3600;

    const reqGN = await reqGNAlready;
    const urlCharge = '/v2/cob';
    const urlQRCode = (idLoc) => {
        return `/v2/loc/${idLoc}/qrcode`;
    };

    const dataCob = {
        calendario: {
            expiracao: expiracao
        },
        devedor: {
            cpf: cpf, 
            nome: name 
        },
        valor: {
            original: value
        },
        chave: '068a706d-e46d-4aff-afbf-450c751ad5ee',
        solicitacaoPagador: description
    };
    try {
        const cobResponse = await reqGN.post(urlCharge, dataCob);
        const qrcodeResponse = await reqGN.get(urlQRCode(cobResponse.data.loc.id)); 
        
        res.status(200).send({
            qrcode: 'qrcode',
            value: value,
            expirationTime: expiracao,  
            qrcodeImage: qrcodeResponse.data.imagemQrcode});
    } catch (error) {
        console.log(error);
        res.status(502).send({error: error});
    } 
    

       
});

app.get('/cobrancas', async (req, res) => {
    const reqGN = await reqGNAlready;
    const start = '2023-07-26T16:01:35Z';
    const end = '2023-08-03T22:10:00Z';
    const urlListCob = `/v2/cob?inicio=${start}&fim=${end}`;

    const cobResponse = await reqGN.get(urlListCob);
    res.send(cobResponse.data);
});

app.get('/pix', async (req, res) => {
    const reqGN = await reqGNAlready;
    const start = '2023-07-26T16:01:35Z';
    const end = '2023-08-03T22:10:00Z';
    const urlListCob = `/v2/pix?inicio=${start}&fim=${end}`;

    const cobResponse = await reqGN.get(urlListCob);
    res.send(cobResponse.data);
});

// (/pix)? endpoint opcional solicitado pela API EFI
app.post('/webhook(/pix)?', (req, res) => {
    console.log(req.body); //Instalado o body-parser para receber respose extra servidor
    res.send('200');
});


app.listen(8000, () => {
    console.log('Server only API PIX');
});


