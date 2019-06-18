//Arquivo de administração das mensagens de erro, exibidas para o usuario

import Vue from 'vue'
import Toasted from 'vue-toasted' //Mensagens (erro e sucesso)

Vue.use(Toasted,{ //Configuração, usando os icones do fontawesome , e duração da mensagem 3 segundos
    iconPack: 'fontawesome',
    duration: 3000
})

//Mensagem padrão de sucesso
Vue.toasted.register(
    'defaultSuccess',
    payload => !payload.msg ? 'Operação realizada com sucesso' : payload.msg,
    {type: 'success', icon: 'check'}
)

//Mensagem padão de erro
Vue.toasted.register(
    'defaultError',
    payload => !payload.msg ? 'Oops.. Erro inesperado' : payload.msg, //Se o payload conter mensagem, exibila, do contrario exibir a padrão
    {type: 'error', icon: 'times'}
)