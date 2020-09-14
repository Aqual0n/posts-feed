<template lang="pug">
    div
        header-component
        main-component(
            :posts="posts"
            :loading="loading"
        )
</template>

<script>
import TheHeader from "../components/sections/TheHeader.vue";
import Main from "../components/sections/Main.vue";
export default {
    data: () => ({
        loading: true
    }),
    mounted () {
        this.$store.dispatch('FETCH_POSTS')
            .then(() => {
                this.loading = false
            })
            .catch(error => {
                this.$buefy.notification.open({
                    message: `Произошла ошибка: ${error.message}`,
                    type: 'is-danger'
                })
                this.loading = false
            })
    },
    computed: {
        posts () {
            return this.$store.state.posts
        }
    },
    components: {
        'header-component': TheHeader,
        'main-component': Main
    }
}
</script>