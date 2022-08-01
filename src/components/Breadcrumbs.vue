<template>
    <v-breadcrumbs class="mt-n15 d-md-block d-lg-block d-xl-block d-none" :items="customItems" large exact>
        <template v-slot:divider>
            <v-icon>mdi-chevron-right</v-icon>
        </template>

        <template v-slot:item="{item}">
            <v-breadcrumbs-item :to="item.to || item.href" exact>
                {{item.text}}
            </v-breadcrumbs-item>
        </template>
    </v-breadcrumbs>
</template>


<script>
export default {
    props: { items: Array },

    computed: {
        customItems() {
            const newItems = this.items

            if(!!this.$route.meta.title){
                newItems.push({
                    text: this.$route.meta.title,
                    disabled: true
                })
            }

            return newItems
        }
    }
}
</script>
<style scoped>
</style>