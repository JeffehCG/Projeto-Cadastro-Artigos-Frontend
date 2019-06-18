<template>
    <header class="header">
        <a class="toggle" @click="toggleMenu" v-if = "!hideToggle"> <!--Esconder toggle , se hideToggle for true-->
            <i class="fa fa-lg" :class="icon"></i>
        </a>
        <h1 class="title">
            <router-link to = "/">{{title}}</router-link> <!--Quando clicar no link vai voltar pra pagina home-->
        </h1>
        <UserDropdown v-if = "!hideUserDropdown" /> <!--Dropdown ira aparecer apenas se for true-->
    </header>
</template>

<script>
import UserDropdown from './UserDropdown' //Importando o componente da imagem do usuario, e o dropdown

export default {
    name: 'Header',
    components: {UserDropdown}, //Referenciando componente para ser usado
    props: {
        title: String,
        hideToggle: Boolean, //Define se o toggle ira aparecer o não (parametro passado pela chamada dele)
        hideUserDropdown: Boolean
    },
    computed: {
        icon() { //icone para esconder menu
            return this.$store.state.isMenuVisible ? "fa-angle-left" : "fa-angle-down" //Quando menu estiver visivel sera um icone para esqueda, e quando não, sera um icone para baixo
        }
    },
    methods: {
        //Metodo para esconder o menu quando clicar no toggle
        toggleMenu(){
            this.$store.commit('toggleMenu') //Chamando função da store (para esconder ou aparecer o menu)
        }
    }
}
</script>

<style>
    .header{
        grid-area: header;
        background: linear-gradient(to right, #1e469a, #49a7c1);

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .title {
        font-size: 1.2rem;
        color: #fff;
        font-weight: 100;
        flex-grow: 1; 
        text-align: center;
    }

    .title a {
        color: #fff;
        text-decoration: none;
    }

    .title a:hover {
        color: #fff;
        text-decoration: none;
    }

    header.header > a.toggle{
        width: 60px;
        height: 100%;
        color: #fff;
        justify-self: flex-start;
        text-decoration: none;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    header.header > a.toggle:hover{
        background-color: rgba(0,0,0,0.2);
        color: #fff;
    }
</style>
