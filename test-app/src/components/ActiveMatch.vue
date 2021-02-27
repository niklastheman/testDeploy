<template>
  <div>
      {{match.id}}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {

    computed: {

        ...mapGetters("matches/", {
            match: 'activeMatch'
        })
    }
}
</script>

<style>

</style>