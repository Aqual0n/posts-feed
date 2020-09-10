<template lang="pug">
    include ../../../tools/mixins.pug
    +b.HEADER.header
        +e.container.container

</template>

<script>
export default {
    props: {
        user: {
            required: true,
            type: Object
        }
    }
}
</script>