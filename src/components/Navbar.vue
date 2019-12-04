<template>
  <nav>
    <v-snackbar v-model="snackbar" :timeout="4000" top color="success">
      <span>Awesome! You added a new project.</span>
      <v-btn
      color="white"
      text
      @click="snackbar = false">
      Close</v-btn>
    </v-snackbar>

<!-- barra de navegacao -->
    <v-app-bar text app>
        <v-app-bar-nav-icon
        @click="drawer = !drawer"
        class="grey--text">
        </v-app-bar-nav-icon>
        <v-toolbar-title class="text-capitalize grey--text">
            <span class="font-weight-light">Web</span>
            <span>Xani</span>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <!-- dropdown menu -->
        <v-menu open-on-hover top offset-y>
            <template v-slot:activator="{ on }">
            <v-btn
            text
            color="grey"
            v-on="on">
            <v-icon left>expand_more</v-icon>
            <span>Menu</span>
            </v-btn>
            </template>
            <v-list>
                <v-list-item
                v-for="(link, i) in links"
                :key="i"
                route
                :to="link.route">

                <v-list-item-title>{{ link.text }}</v-list-item-title>
            </v-list-item>
            </v-list>
        </v-menu>

        <!-- login -->
        <v-btn text color="grey">
            <span>Sign Out</span>
            <v-icon right>exit_to_app</v-icon>
        </v-btn>

    </v-app-bar>

<!-- Sanwich Navigater -->
    <v-navigation-drawer app v-model="drawer" class="grey">
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avatar size="100">
            <img class="text-lg-center" src="/xani.webp">
          </v-avatar>
          <p class="white--text subheading mt-1">The Net Xani</p>
        </v-flex>
        <v-flex class="mt-4 mb-3">
          <Popup @projectAdded="snackbar = true" />
        </v-flex>
      </v-layout>

      <v-list>
        <v-list-item
        v-for="link in links"
        :key="link.text"
        router
        :to="link.route">
             <v-list-item-icon>
              <v-icon
              class="white--text"
              v-text="link.icon">
              </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title
              class="white--text"
              v-text="link.text">
              </v-list-item-title>
            </v-list-item-content>
        </v-list-item>
      </v-list>

    </v-navigation-drawer>

  </nav>
</template>

<script>
import Popup from "./Popup";
export default {
  components: { Popup },
  data() {
    return {
      drawer: false,
      links: [
        { icon: "dashboard", text: "Dashboard", route: "/" },
        { icon: "folder", text: "My Projects", route: "/projects" },
        { icon: "person", text: "Team", route: "/team" }
      ],
      snackbar: false
    };
  }
};
</script>

<style>
</style>
