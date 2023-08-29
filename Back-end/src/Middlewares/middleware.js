const authenticateData = (req, res, next) => {
    const { name, cpf, value, description } = req.query;
    const regexvalue = /^\d{1,}\.\d{1,2}$/;

    if (name == '' || name == null || name == undefined ||
        cpf == '' || cpf == null || cpf == undefined ||
        value == '' || value == null || value == undefined ||
        description == '' || description == null || description == undefined) 
    {
        return res.status(400).json({ error: 'Exist fields inconsistent with API'});
    }

    if (cpf.length != 11 || isNaN(cpf)) {
        return res.status(400).json({ error: 'Field CPF inconsistent with API'});
    }

    if (Number(value) <= 0 || !(regexvalue.exec(value))){
        return res.status(400).json({ error: 'Field Value inconsistent with API'});
    }

    next();
}

module.exports = {
    authenticateData
};