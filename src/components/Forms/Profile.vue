<template>
    <v-form @submit.prevent="save" :id="id">
        <div class="row">
            <div class="col-12">
                <v-text-field
                    outlined label="Name" dense
                    v-model="formData.name" :rules="rules.name"
                    :error-messages="errorMessageHandle('name')"
                ></v-text-field>
                <v-text-field
                    dense outlined label="Email" 
                    v-model="formData.email" :rules="rules.email"
                    :error-messages="errorMessageHandle('email')"
                ></v-text-field>
                <v-radio-group v-model="formData.gender" :error-messages="errorMessageHandle('gender')">
                    <v-radio value="male" label="Male"/>
                    <v-radio value="female" label="Female"/>
                </v-radio-group>
            </div>        
        </div>
    </v-form>
</template>

<script>
export default {

    props: {
        user: {type: Object, default: () => {}},
        errors: {type: Array, default: () => []},
        id: {type: String, default: 'register-form'}
    },
    
    watch: {
        user(v){
            this.formData = {...v}
        }
    },

    data(){
        return {
            formData: {...this.user},
            rules: {
                email: [
                    v => !!v || 'E-mail field is required',
                ],
                name: [
                    v => !!v || 'Name field is required',
                ],
                gender: [
                    v => !!v || 'Gender field is required',
                ],
            },
            genders: [
                {text: 'Male', value: 'male'},
                {text: 'Female', value: 'female'},
            ]
        }
    },

    methods: {

        errorMessageHandle(field) {
            return this.errors.filter(e => e.field == field)
                              .map(e => e.message)
        },

        save() {
            this.$emit('submit', this.formData)
        }
    }
}
</script>