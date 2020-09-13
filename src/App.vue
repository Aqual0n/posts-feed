<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    import login from "./mixins/login";
    export default {
        mixins: [
            login
        ]
    }
</script>

<style lang="scss">
    body {
        min-width: 320px;
        background-color: #ddd;
        min-height: 100vh;
        font-size: 14px;
    }

</style>