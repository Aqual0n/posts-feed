<template lang="pug">
    include ../../../tools/mixins.pug
    +b.main
        +e.container.container
            +e.posts
                +e.POST-COMPONENT.post(
                    v-for="(post, index) in posts"
                    :post="post"
                    :key="`post-${index}`"
                )
</template>

<script>
import Post from "../blanks/Post.vue";
// todo: add pagination
export default {
    props: {
        posts: {
            type: Array,
            required: true
        }
    },
    components: {
        'post-component': Post
    }
}
</script>