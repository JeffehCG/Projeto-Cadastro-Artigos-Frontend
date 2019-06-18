<template>
    <div class="content">
        <!--Quando uma rota for chamada, o componente chamado sera renderizado aqui-->
        <router-view></router-view> 
    </div>
</template>

<script>
export default {
    name: 'Content'
}
</script>

<style>
    .content{
        grid-area: content;
        background-color: #efefef;
        padding: 20px
    }
</style>
