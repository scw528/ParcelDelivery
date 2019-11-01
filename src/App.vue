<template>
  <v-app>
      <v-navigation-drawer 
        v-model="drawer"
        absolute
        temporary
      >
      <v-list>
        <v-list-tile 
          v-for="item in menuItems" 
          v-bind:key="item.title"
          router
          v-bind:to="item.link"
          >
          
          <v-list-tile-action>
            <v-icon> {{ item.icon }} </v-icon>
          </v-list-tile-action>

          <v-list-tile-content> {{ item.title }} </v-list-tile-content>

        </v-list-tile>
      </v-list>
      </v-navigation-drawer>

      <v-toolbar>
        <v-toolbar-side-icon 
          @click.stop="drawer = !drawer"
          class="hidden-sm-and-up"
        ></v-toolbar-side-icon>

        <v-toolbar-title>
          <router-link to="/" tag="span" style="cursor: pointer"> The Delivery People </router-link>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-toolbar-items class="hidden-xs-only">

          <v-btn 
            flat 
            v-for="item in menuItems" 
            v-bind:key="item.title"
            router
            v-bind:to="item.link"
            > {{ item.title }} </v-btn>

        </v-toolbar-items>
      </v-toolbar>
    <main>
      <router-view></router-view>
      <v-footer
            dark
            height="auto"
            width="100%"
            absolute
        >
          <v-card
          class="flex"
          flat
          tile
          >
              <v-card-title class="light-blue">
                  <strong class="subheading">Get connected with us on social networks!</strong>

                  <v-spacer></v-spacer>

                  <v-btn
                  v-for="icon in footer"
                  :key="icon.title"
                  class="mx-3"
                  dark
                  icon
                  router
                  v-bind:to="icon.link"
                  >
                  <v-icon size="24px">{{ icon.icon }}</v-icon>
                  </v-btn>
              </v-card-title>
          </v-card>
        </v-footer>
    </main>
  </v-app>
</template>

<script>
import { link } from 'fs';

export default {
  data () {
    return {
      drawer: false,
      footer: [
        {icon: 'fab fa-facebook', link: '/facebook'} ,
        {icon: 'fab fa-twitter', link: '/twitter'},
        {icon: 'fab fa-linkedin', link: '/linkedin'},
        {icon: 'fab fa-instagram', link: '/instagram'}
      ],
    }
  },
  computed: {
    menuItems() {
      let menuItems = [
        { icon: 'location_city', title: 'Warehouse Details', link: '/warehousedetails' },
        { icon: 'lock', title: 'Login', link:'/login' },
        { icon: 'person_add', title: 'Register', link:'/register' },
      ]
      if (this.userIsAuthenticated) {
          menuItems = [
            { icon: 'history', title: 'All Deliveries', link:'/deliveries' },
            { icon: 'person', title: 'Profile', link: '/profile'},
          ]
      }
      return menuItems;
    },
    userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      }
  }
}
</script>