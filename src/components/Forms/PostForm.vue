<template>
    <v-form @submit.prevent="save" :id="id">
        <div class="row">
            <div class="col-12">
                <v-text-field
                    dense outlined label="Title" 
                    v-model="formData.title" :rules="rules.title"
                    :error-messages="errorMessageHandle('title')"
                ></v-text-field>
            </div>

            <div class="col-12">
                <v-textarea
                    outlined label="Body" rows="3"
                    v-model="formData.body" :rules="rules.body"
                    :error-messages="errorMessageHandle('body')"
                ></v-textarea>
            </div>
        </div>
    </v-form>
</template>

<script>
export default {

    props: {
        post: {type: Object, default: () => {}},
        errors: {type: Array, default: () => []},
        id: {type: String, default: 'post-form'}
    },

    data(){
        return {
            formData: {...this.post},
            rules: {
                title: [
                    v => !!v || 'Title field is required',
                ],
                body: [
                    v => !!v || 'Body field is required',
                ],
            }
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