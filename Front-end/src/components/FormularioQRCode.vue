<template>
    <div class="main-qrcode">
        <div class="qrcode">
            <div class="qrtitle">
                <h1>PIX</h1>
                <hr>
            </div>
            <div class="qr">
                <div v-if="counttime == null" class="loading">
                    <img src="../assets/animate.svg" alt="animate">
                    <p>Aguardando cobrança ...</p>
                </div>
                <div v-else class="pos-loading">
                    <div class="expiration-qrcode">
                        <p><b> Espira em: </b></p>
                        <p> {{ formatTime( this.counttime) }} </p>
                    </div>
                    <div class="image-qrcode">
                        <img :src="this.qrCode" alt="">
                    </div>
                    <div class="value-qrcode">
                        <h2>{{ this.value }}</h2>
                    </div>
                    <hr>
                    <div class="copyandpaste-qrcode">
                        <p>Código Pix (Copia e Cola)</p>
                        <p>{{ this.copyAndPaste }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data (){
        return {
            counttime: this.dataCharge.data.expirationTime,
            copyAndPaste: null,
            qrCode: null,
            timer: null,
            value: 0
        }
    },
    props: {
        dataCharge: {}
    },
    watch: {
        dataCharge(newTempo) {
            this.copyAndPaste = this.dataCharge.data.copyAndPaste;
            this.qrCode = this.dataCharge.data.qrcodeImage;
            this.value = this.dataCharge.data.value;
            this.counttime = newTempo.data.expirationTime;
            this.formatValue();
            this.startCountTime();
        }
    },
    methods: {
        startCountTime() {
            if (this.timer) {
                clearInterval(this.timer);
            }

            this.timer = setInterval(() => {
                if (this.counttime > 0) {
                    this.counttime--;
                } else {
                    clearInterval(this.timer);
                }
            }, 1000); // Atualiza a cada segundo (1000ms)
        },
        formatValue(){
            this.value = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(this.value);
        },
        formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            return `00:${minutes}:${remainingSeconds < 10 ?  '0' : ''}${remainingSeconds}`;
        },
    },
    beforeUnmount() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }
}
</script>

<style>

.main-qrcode{
    margin: 0%;
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.qrcode{
    width: 80%;
    height: 100%;
    text-align: center;
}

.qrtitle {
    height: 15%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.qrtitle > h1{
    margin: 0;
    font-size: 25px;
    font-family: 'Segoe UI', sans-serif;
    color: rgb(40, 40, 40);
}

.qr{
    height: 85%;
}

.loading{
    text-align: center;
}

.loading > img{
    margin-top: 10px;
    width: 80%;
}

.pos-loading{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.expiration-qrcode{
    background-color: rgb(45, 48, 50);
    color: white;
    width: 40%;
    border-radius: 10px;
    margin: 10px;
}

.expiration-qrcode > p{
    margin: 0;
    padding: 5px;
}

.copyandpaste-qrcode{
    width: 100%;
    overflow: hidden;
    word-wrap: break-word;
}

</style>