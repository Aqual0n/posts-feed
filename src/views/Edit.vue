<template lang="pug">
    div
        header-component
        edit-component(
            :post="post"
            :canEdit="canEdit"
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
            if (this.$route.params.id !== 'create') {
                this.$store.dispatch('FETCH_POSTS')
            }
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