<template>
  <div class="home">
    <MatchList />
  </div>
</template>

<script>
import MatchList from '../components/MatchList.vue';
// @ is an alias to /src

export default {
  name: "Home",
  components: {MatchList}
};
</script>
