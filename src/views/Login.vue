<template lang="pug">
    div
        header-component
        login-component
</template>

<script>
import TheHeader from "../components/sections/TheHeader";
import Login from "../components/sections/Login";

export default {
    components: {
        'header-component': TheHeader,
        'login-component': Login
    }
}
</script>