//Arquivo de rotas

import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/home/Home'
import AdminPages from '@/components/admin/AdminPages'
import ArticlesByCategory from '@/components/article/ArticlesByCategory'
import ArticleById from '@/components/article/ArticleById'
import Auth from '@/components/auth/Auth'

import {userKey} from '@/global'

Vue.use(VueRouter)

//Caminhos da URL
const routes = [{
    name: 'home',
    path: '/',
    component: Home
},{
    name: 'adminPages',
    path: '/admin',
    component: AdminPages,
    meta:{ requiresAdmin: true} //Atributo que define que a rota apenas podera ser acessada por um user admin
},{
    name: 'articlesByCategory',
    path: '/categories/:id/articles',
    component: ArticlesByCategory
},{
    name: 'articleById',
    path: '/articles/:id',
    component: ArticleById
},{
    name: 'auth',
    path: '/auth',
    component: Auth
}]

const router = new VueRouter({ //Instanciando o router
    mode: 'history', //modo que o router sera utilizado (pode ser 'hash' , 'history' , etc...)
    routes: routes
})

//beforeEach é um evento que sempre é chamado quando vai navegar de uma rota para outra
router.beforeEach((to , from , next) => { //Parametros (to - de qual tela esta vindo, from - para qual tela vai)
    const json = localStorage.getItem(userKey) //Pegando os dados do usuario logado

    if(to.matched.some(record => record.meta.requiresAdmin)){ //Verificando se a rota de destino requer que o usuario seja admin
        const user = JSON.parse(json) //Convertendo os dados sem json
        user && user.admin ? next() : next({path: '/'}) //se usuario estiver setado ,e for admim , liberar acesso, do contrario voltar para o menu
    }else{
        next() //Se a rota não precisa de admim(não tem requiresAdmin), liberar acesso
    }
})

export default router