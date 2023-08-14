<template>
    <div class="main">
        <div class="formulario">
            <FormularioCobranca @data-emitted="handleDataFromChild"/>
            <FormularioQRCodeVue :dataCharge="dataCharge"/>
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
                    qrcode: null,
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

a {
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
    background-color: rgb(45, 48, 50);
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
    height: 80%;
    border-radius: 10px;
    box-shadow: 10px 10px 10px rgb(15, 15, 15);
}

@media (max-width: 600px ) {

    .main{
        height: 120vh;
    }

    .formulario{
        height: 110vh;
        display: block;
    }

    .main-cobranca, .main-qrcode{
        width: 100%;
        height: 50%;
    }

    .pos-loading > img{
        width: 70%;
        height: 70%;
    }
}

</style>