<template lang="pug">
    div
        header-component
        main-component(
            :posts="posts"
        )
</template>

<script>
import TheHeader from "../components/sections/TheHeader.vue";
import Main from "../components/sections/Main.vue";

import fetchPosts from "../mixins/fetchPosts";
export default {
    mixins: [
        fetchPosts
    ],
    components: {
        'header-component': TheHeader,
        'main-component': Main
    }
}
</script>