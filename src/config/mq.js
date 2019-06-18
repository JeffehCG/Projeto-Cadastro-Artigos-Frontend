//Arquivo de responsividade
import Vue from 'vue'
import VueMq from 'vue-mq'

Vue.use(VueMq, {
    breakpoints:{ //Tamanhos dos dispositivos (por quantidade de pixels)
        xs: 576,
        sm: 768,
        md: 960,
        lg: 1140,
        xl: Infinity
    }
})