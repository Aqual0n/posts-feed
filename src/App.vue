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
    @import "../src/assets/scss/critical";
    @import "../src/assets/scss/main";
</style>