<template lang="pug">
    include ../../../tools/mixins.pug
    +b.edit
        +e.container.container
            +e.H2.title.title.is-2 {{getEditPageTitle}}
            +e.wrapper
                +e.B-FIELD.line(
                    label="Название поста"
                )
                    +e.B-INPUT.input(
                        v-model="mutablePost.title"
                    )
                +e.B-FIELD.line(
                    label="Текст поста"
                )
                    +e.B-INPUT.input(
                        v-model="mutablePost.description"
                        type="textarea"
                    )
            +e.bottom
                // :disabled="!isEdited || (isCreate && validated)"
                +e.B-BUTTON.button(
                    v-on:click="save"
                    type="is-success"
                ) {{saveButtonText}}
                +e.B-BUTTON.button(
                    v-if="!isCreate"
                    type="is-dark"
                    :disabled="!isEdited"
                ) Отменить
</template>

<script>
    // todo: add check if loginned user can actually edit this post
export default {
    props: {
        post: {
            type: Object,
            required: false
        },
        canEdit: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    data: () => ({
        mutablePost: {
            title: '',
            description: '',
        }
    }),
    methods: {
        setMutablePost () {
            this.mutablePost = {...this.post}
        },
        save () {
            if(this.isCreate) {
                this.$store.dispatch('CREATE_POST', {
                    ...this.mutablePost,
                    // todo: add role mixin, created_at, updated_at
                    userId: 1,
                    claps: 0
                })
                    .then(() => {
                        this.$buefy.notification.open({
                            message: 'Пост успешно создан',
                            type: 'is-success'
                        })
                    })
                    .catch(() => {
                        this.$buefy.notification.open({
                            message: 'Что-то пошло не так',
                            type: 'is-danger'
                        })
                    })
            } else {
                this.$store.dispatch('UPDATE_POST', {
                    ...this.mutablePost,
                    // todo: add updating time logic
                    updated_at: 1
                })
                    .then(() => {
                        this.$buefy.notification.open({
                            message: 'Изменения успешно сохранены',
                            type: 'is-success'
                        })
                    })
                    .catch(() => {
                        this.$buefy.notification.open({
                            message: 'Что-то пошло не так',
                            type: 'is-danger'
                        })
                    })
            }
        }
    },
    computed: {
        getEditPageTitle () {
            if (this.isCreate) {
                return 'Создать пост'
            }
            return 'Редактировать пост'
        },
        saveButtonText () {
            if (this.isCreate) {
                return 'Создать пост'
            }
            return 'Сохранить изменения'
        },
        isCreate () {
            return this.$route.params.id === 'create'
        },
        isEdited () {
            return typeof this.post !== 'undefined' && ((this.mutablePost.title !== this.post.title) || (this.mutablePost.description !== this.post.description))
        },
        validated () {
            return !!this.mutablePost.title && !!this.mutablePost.description
        }
    },
    watch: {
        post: {
            handler: 'setMutablePost',
            immediate: true
        },
    }
}
</script>

<style lang="scss">
    .edit {
        padding-top: 80px;

        &__line {
            margin-bottom: 16px;
        }

        &__button {
            & + & {
                margin-left: 8px;
            }
        }
    }
</style>