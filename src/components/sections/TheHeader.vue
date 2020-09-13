<template lang="pug">
    include ../../../tools/mixins.pug
    +b.HEADER.header.navbar
        +e.container.container
            +e.left
                +e.buttons--manage
                    +e.B-BUTTON.new(
                        tag="router-link"
                        to="/edit/create"
                        v-if="userIsWriter && !isCreatePage"
                        icon-right="creation"
                    ) Создать новый пост
                +e.buttons--login(
                    v-if="!isLoginPage"
                )
                    +e.B-BUTTON.login(
                        tag="router-link"
                        to="/login"
                        v-if="!isLoginned"
                    ) Войти
                    +e.B-BUTTON.logout(
                        v-if="isLoginned"
                        v-on:click="confirmLogout"
                    ) Выход
</template>

<script>
import roles from "../../mixins/roles";
export default {
    mixins: [
        roles
    ],
    methods: {
        logout () {
            this.$store.commit('SET_CURRENT_USER', {
                id: null,
                name: 'Гость',
                role: 'guest'
            })

            localStorage.removeItem('currentUser')

            if (this.$route.path !== '/') {
                this.$router.push('/')
            }
        },
        confirmLogout () {
            this.$buefy.dialog.confirm({
                title: 'Выйти',
                message: 'Вы уверены что хотите выйти?',
                cancelText: 'Не выходить',
                confirmText: 'Да, я хочу выйти',
                onConfirm: this.logout
            })
        }
    },
    computed: {
        isLoginPage () {
            return this.$route.path === '/login'
        },
        isCreatePage () {
            return this.$route.path.indexOf('create') !== -1
        }
    }
}
</script>