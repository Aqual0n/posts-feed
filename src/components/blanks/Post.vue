<template lang="pug">
    include ../../../tools/mixins.pug
    +b.post
        +e.wrapper.box
            +e.content.content
                h3 {{post.title}}
                p {{post.description}}
            +e.bottom.columns.is-vcentered
                +e.date.column {{postDate}}
                +e.controls.column.is-narrow
                    +e.B-BUTTON.clap(
                        :disabled="!canClap"
                        icon-left="heart"
                        v-on:click="clap"
                    ) {{post.claps}}
                    +e.B-BUTTON.button(
                        v-if="canEdit"
                        type="is-dark"
                        icon-right="pencil"
                        tag="router-link"
                        :to="`/edit/${post.id}`"
                    ) Редактировать
                    +e.B-BUTTON.button(
                        v-if="canEdit"
                        type="is-danger"
                        icon-right="delete"
                        v-on:click="confirmPostDelete"
                    )

</template>

<script>
import roles from "../../mixins/roles";
export default {
    mixins: [
        roles
    ],
    props: {
        post: {
            required: true,
            type: Object
        }
    },
    methods: {
        clap () {
            const clappedPost = {
                ...this.post,
                claps: this.post.claps + 1,
            }
            this.$store.dispatch('UPDATE_POST', clappedPost)
        },
        confirmPostDelete() {
            this.$buefy.dialog.confirm({
                title: 'Удалить пост',
                message: 'Вы уверены что хотите удалить ваш пост? Это действие нельзя отменить',
                cancelText: 'Не удалять',
                confirmText: 'Удалить пост',
                type: 'is-danger',
                hasIcon: true,
                onConfirm: this.postDelete
            })
        },
        postDelete () {
            this.$store.dispatch('DELETE_POST', this.post.id)
        }
    },
    computed: {
        postDate () {
            return Intl.DateTimeFormat('ru-RU', {
                month: 'long', day: 'numeric'
            }).format(Date.parse(this.post.createdAt))
        }
    }
}
</script>

<style lang="scss">
    .post {
        &__button {
            & + & {
                margin-left: 8px;
            }
        }
    }
</style>