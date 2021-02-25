<template>
  <div>
       <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        @submit.prevent="submit"
      >
            <v-select
            v-model="select"
            :items="opponents"
            :rules="[v => !!v || 'Item is required']"
            item-text="displayName"
            item-value="id"
            label="Opponent"
            required
            ></v-select>


            <v-textarea
            solo
            label="Notes"
            ></v-textarea>

            <v-btn
            class="mr-4"
            type="submit"
            >
            submit
            </v-btn>
      </v-form>
  </div>
</template>

<script>
export default {

    data: () => ({
        valid: true
        , select: null
    }),
    computed: {

        opponents: function(){

            return this.$store.getters.activeOpponents;
        }
    }
}
</script>

<style>

</style>