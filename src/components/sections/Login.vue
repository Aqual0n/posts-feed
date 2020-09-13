<template lang="pug">
    include ../../../tools/mixins.pug
    +b.login
        +e.container.container
            +e.wrapper.box
                +e.B-FIELD.line(
                    label="Логин"
                    :type="inputs.email.error"
                    :message="inputs.email.errorText"
                )
                    +e.B-INPUT.type(
                        type="email"
                        v-model="inputs.email.value"
                    )
                +e.B-FIELD.line(
                    label="Пароль"
                    :type="inputs.password.error"
                    :message="inputs.password.errorText"
                )
                    +e.B-INPUT.type(
                        type="password"
                        v-model="inputs.password.value"
                    )
                +e.B-BUTTON.submit(
                    type="is-info"
                    v-on:click="login"
                ) Войти
</template>

<script>
export default {
    data: () => ({
        inputs: {
            email: {
                value: '',
                error: '',
                errorText: ''
            },
            password: {
                value: '',
                error: '',
                errorText: ''
            }
        }
    }),
    methods: {
        login () {
            if (this.validate()) {
                const userData = {
                    login: this.inputs.email.value,
                    password: this.inputs.password.value
                }
                this.$store.dispatch('AUTHORIZE_USER', userData)
                    .then(user => {
                        // saving authorized user in localStorage
                        localStorage.setItem('currentUser', JSON.stringify(user))
                        this.$router.push('/')
                    })
                    .catch(() => {
                        this.inputs.email.error = 'is-danger'
                        this.inputs.email.errorText = 'Логин или пароль неверны'
                    })
            }
        },
        validate () {
            if (!this.inputs.email.value) {
                this.inputs.email.error = 'is-danger'
                this.inputs.email.errorText = 'Заполните это поле'
            } else {
                this.inputs.email.error = ''
                this.inputs.email.errorText = ''
            }

            if (!this.inputs.password.value) {
                this.inputs.password.error = 'is-danger'
                this.inputs.password.errorText = 'Заполните это поле'
            } else {
                this.inputs.password.error = ''
                this.inputs.password.errorText = ''
            }

            return this.inputs.email.value && this.inputs.password.value
        }
    },
}
</script>

<style lang="scss" scoped>
    .login {
        padding-top: 80px;

        &__wrapper {
            margin: 0 auto;
            width: 400px;
        }
    }
</style>
