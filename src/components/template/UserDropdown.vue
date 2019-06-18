<template>
    <div class="user-dropdown">
        <div class="user-button"> <!--Botão que acionado exibe o dropdown do usuario no canto direito superior-->
            <span class="d-none d-sm-block">
                {{user.name}} <!--Nome do usuario-->
            </span>
            <div class="user-dropdown-img"> <!--Imagem do usuario-->
                <Gravatar :email="user.email" alt="User" />
            </div>
            <i class="fa fa-angle-down"></i> <!--Icone para abrir ou fechar o dropdown-->
        </div>
        <div class="user-dropdown-content"> <!--Itens do dropdown-->
            <!--router-link é utilizado para quando clicar, colocar o caminho , que sera lido pelo arquivo de rotas (é praticamente um href-->
            <router-link to="/admin" v-if="user.admin"> <!--Ira exibir apenas se o usuario for admin-->
                <i class="fa fa-cogs">Administração</i>
            </router-link>
            <a href @click.prevent="logout"><i class="fa fa-sign-out"></i>Sair</a>
        </div>
    </div>
</template>

<script>
import {userKey} from '@/global' //Chave para efetuar o logout
import {mapState} from 'vuex' //Mapeando stados da store
import Gravatar from 'vue-gravatar' //Componente que verificara o email logado, se conhecer, exibira a imagem do usuario

export default {
    name: 'UserDropdown',
    components: {Gravatar},
    computed: mapState(['user']), //Atributo da store (usuario logado)
    methods: {
        logout(){ //Metodo para fazer logout
            localStorage.removeItem(userKey) //Removendo localStorage
            this.$store.commit('setUser', null) //Chamando metodo para apagar user da sessão
            this.$router.push({name: 'auth'}) //Navegando para tela de login
        }
    }
}
</script>

<style>
    .user-dropdown{
        position: relative; /*relative para os itens do dropdown aparecer*/
        height: 100%;
    }
    .user-button{
        display: flex;
        align-items: center;
        color: #fff;
        font-weight: 100;
        height: 100%;
        padding: 0px 20px;
    }

    .user-dropdown:hover{
        background-color: rgba(0, 0, 0, 0.2)
    }

    .user-dropdown-img{
        margin: 0px 10px;
    }

    .user-dropdown-img > img {
        max-height: 37px;
        border-radius: 5px;
    }

    .user-dropdown-content{
        position: absolute;
        right: 0px;
        background-color: #f9f9f9;
        min-width: 170px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        padding: 10px;
        z-index: 1;

        display: flex;
        flex-direction: column;
        flex-wrap: wrap;

        visibility: hidden;
        opacity: 0;
        transition: visibility 0s , opacity 0.5s;
    }

    .user-dropdown:hover .user-dropdown-content{ /*Fazer dropdown aparecer quando passar por cima*/
        visibility: visible;
        opacity: 1;
    }

    .user-dropdown-content a {
        text-decoration: none;
        color: #000;
        padding: 10px;
    }

    .user-dropdown-content a:hover{
        background-color: #ededed;
        text-decoration: none;
        color: #000;
        padding: 10px;
    }
</style>
