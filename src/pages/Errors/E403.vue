<template>
    <div class="text-center">
        <h1>403 | {{ $route.query.message || 'No Authorization' }}</h1>
        <div class="row">
            <div class="col-12 d-flex justify-content-between">
                <v-btn color="primary center" @click="$router.back(-2)">
                    <i class="fa fa-chevron-left"></i>
                    Back
                </v-btn>
                <v-btn text color="primary center" @click="$router.push('/login')">
                    Go to Login
                </v-btn>
            </div>
        </div>
    </div>
</template>