<template>
    <div class="home">
        <PageTitle icon= "fa fa-home" main= "Dashboard" 
            sub = "Base de Conhecimento"/>
        <div class="stats"> <!--Colocando os status do sistema (qt categorias, artigos e usuarios)-->
            <Stat title = "Categorias" :value="stat.categories"
                icon="fa fa-folder" color="#d54d50"></Stat>
            <Stat title = "Artigos" :value="stat.articles"
                icon="fa fa-file" color="#3bc480"></Stat>
            <Stat title = "Usuarios" :value="stat.users"
                icon="fa fa-user" color="#3282cd"></Stat>
        </div>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle' //Importando o componente de titulo da pagina
import Stat from './Stat'
import axios from 'axios' //trabalhando com as requisições pro backend
import {baseApiUrl} from '@/global' //Url do backend

export default {
    name: 'Home',
    components: {PageTitle, Stat},
    data: function(){
        return{
            stat: {} //atributo que ira conter as statisticas do banco
        }
    },
    methods: {
        getStats(){ //Metodo que ira fazer a requisição pro backend, e pegar os status dele
            axios.get(`${baseApiUrl}/stats`)
                .then(res => this.stat = res.data) //Colocando os dados da resposta no atributo stat
        }
    },
    mounted(){ //Quando o componente for carregado, automaticamente chama essa função
        this.getStats()
    }
}
</script>

<style>
    .stats{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
</style>
