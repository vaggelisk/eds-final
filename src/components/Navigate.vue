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
                    :key="item.title"  class="pt-4"
            >
              <span v-if="item.link===selectedNat">
                <v-list-tile-action >
                  <router-link :to="item.link">
                    <v-icon color="cyan"  x-large >{{ item.icon }}</v-icon>
                  </router-link>
                </v-list-tile-action>
              </span>
              <span v-else >
                <v-list-tile-action @click="toggle(item.link)" >
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
            selectedNat: this.selectedN,
            items: [
                  { title: 'Dashboard',               link: 'dashboard',              icon: 'home', },
                  { title: 'Engine Performance',      link: 'engine-performance',     icon: 'show_chart' },
                  { title: 'Components Diagnostics',  link: 'components-diagnostics', icon: 'multiline_chart' },
                  { title: 'Troubleshooting',         link: 'troubleshooting',        icon: 'build' },
                  { title: 'Maintenance',             link: 'maintenance',            icon: 'calendar_today' },
                  { title: 'Spare Parts',             link: 'spare-parts',            icon: 'settings' },
              ],
              right: null
          }
      },
      props: {
        selectedN: String,
      },
      // computed: {
      //   selectedNat() {
      //     return this.selected;
      //   }
      // },
      methods: {
        toggle (index) {
          console.log(index);
          this.selectedNat = index;
          console.log(this.selectedNat);
          // this.selected =this.selectedNat;
          // console.log(this.selected);
        }
      },



    }
</script>

<style scoped>

</style>
