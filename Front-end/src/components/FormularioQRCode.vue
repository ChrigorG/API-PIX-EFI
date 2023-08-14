<template>
    <div class="main-qrcode">
        <div class="qrcode">
            <div class="qrtitle">
                <h1>PIX</h1>
                <hr>
            </div>
            <div class="qr">
                <div v-if="dataCharge.data.expirationTime == null" class="loading">
                    <img src="../assets/animate.svg" alt="animate">
                    <p>Aguardando cobrança ...</p>
                </div>
                <div v-else class="pos-loading">
                    <div hidden> {{ compt() }} </div>
                    <h2>R$ {{ this.dataCharge.data.value }}</h2>
                    <img :src="this.dataCharge.data.qrcodeImage" alt="">
                    <p> Espira em: {{ formatTime( countdown) }} </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data (){
        return {
            countdown: null,
            timer: null,
            value: null
        }
    },
    props: {
        dataCharge: {}
    },
    mounted() {
        this.startCountdown();
    },
    methods: {
        compt () {
            this.countdown = this.dataCharge.data.expirationTime;
        },
        startCountdown() {
            this.timer = setInterval(() => {
                if (this.countdown > 0) {
                    this.countdown--;
                } else {
                    clearInterval(this.timer);
                }
            }, 1000); // Atualiza a cada segundo (1000ms)
        },
        formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
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

hr{
    width: 100%;
}

.main-qrcode{
    margin: 0%;
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}


.qrcode{
    width: 70%;
    height: 100%;
    text-align: center;
}

.qrtitle {
    height: 20%;
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
    text-align: center;
}


</style>