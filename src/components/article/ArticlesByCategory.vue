<template>
    <div class="articles-by-category">
        <PageTitle icon = "fa fa-folder-o"
            :main= "category.name" sub="Categoria" />
        <ul> <!--Exibindo lista de artigos-->
            <li v-for ="article in articles" :key="article.id">
                <ArticleItem :article="article"></ArticleItem>
            </li>
        </ul>
        <div class="load-more"> <!--Botão para efetuar a paginação-->
            <button v-if="loadMore"
                class="btn btn-lg btn-outline-primary"
                @click="getArticles">Carregar Mais Artigos</button>
        </div>
    </div>
</template>

<script>
import { baseApiUrl } from "@/global"
import axios from 'axios'
import PageTitle from '../template/PageTitle'
import ArticleItem from './ArticleItem'

export default {
    name: 'ArticlesByCategory',
    components: {PageTitle, ArticleItem},
    data: function (){
        return {
            category: {},
            articles: [],
            page: 1,
            loadMore: true //Botão para caregar mais artigos (paginação)
        }
    },
    methods: {
        getCategory(){ //Metodo para pegar a categoria
            const url = `${baseApiUrl}/categories/${this.category.id}`
            axios(url).then(res => this.category = res.data)
        },
        getArticles(){ //Metodo para pegar os artigos associados a categoria selecionada (categoria pai e filhas)
            const url = `${baseApiUrl}/categories/${this.category.id}/articles?page=${this.page}`
            axios(url).then(res=> {
                this.articles = this.articles.concat(res.data) //Concatenando os arquigos ja contidos , mais os recebidos por paginação
                this.page++

                if(res.data.length === 0 ) this.loadMore = false //Quando não tiver mais dados para pegar pela paginação , bloquear botão 
            })
        }
    },
    watch: {
        $route(to){ //Monitorando as mudanças das rotas, para com a mudança do id na url, ir para novos artigos
            this.category.id= to.params.id //Setando novo Id
            //Zerando atributos
            this.articles = []
            this.page = 1
            this.loadMore = true

            //Chamando metodos para listar de novo
            this.getCategory()
            this.getArticles()
        }
    },
    mounted(){
        this.category.id = this.$route.params.id //Pegando o id da categoria pela URL
        this.getCategory()
        this.getArticles()
    }
}
</script>

<style>
    .articles-by-category ul {
        list-style-type: none; 
        padding: 0;
    }

    .articles-by-category .load-more {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 25px;
    }
</style>
