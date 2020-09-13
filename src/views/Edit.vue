<template lang="pug">
    div
        header-component
        edit-component(
            :post="post"
            :canEdit="canEdit"
            :currentUser="currentUser"
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
                        console.log('wrongUser')
                        this.$router.push('/')
                    } else if (!this.$route.params.id === 'create' && !this.post) {
                        console.log('404')
                        this.$router.push('/404')
                    }
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