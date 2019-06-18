//Componente do Crud do usuario
<template>
    <div class="category-admin">
        <b-form> 
            <input type="hidden" id="category-id" v-model="category.id"/>
            <b-row> 
                <b-col xs="12">
                    <b-form-group label = "Nome:" label-for="category-name">
                        <b-form-input id="category-name" type="text"
                            v-model="category.name" required
                            :readonly="mode === 'remove'" 
                            placeholder="Informe o Nome da Categoria..."/>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row> <!--Linha do combo box-->
                <b-col xs="12">
                    <b-form-group label = "Categoria Pai" label-for="category-parentId">
                       <b-form-select id= "category-parentId" :disabled = "mode === 'remove'"
                            :options="categories" v-model="category.parentId"/><!--Quando o b-form-select é chamado , ele espera receber 2 valores (value e text), esses dois atributos estão dentro de categories-->
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
        <b-table hover striped :items="categories" :fields="fields"> <!--Exibindo tabela com o bootstrap-vue-->
            <template slot = "actions" slot-scope="data">
                <b-button variant ="warning" @click="loadCategory(data.item)" class="mr-2"> 
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant = "danger" @click="loadCategory(data.item, 'remove')"> 
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
    </div>
</template>

<script>
import {baseApiUrl, showError} from '@/global'
import axios from 'axios'

export default {
    name: 'CategoryAdmin',
    data: function(){
        return{
            mode: 'save', //ira diferenciar entre salvar, editar e excluir
            category: {},   //Objejto que ira conter as informações do usuario (tanto pra cadastrar, alterar e remover)
            categories: [], //Array que contera usuarios para exibir na tabela
            fields: [ //Descrição dos fields que seram usados pelo componente b-table
                {key: 'id', label: 'Código', sortable: true},
                {key: 'name', label: 'Nome', sortable:true},
                {key: 'path', label: 'Caminho', sortable:true},
                {key: 'actions', label: 'Ações'}
            ]
        }
    },
    methods: {
        loadCategories(){//metodo para pegar a lista de usuarios do backend
            const url = `${baseApiUrl}/categories`
            axios.get(url).then(res => {
                // this.categories = res.data
                this.categories = res.data.map(category => {
                    return {...category, value: category.id, text: category.path} //Pegando a categoria e adicionando mais dois valores , que seram usados no combobox
                })
            }) 
        },
        reset(){ //Metodo para limpar os campos do formulario
            this.mode = 'save'
            this.category = {}
            this.loadCategories()
        },
        save(){ //Metodo para cadastrar e alterar categoria
            const method = this.category.id ? 'put' : 'post'
            const id = this.category.id ? `/${this.category.id}` : ''
            axios[method](`${baseApiUrl}/categories${id}`, this.category) 
                .then(()=>{
                    this.$toasted.global.defaultSuccess() //Exibindo mensagen de sucesso
                    this.reset()
                })
                .catch(showError) //Exibindo msg de erro, caso entre no catch
        },
        remove(){ //Metodo para remover categoria
            const id = this.category.id
            axios.delete(`${baseApiUrl}/categories/${id}`)
                .then(()=>{
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        loadCategory(category, mode= 'save'){ //Metodo para carregar categorias no formulario (para alteração e exclusão)
            this.mode = mode
            this.category = {...category}   
        }
    },
    mounted(){
        this.loadCategories()
    }
}
</script>

<style>

</style>
