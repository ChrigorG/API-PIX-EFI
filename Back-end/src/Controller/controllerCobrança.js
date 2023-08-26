const GNRequest = require('../apis/afi');
const expiration = 1800;
const reqGNAlready = GNRequest.GNRequest({
    clientID: process.env.GN_CLIENT_ID,
    clientSecret: process.env.GN_CLIENT_SECRET
});

// Funciton
function dataChange (name, cpf, value, description){
    return {
        calendario: {
            expiracao: expiration
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
}

const createChange = async (req, res) => {
    const { name, cpf, value, description } = req.query;

    const reqGN = await reqGNAlready;
    const urlCharge = '/v2/cob';
    const urlQRCode = (idLoc) => {
        return `/v2/loc/${idLoc}/qrcode`;
    };

    const dataCob = dataChange(name, cpf, value, description);
    try {
        const cobResponse = await reqGN.post(urlCharge, dataCob);
        const qrcodeResponse = await reqGN.get(urlQRCode(cobResponse.data.loc.id)); 
        
        console.log(qrcodeResponse.data);

        res.status(200).send({
            copyAndPaste: qrcodeResponse.data.qrcode,
            value: value,
            expirationTime: expiration,  
            qrcodeImage: qrcodeResponse.data.imagemQrcode
        });

    } catch (error) {
        console.log(error);
        res.status(502).send({error: error});
    }  
};

const getChanges = async (req, res) => {
    const reqGN = await reqGNAlready;
    const start = '2023-07-26T16:01:35Z';
    const end = '2023-08-03T22:10:00Z';
    const urlListCob = `/v2/cob?inicio=${start}&fim=${end}`;

    const cobResponse = await reqGN.get(urlListCob);
    res.send(cobResponse.data);
};

const getPix = async (req, res) => {
    const reqGN = await reqGNAlready;
    const start = '2023-07-26T16:01:35Z';
    const end = '2023-08-03T22:10:00Z';
    const urlListCob = `/v2/pix?inicio=${start}&fim=${end}`;

    const cobResponse = await reqGN.get(urlListCob);
    res.send(cobResponse.data);
}

module.exports = {
    createChange,
    getChanges,
    getPix
}