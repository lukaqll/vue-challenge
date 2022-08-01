<template>
    <v-switch color="white" inset v-model="$vuetify.theme.isDark" class="mt-5">
        <template v-slot:label>
            <span v-if="!$vuetify.theme.isDark">
                <v-icon color="yellow" class="mr-2">fa fa-sun</v-icon>
            </span>
            <span v-else>
                <v-icon class="mr-2">fa fa-moon</v-icon>
            </span>
        </template>
    </v-switch>
</template>
<script>
export default {

    watch: {
        '$vuetify.theme.isDark': function (isDark) {
            localStorage.setItem('darkmode', isDark ? '1' : '0')
            window.location.reload()
        }
    },
}
</script>