<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" absolute app>
      <v-list nav dense>
        <v-list-item-group active-class="deep-purple--text text--accent-4">
          <router-link to="/">
            <v-list-item>
              <v-list-item-title>
                Home
              </v-list-item-title>
            </v-list-item>
          </router-link>
          <router-link to="/matches">
            <v-list-item>
              <v-list-item-title>
                Match
              </v-list-item-title>
            </v-list-item>
          </router-link>
          <router-link to="/opponents">
            <v-list-item>
              <v-list-item-title>
                Opponent
              </v-list-item-title>
            </v-list-item>
          </router-link>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar elevate-on-scroll scroll-target="#scrolling-techniques-7" app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>{{ title }}</v-toolbar-title>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container>
        <!-- If using vue-router -->

        <template v-if="userIsSet">
          <router-view></router-view>
        </template>

        <template v-else>
          <AppTop :title="welcomeTitle" :subtitle="welcomeSubTitle" />
          <PlayerForm :isUser="true" />
        </template>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { INIT_APP } from "@/store/types.js";
import { mapGetters } from "vuex";
import PlayerForm from "@/components/PlayerForm";
import AppTop from "@/components/AppTop";

export default {
  name: "App",

  components: {
    PlayerForm,
    AppTop
  },

  data: () => ({
    drawer: false,
    welcomeTitle: "First time here!",
    welcomeSubTitle: "Give us your skillz"
  }),
  computed: {
    title: function() {
      return this.$route.name;
    },
    ...mapGetters(["userIsSet"])
  },

  beforeCreate: function() {
    this.$store.dispatch(INIT_APP);
  }
};
</script>

<style></style>
