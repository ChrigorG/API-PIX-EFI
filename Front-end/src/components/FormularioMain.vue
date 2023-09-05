<template>
    <div class="main">
        <div class="formulario">
            <FormularioCobranca @data-emitted="handleDataFromChild" class="formChange"/>
            <FormularioQRCodeVue :dataCharge="dataCharge" class="formQrcode"/>
        </div>  
        <p id="cretead">By 
            <a href="https://www.linkedin.com/in/chrigor-gazal/" target="_blank" rel="noopener noreferrer">Chrigor</a>
        </p>
    </div>
</template>

<script>
import FormularioCobranca from './FormularioCobranca.vue';
import FormularioQRCodeVue from './FormularioQRCode.vue';

export default {
    data (){
        return {
            dataCharge: {
                data: {
                    copyAndPaste: null,
                    value: null,
                    expirationTime: null,  
                    qrcodeImage: null
                }
            }
        }
    },
    components: {
        FormularioCobranca,
        FormularioQRCodeVue
    },
    methods: {
        handleDataFromChild(data) {
            this.dataCharge = data;
        }
    }
}
</script>

<style>

a{
    color: inherit;
}

#cretead{
    color: white;
}

.main, .formulario{
    display: flex;
    font-family: 'Roboto', sans-serif;
}

.main{
    background-color: #815ab7;
    background-image:
        radial-gradient(ellipse at 10% 90%, #3c2d83 0%, transparent 55%),
        radial-gradient(ellipse at 90% 90%, #c33c65 0%, transparent 55%),
        radial-gradient(ellipse at 90% 10%, #4a74dc 0%, transparent 55%),
        radial-gradient(ellipse at 10% 10%, #35244f 0%, transparent 55%);
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.formulario{
    background-color: white;
    margin-top: 20px;
    width: 80%;
    height: 85%;
    border-radius: 10px;
    box-shadow: 10px 10px 20px rgb(15, 15, 15);
}

@media (max-width: 700px ) {

    .main{
        height: 150vh;
    }

    .formulario{
        height: 140vh;
        display: block;
    }

    .formChange{
        width: 100%;
        height: 40%;
    }

    .formQrcode{
        width: 100%;
        height: 40%;
    }

    .pos-loading > img{
        width: 70%;
        height: 70%;
    }

    .expiration-qrcode{
        width: 50%;
    }
}

@media (max-width: 600px ) and (max-height: 800px) {

    .main{
        height: 180vh;
    }

    .formulario{
        height: 170vh;
    }
}

</style>