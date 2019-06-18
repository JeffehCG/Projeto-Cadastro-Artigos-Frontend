<template>
    <aside class="menu" v-show="isMenuVisible"> <!--Quando isMenuVisible for true, ira aparecer o menu, e false ira esconder-->
        <div class="menu-filter">
            <i class="fa fa-search fa-lg"></i>
            <input type="text" placeholder="Digite para filtrar..."
                v-model="treeFilter" class="filter-field"> <!--Filtro para procurar categoria-->
        </div>
        <Tree :data= "treeData" :options="treeOptions" 
            :filter="treeFilter" ref="tree"/> <!--Instanciando o componente Tree-->
    </aside>
</template>

<script>
import {mapState} from 'vuex' //Mapear um atributo da store dentro do componente
import Tree from 'liquor-tree' //Componente para montar a arvore de categorias 
import {baseApiUrl} from '@/global'
import axios from 'axios'

export default {
    name: 'Menu',
    components: {Tree},
    computed: mapState(['isMenuVisible']), //Usando o atributo da store, dentro do componente, ou seja, quando ouver uma mudança na store, ira mudar no componente tambem
    data: function (){
        return{
            treeFilter: '',
            treeData: this.getTreeData(),
            treeOptions: { //Opções de configurações da arvore
                propertyNames:{'text': 'name'}, //A propriedade text da arvore, ira apontar para o name da arvore recebida pela requisição
                filter: {emptyText: 'Categoria não encontrada' } //Caso treeFilter for vazio
            }
        }
    },
    methods: {
        getTreeData(){//Metodo para obter os dados da arvore de categorias
            const url = `${baseApiUrl}/categories/tree`
            return axios.get(url)
                .then(res => res.data)
        },
        onNodeSelect(node){ //Metodo para navegação paras categorias, via requisição
            this.$router.push({ //Adicionando rota existente em route.js , para navegar para mesma
                name: 'articlesByCategory',
                params: {id: node.id} //Adicionando parametro id a rota, para pegar a categoria desejada
            })
            
            //Responsividade - se o tamanho da tela (definidos em mq.js) forem os abaixos, esconde o menu
            if(this.$mq === 'xl' || this.$mq === 'sm'){
                this.$store.commit('toggleMenu', false)
            }
        }
    },
    mounted(){
        this.$refs.tree.$on('node:selected', this.onNodeSelect) //Pegando o id de cada categoria, que esta dentro do no da arvore, ($refs - usado para pegar atributos dentro dos elementos do templete)
    }
}
</script>

<style>
    .menu {
        grid-area: menu;
        background: linear-gradient(to right, #232526, #414345);

        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }

    .menu a,
    .menu a:hover{
       color: #fff;
        text-decoration: none;
    }

    .menu .tree-node.selected >.tree-content,
    .menu .tree-node .tree-content:hover{ /*Elementos da arvore*/
        background-color: rgba(255,255,255,0.2);
    }

    .tree-arrow.has-child{
        filter: brightness(2);
    }

    .menu .menu-filter{
        display: flex;
        justify-content: center;
        align-items: center;

        margin: 20px;
        padding-bottom: 8px;
        border-bottom: 1px solid #aaa;
    }

    .menu .menu-filter i{
        color: #aaa;
        margin-right: 10px;
    }

    .menu input {
        color: #ccc;
        font-size: 1.3rem;
        border: 0;
        outline: 0;
        width: 100%;
        background: transparent;
    }

    .tree-filter-empty{
        color: #ccc;
        margin-left: 20px;
        font-size: 1.3rem;
    }
</style>
