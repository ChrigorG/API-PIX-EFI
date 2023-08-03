if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const axios = require('axios');
// File system
const fs = require('fs');
const path = require('path');
const https = require('https');



const cert = fs.readFileSync(
    path.resolve(__dirname, `../certs/${process.env.GN_CERT}`)
);

const agent = new https.Agent({
    pfx: cert,
    passphrase: ''
});

const credentials = Buffer.from(
    `${process.env.GN_CLIENT_ID}:${process.env.GN_CLIENT_SECRET}`
).toString('base64');



const app = express();
app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.get('/', async(req, res) => {
    const authResponse = await axios({
        method: 'POST',
        url: `${process.env.GN_ENDPOINT}/oauth/token`,
        headers: {
            Authorization: `Basic ${credentials}`,
            'Content-Type': 'application/json'
        },
        httpsAgent: agent,
        data: {
            grant_type: 'client_credentials'
        }
    });

    const accessToken = authResponse.data?.access_token; // => ? optional chaining
    const urlCharge = '/v2/cob';

    const reqGN = axios.create({
        baseURL: process.env.GN_ENDPOINT,
        httpsAgent: agent,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });

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
    
    res.send(cobResponse.data);
});


app.listen(8000, () => {
    console.log('Server only API PIX');
});


