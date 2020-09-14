<template lang="pug">
    include ../../../tools/mixins.pug
    +b.edit
        +e.B-LOADING.loading(
            :is-full-page="true"
            v-model="loading"
        )
        +e.container.container
            +e.wrapper.box
                +e.H2.title.title.is-2 {{getEditPageTitle}}
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
                    +e.B-BUTTON.button(
                        v-on:click="save"
                        type="is-success"
                        :disabled="saveButtonDisabled"
                    ) {{saveButtonText}}
                    +e.B-BUTTON.button(
                        v-if="!isCreate"
                        v-on:click="confirmCancel"
                        type="is-dark"
                        :disabled="!isEdited"
                    ) Отменить
</template>

<script>
export default {
    props: {
        post: {
            type: Object,
            required: false
        },
        canEdit: {
            type: Boolean,
            required: true
        },
        currentUser: {
            type: Object,
            required: true
        },
        loading: {
            type: Boolean,
            required: true
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
                let createdDate = new Date();
                this.$store.dispatch('CREATE_POST', {
                    ...this.mutablePost,
                    userId: this.currentUser.id,
                    claps: 0,
                    createdAt: createdDate,
                    updateAt: createdDate
                })
                    .then(() => {
                        this.$buefy.notification.open({
                            message: 'Пост успешно создан',
                            type: 'is-success'
                        })

                        this.mutablePost.title = ''
                        this.mutablePost.description = ''
                    })
                    .catch(error => {
                        this.$buefy.notification.open({
                            message: `Что-то пошло не так: ${error.message}`,
                            type: 'is-danger'
                        })
                    })
            } else {
                let updated = new Date().toISOString()
                this.$store.dispatch('UPDATE_POST', {
                    ...this.mutablePost,
                    updateAt: updated
                })
                    .then(() => {
                        this.$buefy.notification.open({
                            message: 'Изменения успешно сохранены',
                            type: 'is-success'
                        })
                    })
                    .catch(error => {
                        this.$buefy.notification.open({
                            message: `Что-то пошло не так: ${error.message}`,
                            type: 'is-danger'
                        })
                    })
            }
        },
        cancel () {
            this.setMutablePost()
        },
        confirmCancel () {
            this.$buefy.dialog.confirm({
                title: 'Отменить изменения',
                message: 'Вы уверены что хотите отменить изменения?',
                cancelText: 'Не отменять',
                confirmText: 'Да, отменить',
                onConfirm: this.cancel
            })
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
        saveButtonDisabled () {
            return this.isCreate ? !this.validated : !this.validated || !this.isEdited
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

        &__wrapper {
            margin: 0 auto;
            max-width: 720px;
        }

        &__line {
            margin-bottom: 24px;
        }

        &__button {
            & + & {
                margin-left: 8px;
            }
        }
    }
</style>