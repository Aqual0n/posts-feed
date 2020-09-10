export default {
    mounted () {
        this.$store.dispatch('FETCH_POSTS')
    },
    computed: {
        posts () {
            return this.$store.state.posts
        }
    }
}