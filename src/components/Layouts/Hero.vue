<template>
    <v-main app>
        <v-container class="auth-container">
            <v-layout class="main-wrap card-wrap">
                <router-view/>
            </v-layout>
        </v-container>
    </v-main>
</template>
<script>
export default {
    
}
</script>
<style scoped>
.auth-container {
    min-height: 100vh;
    justify-content: center;
    display: flex;
    align-items: center;
}

.card-wrap {
    display: flex;
    justify-content: center;
    width: 100%;
}
</style>