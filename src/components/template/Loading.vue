//Componente para fazer com que o conteudo da pagina principal só seja carregada após a validação do token esteja concluida
<template>
    <div class="loading">
        <img src="@/assets/loading.gif" alt="Loading">
    </div>
</template>

<script>
export default {
    name: 'Loading'
}
</script>

<style>
    .loading{
        grid-area: content; /*Ocupa a area do content*/
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
