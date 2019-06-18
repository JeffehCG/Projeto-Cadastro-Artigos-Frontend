//Area de compartilhamento de state entre os componentes (Para que eles possam compartilhar atributos de data(state))

import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex' //Dependencia para controle do compartilhamento dos atributos entre os componentes

Vue.use(Vuex) //Definindo que o vue usara o vuex

export default new Vuex.Store({
    state: { //Atributos que seram compartilhados entre componentes
        isMenuVisible: false, //Visibilidade menu
        user: null //usuario logado
    },
    mutations: {
        toggleMenu(state, isVisible){//Função responsavel por fazer a alternancia do estado do menu, quando ele some e aparece
            if(!state.user){
                state.isMenuVisible = false
                return //Parar execução do resto do metodo
            }
            
            if(isVisible === undefined) { //Se não foi passado nada pelo parametro isVisible, ele ira fazer a alternancia do estado
                state.isMenuVisible = !state.isMenuVisible //alternancia
            }else{
                state.isMenuVisible = isVisible //Se foi passado valor pelo isVisible (true or false) , esse valor sera fixado, sem alternar
            }
        },
        setUser(state, user){ //Metodo para setar usuario no atributo user da store
            state.user = user
            if(user){
                axios.defaults.headers.common['Authorization'] = `bearer ${user.token}` //Recebendo token do usuario logado
                state.isMenuVisible = true
            }else{
                delete axios.defaults.headers.common['Authorization']
                state.isMenuVisible = false
            }
        }
    }
})