//Componente do Crud do usuario
<template>
    <div class="article-admin">
        <b-form> 
            <input type="hidden" id="article-id" v-model="article.id"/>
            <b-row> 
                <b-col xs="12">
                    <b-form-group label = "Nome:" label-for="article-name">
                        <b-form-input id="article-name" type="text"
                            v-model="article.name" required
                            :readonly="mode === 'remove'" 
                            placeholder="Informe o Nome do Artigo..."/>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row> 
                <b-col xs="12">
                    <b-form-group label = "Descrição:" label-for="article-description">
                        <b-form-input id="article-description" type="text"
                            v-model="article.description" required
                            :readonly="mode === 'remove'" 
                            placeholder="Informe a Descrição do Artigo..."/>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row> 
                <b-col xs="12">
                    <b-form-group label = "Imagem (URL):" label-for="article-imageUrl">
                        <b-form-input id="article-imageUrl" type="text"
                            v-model="article.imageUrl" required
                            :readonly="mode === 'remove'" 
                            placeholder="Informe a URL da Imagem do Artigo..."/>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row> <!--Linha do combo box-->
                <b-col xs="12">
                    <b-form-group v-if = "mode==='save' " label = "Categoria" label-for="article-categoryId">
                       <b-form-select id= "article-categoryId"
                            :options="categories" v-model="article.categoryId"/><!--Quando o b-form-select é chamado , ele espera receber 2 valores (value e text), esses dois atributos estão dentro de categories-->
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row> <!--Linha do combo box-->
                <b-col xs="12">
                    <b-form-group v-if = "mode==='save' " label = "Autor" label-for="article-userId">
                       <b-form-select id= "article-userId"
                            :options="users" v-model="article.userId"/><!--Quando o b-form-select é chamado , ele espera receber 2 valores (value e text), esses dois atributos estão dentro de categories-->
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row> <!--Linha do VueEditor-->
                <b-col xs="12">
                    <b-form-group label = "Conteúdo" label-for="article-content">
                        <VueEditor v-model="article.content" :disabled = "mode === 'remove'" placeholder="Informe o Conteúdo do Artigo"/>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row> <!--Linha contendo os botões-->
                <b-col xl = '12'>
                    <b-button variant="primary" v-if="mode==='save'"
                        @click="save">Salvar</b-button> 
                    <b-button variant = "danger" v-if="mode === 'remove'"
                        @click="remove">Excluir</b-button>
                    <b-button class="ml-2" @click="reset">Cancelar</b-button>
                </b-col>
            </b-row>
        </b-form>
        <hr>
        <b-table hover striped :items="articles" :fields="fields"> <!--Exibindo tabela com o bootstrap-vue-->
            <template slot = "actions" slot-scope="data">
                <b-button variant ="warning" @click="loadArticle(data.item)" class="mr-2"> 
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant = "danger" @click="loadArticle(data.item, 'remove')"> 
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
        <b-pagination size = 'md' v-model="page"
            :total-rows = "count" :per-page="limit" /> <!--Componente de paginação do bootstrap-vue-->
    </div>
    
</template>

<script>
import {VueEditor} from 'vue2-editor'
import {baseApiUrl, showError} from '@/global'
import axios from 'axios'

export default {
    name: 'ArticleAdmin',
    components: {VueEditor}, //Componente para edição de texto do conteudo do artigo
    data: function(){
        return{
            mode: 'save', 
            article: {},  
            articles: [],
            categories: [],
            users: [],
            page: 1, //Atributo para paginação
            limit: 0, //Atributo para paginação
            count: 0, //Atributo para paginação
            fields: [ 
                {key: 'id', label: 'Código', sortable: true},
                {key: 'name', label: 'Nome', sortable:true},
                {key: 'description', label: 'Descrição', sortable:true},
                {key: 'actions', label: 'Ações'}
            ]
        }
    },
    methods: {
        loadArticles(){//metodo para pegar a lista de artigos do backend
            const url = `${baseApiUrl}/articles?page=${this.page}` //Passando o atributo page, para fazer a paginação 
            axios.get(url).then(res => {
                this.articles = res.data.data //A resposta da requisição retorna um objeto com 3 atributos (data, count e limit) os artigos estão dentro de data
                this.count = res.data.count
                this.limit = res.data.limit
            }) 
        },
        reset(){ //Metodo para limpar os campos do formulario
            this.mode = 'save'
            this.article = {}
            this.loadArticles()
        },
        save(){ //Metodo para cadastrar e alterar artigo
            const method = this.article.id ? 'put' : 'post'
            const id = this.article.id ? `/${this.article.id}` : ''
            axios[method](`${baseApiUrl}/articles${id}`, this.article) 
                .then(()=>{
                    this.$toasted.global.defaultSuccess() //Exibindo mensagen de sucesso
                    this.reset()
                })
                .catch(showError) //Exibindo msg de erro, caso entre no catch
        },
        remove(){ //Metodo para remover artigo
            const id = this.article.id
            axios.delete(`${baseApiUrl}/articles/${id}`)
                .then(()=>{
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        loadArticle(article, mode= 'save'){ //Metodo para carregar artigos no formulario (para alteração e exclusão)
            this.mode = mode
            axios.get(`${baseApiUrl}/articles/${article.id}`)
                .then(res => this.article = res.data) 
        },
        loadCategories(){ //Metodo para listar as categorias
            const url = `${baseApiUrl}/categories`
            axios.get(url).then(res => {
                this.categories = res.data.map(category => {
                    return {value: category.id, text: category.path}
                })
            })
        },
        loadUsers(){ //Metodo para listar os usuarios
            const url = `${baseApiUrl}/users`
            axios.get(url).then(res => {
                this.users = res.data.map(user => {
                    return {value: user.id, text: `${user.name} - ${user.email}`}
                })
            })
        }
    },
    watch:{ //Monitora mudanças de atributos, e caso mude executa algo
        page(){
            this.loadArticles() //Quando a pagina muda, chamar o metodo para buscar paginas
        }
    },
    mounted(){
        this.loadCategories()
        this.loadUsers()
        this.loadArticles()
    }
}
</script>

<style>

</style>