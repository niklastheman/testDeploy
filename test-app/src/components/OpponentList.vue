<template>
    <v-data-table
    :headers="headers"
    :items="opponents"
    :items-per-page="5"
    class="elevation-1"
  ></v-data-table>
</template>

<script>
export default {

    data: () => ({

        headers: [
            {
                text: 'Name',
                align: 'start',
                sortable: true,
                value: 'displayName',
            },
            { 
                text: 'Lefty'
                , value: 'lefty' 
            },
        ]
    }),

    computed: {

        opponents: function(){

            return this.$store.getters.opponents;
        }
    }
}
</script>

<style>

</style>