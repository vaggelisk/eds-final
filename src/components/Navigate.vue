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
                <v-list-tile-action >
                    <v-icon x-large >{{ item.icon }}</v-icon>
                </v-list-tile-action>

                <!--<v-list-tile-content>-->
                    <!--<v-list-tile-title>{{ item.title }}</v-list-tile-title>-->
                <!--</v-list-tile-content>-->
            </v-list-tile>
        </v-list>
    </v-navigation-drawer>

</template>

<script>
    export default {
        name: "Navigate",
        data () {
            return {
                items: [
                    { title: 'Dashboard', icon: 'home' },
                    { title: 'Engine Performance', icon: 'show_chart' },
                    { title: 'Components Diagnostics', icon: 'multiline_chart' },
                    { title: 'Troubleshooting', icon: 'build' },
                    { title: 'Maintenance', icon: 'calendar_today' },
                    { title: 'Spare Parts', icon: 'settings' },
                ],
                right: null
            }
        }

    }
</script>

<style scoped>

</style>
