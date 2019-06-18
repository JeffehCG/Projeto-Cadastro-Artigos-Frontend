//Arquivo contendo variaveis, e metodos globais, que seram utilizados em varios componentes

import Vue from 'vue'

export const userKey = '__knowledge_user' //Chave se usuario, para armazenamento no localStorege
export const baseApiUrl = "http://localhost:3002" //URL do backend , para se comunicar

export function showError(e){ //Metodo para tratar as mensagens de erro
    if(e && e.response && e.response.data){ //Exibindo a mensagem de erro dentro de data (quando ela vem setada)
        Vue.toasted.global.defaultError({msg: e.response.data})
    }else if (typeof e === 'string'){
        Vue.toasted.global.defaultError({msg: e}) //Se o erro for uma string exibir
    }else{
        Vue.toasted.global.defaultError() //Se não for nenhuma das anteriores, exibir mensagem padrão do arquivo msg.js
    }
}

export default {baseApiUrl, showError, userKey}