<template>
    <v-avatar :size="size" color="primary lighten-1" small>
        <span style="color: #FFF" v-if="!!userNameInitials">{{userNameInitials}}</span>
        <v-icon color="white" v-else dense>mdi-account</v-icon>
    </v-avatar>
</template>
<script>
export default {

    props: {

        name: {type: String, default: null},
        size: {type: Number, default: 50, required: false},
    },

    computed: {
        userNameInitials(){

            if(!this.name)
                return null

            const parts = this.name.split(' ')

            let first, sec

            if(parts.length > 1){
                first = parts[0][0]
                sec = parts[1][0]
            } else {
                first = parts[0][0]
                sec = parts[0][1]
            }

            return first.toUpperCase()+sec.toUpperCase()
        }
    }
}
</script>