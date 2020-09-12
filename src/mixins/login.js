export default {
    mounted () {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            this.$store.commit('SET_CURRENT_USER', JSON.parse(currentUser))
        }
    }
}