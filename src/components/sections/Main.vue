<template lang="pug">
    include ../../../tools/mixins.pug
    +b.main(
        ref="main"
    )
        +e.B-LOADING.loading(
            :is-full-page="true"
            v-model="loading"
        )
        +e.container.container
            +e.wrapper
                +e.posts
                    +e.POST-COMPONENT.post(
                        ref="post"
                        v-for="(post, index) in visiblePosts"
                        :post="post"
                        :key="`post-${index}`"
                    )
                +e.B-PAGINATION.pagination(
                    v-if="paginationTotal > 10"
                    :total="paginationTotal"
                    v-model="pagination.current"
                    :range-before="pagination.rangeBefore"
                    :range-after="pagination.rangeAfter"
                    :per-page="pagination.perPage"
                )
</template>

<script>
import Post from "../blanks/Post.vue";
export default {
    props: {
        posts: {
            type: Array,
            required: true
        },
        loading: {
            type: Boolean,
            required: true
        }
    },
    data: () => ({
        pagination: {
            current: 1,
            perPage: 10,
            rangeBefore: 2,
            rangeAfter: 2
        }
    }),
    methods: {
        handlePaginationChange () {
            setTimeout(() => {
                this.$refs.post[0].$el.scrollIntoView({block: "center", behavior: "smooth"})
            }, 100)
        }
    },
    computed: {
        visiblePosts () {
            let posts = []
            for (let i = this.paginationStartingIndex; i < this.posts.length && i < this.paginationEndIndex; i++) {
                posts.push(this.posts[i])
            }
            return posts
        },
        paginationStartingIndex () {
            return (this.pagination.current - 1) * this.pagination.perPage
        },
        paginationEndIndex () {
            return this.paginationStartingIndex + this.pagination.perPage
        },
        paginationTotal () {
            return this.posts.length
        }
    },
    watch: {
        'pagination.current': {
            handler: 'handlePaginationChange'
        }
    },
    components: {
        'post-component': Post
    }
}
</script>

<style lang="scss">
    .main {
        padding: 80px 0;

        &__post {
            margin-bottom: 16px;
        }

        &__wrapper {
            max-width: 600px;
            margin: 0 auto;
        }
    }
</style>