<template>
    <div class="main-cobranca">
        <div class="cobranca">
            <div class="title-charge">
                <h1>Dados da Cobrança</h1>
                <hr>
            </div>
            <form @submit.prevent="createcharge">
                <div class="block">
                    <input type="text" v-model="name" placeholder="Nome do devedor">
                </div>
                <div class="block">
                    <input type="text" v-model="cpf" @input="formatcpf" maxlength="14" placeholder="000.000.000-00">                 
                </div>
                <div class="block">
                    <input type="text" v-model="value" @input="formatCurrency(value)" maxlength="13" placeholder="25,50">
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
            url: 'http://localhost:8000/cobranca',
            name: '',
            cpf: '',
            value: '',
            description: ''
        }
    },
    methods: {
        formatCurrency(value) { 
            value = value.replace(/\D/ig, '');
            value = value.replace(/([0-9]{2})$/g, ",$1");
            
            if (value.length > 6) {
                value = value.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
            }

            this.value = 'R$ ' + value;
            if (value == 'NaN'){
                this.value = '';
            }
        },
        formatcpf: function (){
            const regex2 = /(\d{3})(\d{0,3})/ig;
            const regex3 = /(\d{3})(\d{3})(\d{0,3})/ig;
            const regex4 = /(\d{3})(\d{3})(\d{3})(\d{0,2})/ig;

            let newCPF = this.processCPF(this.cpf);
            this.cpf = newCPF;
            if (newCPF.length == 3){
                this.cpf = newCPF;
            }else if (newCPF.length <= 6){
                this.cpf = newCPF.replace(regex2, '$1.$2');
            }else if (newCPF.length <= 9){
                this.cpf = newCPF.replace(regex3, '$1.$2.$3');
            }else if (newCPF.length <= 12){
                this.cpf = newCPF.replace(regex4, '$1.$2.$3-$4');
            }
        },
        processvalue: function (value){
            value = value.replace(".", "");
            value = value.replace(",", ".");
            value = value.replace("R$", "");
            value = value.replace(/\s*/g, "");
            if (value.length == 3) {
                value = `0${value}`;
            }
            return value;
        },
        processCPF: function (oldcpf){
            let newcpf = oldcpf.replace(/\D/ig, "");
            return newcpf;
        },
        createcharge: function (){
            if (this.name == '' || this.cpf == '' || this.value == '' || this.description == ''){
                alert('Todos os dados precisam ser preenchidos!!'); 
            }else if (this.cpf.length != 14){
                alert('CPF incorreto!!');
            }else if (this.value == 0) {
                alert('O valor não pode estar zerado!!'); 
            }else {
                const value = this.processvalue(this.value);
                console.log(value);
                const cpf = this.processCPF(this.cpf);
                const params = {
                    name: this.name,
                    cpf: cpf,
                    value: value,
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
    color: rgb(0, 99, 161);
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