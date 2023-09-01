# **API PIX - EFI Bank (GerenciaNet)**

### Descrição:
  Este é um projeto que faz o uso e o consumo da **API EFI Bank**, antiga GerenciaNet. Um projeto voltado para **estudos e práticas de programação**.
  Foi utilizado alguns recursos básicos da API como: Autenticação com EFI, criação de cobrança imediata e o próprio gerador de PIX (QRCode), que por sua vez, faz interação/ponte do pagamento do **usuario** e o **Banco Central** de forma imediata. 
  
  Obs.: O pagamento via QRCode só funciona utilizando o certificado de **Produção**, sendo assim, o certificado de Homologação serve para relizar os testes relacionados ao desenvolvimento. Para uso, configure as variáveis de ambiente (Client_ID, Client_Secret, Endpoint, certificado_utual, modo_atual);

![tela2](https://github.com/ChrigorG/API-PIX-EFI/assets/99369312/6d4c272b-88f3-44b0-8e7d-767e5c7f705f)

![Tela](https://github.com/ChrigorG/API-PIX-EFI/assets/99369312/ff99d665-7acd-41dc-b650-0b852d2b6e77)

---

### Recursos Necessarios da API: 

1. Autenticação (Auth token)
2. Certificados (Homologação e Produção)

---

### Dependencias Utilizadas:
1. Node.JS
2. Vue.JS
3. Express.JS
4. EJS
5. Axios
6. Body-Parser
7. ESLint
8. DotEnv

---
### Modo de uso: 

1. Faça um clone do projeto
2. Abra duas guias da sua IDE favorita, abra a Pasta Front-End na outra Guia abra o Back-End
3. Crie um pasta dentro de: **/Back-End/** chamado **certs**
4. Dentro do projeto Back-End, no terminal, execute o camando **npm install** para instalar as dependências
5. Acesse o site da EFI BANK e faça o download dos certificados e cole na pasta criada **certs**.
6. Crie um arquivo na pasta Raiz **/Back-End** chamado **.env** Configure a as variaveis de ambiente (GN_CLIENT_ID, GN_CLIENT_SECRET, GN_ENDPOINT, NODE_ENV, GN_CERT.
7. Os dados como GN_CLIENT_ID, GN_CLIENT_SECRET você encontra no site da EFI
8. Seu GN_ENDPOINT aponta para o dominio da EFI "https://api-pix-h.gerencianet.com.br", NODE_ENV (produção ou homolagação) e GN_CERT aponta para seu certificado ao qual deseja utilizar.

---

### Endpoints:
* GET

  /gerarcobranca

    Este endpoint é responsavel por gerar a cobranca com AFI Bank, com prazo de expiração, dados do devedor, o valor, a chave PIX e sua descrição;

  #### Parametros

    Nenhum
  
  #### Resposta

    Ok! 200
  
    Isto gera um JSON com a descrição "qrcode" e a imagem do QRCode

Exemplo:
```
{
  "qrcode": "qrcode",
  "qrcodeImage": "data:image/png;base64,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"
}
```

* GET

  /pix

    Este endpoint é responsavel por buscar todos os pix feito dentro de um prazo pré determinado;

  #### Parametros

    Nenhum
  
  #### Resposta

    Ok! 200 

Exemplo:
```
{
  "parametros": {
    "inicio": "2023-07-26T16:01:35Z",
    "fim": "2023-08-03T22:10:00Z",
    "paginacao": {
      "paginaAtual": 0,
      "itensPorPagina": 100,
      "quantidadeDePaginas": 0,
      "quantidadeTotalDeItens": 1
    }
  },
  "pix": [
    { 
      "endToEndId": "E09089356202210251205APIcdbe38b4",
      "idEnvio": "identificadoEnvio123456789",
      "valor": "0.01",
      "chave": "19974764017",
      "status": "REALIZADO",
      "infoPagador": "Segue o pagamento da conta (pix.sent)",
      "horario": {
          "solicitacao": "2022-10-26T09:05:32.000Z",
          "liquidacao": "2022-10-26T09:05:31.000Z"
      }
    }
  ]
}
```

* GET

  /pix

    Este endpoint é responsavel por buscar todas as cobranças feitas dentro de um prazo pré determinado;

  #### Parametros

    Nenhum
  
  #### Resposta

    Ok! 200 

Exemplo:
```
{
  "parametros": {
    "inicio": "2023-07-26T16:01:35.000Z",
    "fim": "2023-08-03T22:10:00.000Z",
    "paginacao": {
      "paginaAtual": 0,
      "itensPorPagina": 100,
      "quantidadeDePaginas": 1,
      "quantidadeTotalDeItens": 18
    }
  },
  "cobs": [
    {
      "calendario": {
        "criacao": "2023-08-03T03:20:05.000Z",
        "expiracao": 3600
      },
      "txid": "5a6d7f78a1d446988a1be61c55bef2e3",
      "revisao": 0,
      "loc": {
        "id": 18,
        "location": "qrcodespix-h.sejaefi.com.br/v2/eb7f17c49fe446f7960fb92dc6b81ad1",
        "tipoCob": "cob",
        "criacao": "2023-08-03T03:20:05.000Z"
      },
      "location": "qrcodespix-h.sejaefi.com.br/v2/eb7f17c49fe446f7960fb92dc6b81ad1",
      "status": "ATIVA",
      "devedor": {
        "cpf": "12345678909",
        "nome": "Francisco da Silva"
      },
      "valor": {
        "original": "12.45"
      },
      "chave": "068a706d-e46d-4aff-afbf-450c751ad5ee",
      "solicitacaoPagador": "Cobrança dos serviços prestados."
    }
  ]
}
```

