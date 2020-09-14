<template lang="pug">
    include ../../../tools/mixins.pug
    +b.HEADER.header.navbar
        +e.wrapper.navbar-brand
            +e.item.navbar-item
                +e.B-BUTTON.new(
                    tag="router-link"
                    to="/"
                    v-if="!isPostPage"
                    icon-left="keyboard-backspace"
                ) Вернуться к постам
            +e.burger.navbar-burger(
                v-on:click="toggleActive"
            )
                span
                span
                span
        +e.wrapper.navbar-menu(
            :class="{'is-active': menuActive}"
        )
            +e.left.navbar-start
            +e.right.navbar-end
                +e.buttons--manage.navbar-item
                    +e.B-BUTTON.new(
                        tag="router-link"
                        to="/edit/create"
                        v-if="userIsWriter && !isCreatePage"
                        icon-right="creation"
                    ) Создать новый пост
                +e.buttons--login.navbar-item(
                    v-if="!isLoginPage"
                )
                    p.navbar-item(
                        v-if="!userIsGuest"
                    ) {{currentUser.name}}
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
    data: () => ({
        menuActive: false
    }),
    methods: {
        toggleActive () {
            this.menuActive = !this.menuActive
        },
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
        },
        isPostPage () {
            return this.$route.path === '/'
        }
    }
}
</script>