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
         <!--<i class="mdi-home"></i>-->
        <!--<v-icon large>{{mdi-home}}</v-icon>-->
        <v-list dense class="pt-2">
            <v-list-tile
                    v-for="item in items"
                    :key="item.title"  class="pt-4"
            >
                <v-list-tile-action >
                  <router-link :to="item.link">
                    <v-icon x-large >{{ item.icon }}</v-icon>
                  </router-link>
                </v-list-tile-action>


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
                items: [
                    { title: 'Dashboard', link: 'dashboard', icon: 'home', },
                    { title: 'Engine Performance', link: 'engine-performance', icon: 'show_chart' },
                    { title: 'Components Diagnostics', link: 'components-diagnostics', icon: 'multiline_chart' },
                    { title: 'Troubleshooting', link: 'troubleshooting', icon: 'build' },
                    { title: 'Maintenance', link: 'maintenance', icon: 'calendar_today' },
                    { title: 'Spare Parts', link:'spare-parts', icon: 'settings' },
                ],
                right: null
            }
        }

    }
</script>

<style scoped>

</style>
