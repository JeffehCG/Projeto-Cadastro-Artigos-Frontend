<template>
    <div class="admin-pages">
        <PageTitle icon="fa fa-cogs" main="Administração do Sistema"
            sub = "Cadastros & Cia" />
        <div class="admin-pages-tabs">
            <!--Tags que começam com b são do bootstrap-vue-->
            <b-card no-body> <!--Menu dentro da pagina de administração-->
                <b-tabs card>
                    <b-tab title="Artigos" active>
                        <ArticleAdmin/>
                    </b-tab>
                    <b-tab title="Categorias">
                        <CategoryAdmin/>
                    </b-tab>
                    <b-tab title="Usuarios">
                        <UserAdmin/>
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>     
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import ArticleAdmin from './ArticleAdmin' //Importando pagina de artigo
import CategoryAdmin from './CategoryAdmin'
import UserAdmin from './UserAdmin'

export default {
    name: 'AdminPages',
    components: {PageTitle, ArticleAdmin, CategoryAdmin, UserAdmin}
}
</script>

<style>

</style>
