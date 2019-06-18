<template>
	<div id="app" :class="{'hide-menu' : !isMenuVisible || !user}"> <!--CSS condicional -se o menu não estiver visivel, ou usuario não estiver logado aplicar classe-->
		<Header title="Cod3r - Base de Conhecimento" 
			:hideToggle = "!user"
			:hideUserDropdown= "!user"></Header>
		<Menu v-if="user"></Menu> <!--Mostrar menu só quando usuario estiver logado-->
		<Loading v-if="validatingToken"/>
		<Content v-else></Content> <!--Conteudo não ira aparecer até a validação do token estiver concluida (validatingToken = false)-->
		<Footer></Footer>
	</div>
</template>

<script>
import axios from 'axios'
import {baseApiUrl, userKey} from '@/global'
import {mapState} from 'vuex' //manipular atributos store
import Header from './components/template/Header'
import Menu from './components/template/Menu'
import Content from './components/template/Content'
import Footer from './components/template/Footer'
import Loading from './components/template/Loading' //Componente de loading da validação do token

export default {
	name: "App",
	components: {Header, Menu, Content, Footer, Loading},
	computed: mapState(['isMenuVisible', 'user']), //Mapeando atributos da store
	data: function(){
		return{
			validatingToken: true //Atributo que ira dizer se o app vai ou não precisar validar o token (quando recarrega a pagina ou sai e entra de novo)
		}
	},
	methods: {
		async validateToken(){ //Metodo que ira validar o token (quando o usuario sair da aplicação, e retornar para mesma)
			this.validatingToken = true

			const json = localStorage.getItem(userKey) //Pegando o usuario setado no localStorage
			const userData = JSON.parse(json) //Convertendo em JSON
			this.$store.commit('setUser', null) //Setando usuario para nullo, caso venha um objeto vazio em json

			if(!userData){
				this.validatingToken = false //Se user estiver vazio retorna para tela de login
				return this.$router.push({name: 'auth'})
			}

			const res = await axios.post(`${baseApiUrl}/validateToken`, userData) //Fazendo a validação do token

			if (res.data){
				this.$store.commit('setUser', userData) //Setando o usuario no store
			}else{
				localStorage.removeItem(userKey)
				this.$router.push({name: 'auth'}) //Se data estiver vazio, voltar para login
			}
			
			this.validatingToken = false //Para não ficar validando sempre o token (loop infinito)

			//Responsividade - se o tamanho da tela (definidos em mq.js) forem os abaixos, esconde o menu
            if(this.$mq === 'xl' || this.$mq === 'sm'){
                this.$store.commit('toggleMenu', false)
            }
		}
	},
	created(){
		this.validateToken() //Executando metodo quando carrega aplicação
	}
}
</script>

<style>
	*{
		font-family: "Lato", sans-serif;
	}

	body{
		margin: 0;
	}

	#app{
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;

		height: 100vh;
		display: grid;
		grid-template-rows: 60px 1fr 40px;
		grid-template-columns: 300px 1fr;
		grid-template-areas: 
			"header header"
			"menu content"
			"footer footer";
	}

	#app.hide-menu{ /*Classe aplicada quando menu não esta visivel*/
		grid-template-areas: 
			"header header"
			"content content"
			"footer footer";
	}
</style>