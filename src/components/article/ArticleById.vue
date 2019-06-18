<template>
    <div class="article-by-id">
        <PageTitle icon = "fa fa-file-o" :main="article.name" :sub="article.description"/>
        <div class="article-content" v-html="article.content"></div> <!--Exibindo o conteudo do artigo/ como ele ja vem em um formato html, é preciso do v-html-->
    </div>
</template>

<script>
import 'highlightjs/styles/dracula.css'
import hljs from 'highlightjs/highlight.pack.js' //Adicionando highlight ao artigo (Deixando codigos fonts melhor exibidos, destacando elementos de programação)
import {baseApiUrl} from '@/global'
import axios from 'axios'
import PageTitle from '../template/PageTitle'

export default {
    name: 'ArticleById',
    components: {PageTitle},
    data: function(){
        return {
            article: {}
        }
    },
    mounted(){
        const url = `${baseApiUrl}/articles/${this.$route.params.id}` //Recebendo o id do artigo pela url
        axios.get(url).then(res=> this.article = res.data)
    },
    updated(){ //Quando um componente sobre um update (metodo utilizado para colocar o highlight)
        document.querySelectorAll('.article-content pre').forEach(e=> { //Selecionando todos elementos 'pre'
            hljs.highlightBlock(e)
        })
    }
}
</script>

<style>
    .article-content{
        background-color: #fff;
        border-radius: 8px;
        padding: 25px;
    }

    .article-content pre { /*Codigos seram exibidos dentro de pre*/
        padding: 20px;
        border-radius: 8px;
        font-size: 1.2rem;
    }

    .article-content img { /*Imagens dentro do artigo*/
        max-width: 100%;
    }

    .article-content :last-child{ /*Ultimo elemento do artigo*/
        margin-bottom: 0px;
    }
</style>
