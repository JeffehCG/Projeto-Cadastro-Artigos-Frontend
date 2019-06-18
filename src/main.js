import 'font-awesome/css/font-awesome.css' //Importando o font-awesome para ser usado na aplicação
import Vue from 'vue'

import App from './App'

import './config/bootstrap' //Carregando o bootstrap para ser usado na pagina
import './config/msg' //Carregando arquivo de componente de mensagem (erro/sucesso) das requisições
import './config/axios' //Arquivo de verificação de erro de requisições axios (token expirado)
import './config/mq' //Arquivo de responsividade

import store from './config/store' //importando store, atributos compartilhados entre componentes
import router from './config/router' //Importando arquivo de rotas de navegação

Vue.config.productionTip = false

// TEMPORARIO (Colocando um token valido diretamente aqui, para poder acessar o backend sem estar com o login no front pronto)
// require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IkplZmZlcnNvbiBDLiBHb21lcyIsImVtYWlsIjoiamVmZkBnbWFpbC5jb20iLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTU1MTAwODQ1LCJleHAiOjE1NTUzNjAwNDV9.opBMsFwwQZMiTKBjv9vBs6Mwj6LLgBch53T7jS6dlOM'

new Vue({
  store, //colocando a store no contexto, para poder ser acessada pelos outros componentes
  router,
  render: h => h(App)
}).$mount('#app')