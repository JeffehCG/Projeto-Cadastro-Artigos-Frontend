//Componente do Crud do usuario
<template>
    <div class="user-admin">
        <b-form> <!--Componente de formulario do bootstrat-vue-->
            <input type="hidden" id="user-id" v-model="user.id"/> <!--se o id estiver setado, ira aparecer aqui, para habilitar opção de alteração-->
            <b-row> <!--Linha do formulario (nome,email)-->
                <b-col md = "6" sm="12"> <!--Dispositivo medio pra cima ira ocupar 6 colunas-->
                    <b-form-group label = "Nome:" label-for="user-name">
                        <b-form-input id="user-name" type="text"
                            v-model="user.name" required
                            :readonly="mode === 'remove'" 
                            placeholder="Informe o Nome de Usuário..."/>
                    </b-form-group> <!--readonly - bloqueando o campo para alteração quando for exclusão-->
                </b-col>
                <b-col md = "6" sm="12">
                    <b-form-group label = "E-mail:" label-for="user-email">
                        <b-form-input id="user-email" type="text"
                            v-model="user.email" required
                            :readonly="mode === 'remove'" 
                            placeholder="Informe o Email do Usuário..."/>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-form-checkbox v-show = "mode === 'save'" id="user-admin" v-model="user.admin" class="mt-3 mb-3"> <!--Check box para marcar como admin-->
                Administrador:
            </b-form-checkbox>
            <b-row v-show = "mode === 'save'"> <!--Linha do formulario(senha e confirmação)-->
                <b-col md = "6" sm="12"> <!--Dispositivo medio pra cima ira ocupar 6 colunas-->
                    <b-form-group label = "Senha:" label-for="user-password">
                        <b-form-input id="user-password" type="password"
                            v-model="user.password" required
                            placeholder="Informe a Senha de Usuário..."/>
                    </b-form-group>
                </b-col>
                <b-col md = "6" sm="12">
                    <b-form-group label = "Confirmação de Senha:" label-for="user-confirm-password">
                        <b-form-input id="user-confirm-password" type="password"
                            v-model="user.confirmPassword" required
                            placeholder="Confirme a Senha do Usuário..."/>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row> <!--Linha contendo os botões-->
                <b-col xl = '12'>
                    <b-button variant="primary" v-if="mode==='save'"
                        @click="save">Salvar</b-button> <!--Botão que chama a função para salvar-->
                    <b-button variant = "danger" v-if="mode === 'remove'"
                        @click="remove">Excluir</b-button><!--Botão que chama a função para excluir-->
                    <b-button class="ml-2" @click="reset">Cancelar</b-button><!--Botão que chama a função para limpar campos-->
                </b-col>
            </b-row>
        </b-form>
        <hr>
        <b-table hover striped :items="users" :fields="fields"> <!--Exibindo tabela com o bootstrap-vue-->
            <template slot = "actions" slot-scope="data">
                <b-button variant ="warning" @click="loadUser(data.item)" class="mr-2"> <!--Botão para alterar usuario-->
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant = "danger" @click="loadUser(data.item, 'remove')"> <!--Botão para excluir usuario-->
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
    name: 'UserAdmin',
    data: function(){
        return{
            mode: 'save', //ira diferenciar entre salvar, editar e excluir
            user: {},   //Objejto que ira conter as informações do usuario (tanto pra cadastrar, alterar e remover)
            users: [], //Array que contera usuarios para exibir na tabela
            fields: [ //Descrição dos fields que seram usados pelo componente b-table
                {key: 'id', label: 'Código', sortable: true},
                {key: 'name', label: 'Nome', sortable:true},
                {key: 'email', label: 'E-mail', sortable:true},
                {key: 'admin', label: 'Administrador', sortable:true,
                    formatter: value => value ? 'Sim' : 'Não'},
                {key: 'actions', label: 'Ações'}
            ]
        }
    },
    methods: {
        loadUsers(){//metodo para pegar a lista de categorias do backend
            const url = `${baseApiUrl}/users`
            axios.get(url).then(res => {
                this.users = res.data //Pegando os dados da requisição e colocando no users
            })
            .catch(showError)
        },
        reset(){ //Metodo para limpar os campos do formulario
            this.mode = 'save'
            this.user = {}
            this.loadUsers()
        },
        save(){ //Metodo para cadastrar e alterar usuario
            const method = this.user.id ? 'put' : 'post'//Se o id estiver setado, sera uma requisição put, para alteração
            const id = this.user.id ? `/${this.user.id}` : '' //colocando id no final da url
            axios[method](`${baseApiUrl}/users${id}`, this.user) //mandando requisição com os dados do formulario
                .then(()=>{
                    this.$toasted.global.defaultSuccess() //Exibindo mensagen de sucesso
                    this.reset()
                })
                .catch(showError) //Exibindo msg de erro, caso entre no catch
        },
        remove(){ //Metodo para remover usuario
            const id = this.user.id
            axios.delete(`${baseApiUrl}/users/${id}`)
                .then(()=>{
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        loadUser(user, mode= 'save'){ //Metodo para carregar usuarios no formulario (para alteração e exclusão)
            this.mode = mode
            this.user = {...user} //Recebendo o usuario passado por parametro       
        }
    },
    mounted(){
        this.loadUsers()
    }
}
</script>

<style>

</style>
