<template lang="pug">
    include ../../../tools/mixins.pug
    +b.post
        +e.wrapper
            p {{post}}
</template>

<script>
export default {
    props: {
        post: {
            required: true,
            type: Object
        }
    }
}
</script>