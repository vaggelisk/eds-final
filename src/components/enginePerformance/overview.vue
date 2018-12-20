<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>

      <v-flex d-flex xs12 sm6 md4>
        <v-layout row wrap>
          <v-flex d-flex>
            <v-layout row wrap>
              <v-flex
                v-for="n in 2"
                :key="n"
                d-flex
                xs12
              >
                <v-card
                    dark
                >
                  <v-card-text>{{ lorem.slice(0, 40) }}</v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>



      <v-flex d-flex xs12 sm6 md2>
        <v-layout row wrap>
          <v-flex d-flex>
            <v-layout row wrap>
              <v-flex
                v-for="n in 4"
                :key="n"
                d-flex
                xs12
              >
                <v-card
                  dark
                >
                  <v-card-text>{{ lorem.slice(0, 40) }}</v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex d-flex xs12 sm6 md2>
        <v-layout row wrap>
          <v-flex d-flex>
            <v-layout row wrap>
              <v-flex
                v-for="n in 4"
                :key="n"
                d-flex
                xs12
              >
                <v-card
                  dark
                >
                  <v-card-text>{{ lorem.slice(0, 40) }}</v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>


      <v-flex d-flex xs12 sm6 md4>
        <v-card color="blue lighten-2" dark>
          <v-card-text>
            {{ lorem + lorem + lorem + lorem + lorem + lorem + lorem + lorem + lorem + lorem  + lorem + lorem }}

          </v-card-text>
        </v-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
  // import axios                    from "axios";
  import {APIService}                from '../../api/getCardData';

  const API_URL = 'http://localhost:8092';
  const apiService = new APIService("pmax");

  export default {
    name: "Overview",
    data: function () {
        return {
          lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`,
          posts: [],
          errors: [],
          longname: "",
          unit: "",
        }
    },
    methods: {
      getContacts(){
        apiService.getCardData().then((data) => {
          console.log("hiiiiiiiiiiiiiii");
          console.log(data);})
          // console.log(apiService.getCardData())
          // this.contacts = data;
          // this.numberOfContacts= data.count;
      },
    },
    mounted() {
      this.getContacts();
    },


    // // Fetches posts when the component is created.
    // created() {
    //   axios.get(`http://jsonplaceholder.typicode.com/posts`)
    //     .then(response => {
    //       // JSON responses are automatically parsed.
    //       this.posts = response.data
    //     })
    //     .catch(e => {
    //       this.errors.push(e)
    //     })
    // }
  }
</script>

<style scoped>

</style>
