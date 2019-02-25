<template>

    <v-navigation-drawer app permanent width="80">
        <v-toolbar flat>
            <v-list>
                <v-list-tile>
                    <v-list-tile-title class="title">
                        EDS
                    </v-list-tile-title>
                </v-list-tile>
            </v-list>
        </v-toolbar>

        <v-divider></v-divider>

        <v-list dense class="pt-2">
            <v-list-tile
                    v-for="item in items"
                    :key="item.title"
                    class="pt-4"
            >
              <span v-if="item.title===selected">
                <v-list-tile-action >
                  <router-link :to="item.link">
                    <v-icon color="cyan"  x-large >{{ item.icon }}</v-icon>
                  </router-link>
                </v-list-tile-action>
              </span>
              <span v-else >
                <v-list-tile-action >
                  <router-link    :to="item.link"  >
                    <v-icon  x-large >{{ item.icon }}</v-icon>
                  </router-link>
                </v-list-tile-action>
              </span>

            </v-list-tile>
        </v-list>
    </v-navigation-drawer>

</template>

<script>
    '@fortawesome/fontawesome-free/css/all.css'

    export default {
      name: "Navigate",
      data () {
          return {
            right: null
          }
      },
      props: {
        selected: String,
        items: Array,
      },

    }
</script>

<style scoped>

</style>
