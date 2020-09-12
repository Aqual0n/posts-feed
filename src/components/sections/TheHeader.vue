<template lang="pug">
    include ../../../tools/mixins.pug
    +b.HEADER.header.navbar
        +e.container.container
            +e.left
                +e.buttons(
                    v-if="!isLoginPage"
                )
                    +e.B-BUTTON.login(
                        tag="router-link"
                        to="/login"
                        v-if="!isLoginned"
                    ) Войти
                    +e.B-BUTTON.logout(
                        v-if="isLoginned"
                        v-on:click="logout"
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
        }
    },
    computed: {
        isLoginPage () {
            return this.$route.path === '/login'
        }
    }
}
</script>