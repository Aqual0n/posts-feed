<template lang="pug">
    include ../../../tools/mixins.pug
    +b.post
        +e.wrapper.box
            p {{post}}
            +e.content
                +e.title {{post.title}}
                +e.text {{post.description}}
            +e.controls
                +e.B-BUTTON.clap(
                    v-if="canClap"
                    icon-right="clap"
                )
                +e.B-BUTTON.edit(
                    v-if="canEdit"
                    type="is-dark"
                    icon-right="edit"
                ) Редактировать
                +e.B-BUTTON.delete(
                    v-if="canEdit"
                    type="is-danger"
                    icon-right="delete"
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
    }
}
</script>