<template>
    <div class="main-cobranca">
        <div class="cobranca">
            <div class="title-charge">
                <h1>Dados da Cobrança</h1>
                <hr>
            </div>
            <form @submit.prevent="createCharge">
                <div class="block">
                    <input type="text" v-model="name" placeholder="Nome do devedor">
                </div>
                <div class="block">
                    <input type="text" v-model="cpf" placeholder="000.000.000-00">                 
                </div>
                <div class="block">
                    <input type="text" v-model="value" placeholder="25,50">
                </div>
                <div class="block">
                    <input type="text" v-model="description" placeholder="Descrição do serviço">
                </div>
                <button type="submit">Gerar Cobrança</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data () {
        return {
            url: 'http://localhost:8000/gerarcobranca',
            name: '',
            cpf: '',
            value: '',
            description: ''
        }
    },
    methods: {
        createCharge: function (){
            const params = {
                name: this.name,
                cpf: this.cpf,
                value: this.value,
                description: this.description
            };
     
            axios.get(this.url, { params }).then(response => {
                this.$emit('data-emitted', response);
            }).catch((err) => {
                console.log(err);
                alert('Erro no servidor');
            });
        }
    }
}
</script>

<style>

button{
    background-color: rgb(196, 229, 249); 
    color: rgb(0, 57, 92);
    width: 150px;
    height: 40px;
    border-radius: 20px;
    margin-top: 30px;
    border: none;
    cursor: pointer;
}

button:hover{
    background-color: rgb(122, 200, 248);
    color: rgb(0, 99, 161);;
}

input{
    width: 80%;
    height: 20px;
    margin-left: 10px;
    border: none;
    outline: 0;
    color: rgb(45, 45, 45);;
}

form{
    margin-top: 15%;
}

hr{
    width: 100%;
}

.main-cobranca{
    margin: 0%;
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.cobranca{
    width: 70%;
    height: 100%;
    text-align: center;
}

.title-charge{
    height: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.title-charge > h1{
    margin: 0;
    font-size: 25px;
    font-family: 'Segoe UI', sans-serif;
    color: rgb(40, 40, 40);
}

.block{
    height: 30px;
    border: 1px solid rgb(170, 170, 170);
    border-radius: 10px;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

</style>