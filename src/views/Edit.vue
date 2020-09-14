<template lang="pug">
    div
        header-component
        edit-component(
            :post="post"
            :canEdit="canEdit"
            :currentUser="currentUser"
            :loading="loading"
        )
</template>

<script>
import TheHeader from "../components/sections/TheHeader.vue";
import Edit from "../components/sections/Edit.vue";
import roles from "../mixins/roles";
export default {
    mixins: [
        roles
    ],
    data: () => ({
        loading: true
    }),
    components: {
        'header-component': TheHeader,
        'edit-component': Edit
    },
    created() {
        this.fetchPost();
    },
    methods: {
        fetchPost () {
            this.$store.dispatch('FETCH_POSTS')
                .then(() => {
                    if (this.post && (!this.userIsWriter || this.currentUser.id !== this.post.userId)) {
                        this.$router.push('/')
                    } else if (!(this.$route.params.id === 'create') && !this.post) {
                        this.$router.push('/404')
                    }
                    this.loading = false
                })
                .catch(error => {
                    this.$buefy.notification.open({
                        message: `Произошла ошибка: ${error.message}`,
                        type: 'is-danger'
                    })
                    this.loading = false
                })
        }
    },
    computed: {
        post () {
            return this.$store.getters.getPostById(parseInt(this.$route.params.id, 10))
        }
    },
    watch: {
        $route () {
            this.fetchPost();
        }
    }
}
</script>