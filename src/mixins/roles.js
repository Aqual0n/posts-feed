export default {
    computed: {
        canClap () {
            return this.userIsReader
        },
        canEdit () {
            return this.userIsWriter && this.post.userId === this.currentUser.id
        },
        canCreate () {
            return this.userIsWriter
        },
        canView () {
            return this.userIsReader || this.userIsWriter || this.userIsGuest
        },
        userIsWriter () {
            return this.currentUser.role === 'writer'
        },
        userIsReader () {
            return this.currentUser.role === 'reader'
        },
        userIsGuest () {
            return this.currentUser.role === 'guest'
        },
        isLoginned () {
            return this.currentUser.role !== 'guest'
        },
        currentUser () {
            return this.$store.state.currentUser
        }
    }
}