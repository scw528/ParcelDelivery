<template>
  <v-container>
    <v-layout row wrap v-for="delivery in deliveries" :key="delivery.docid" class="mb-2">
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card class="info">
          <v-container fluid>
            <v-layout row>
              <v-flex xs7 sm8 md9>
                <v-card-title primary-title>
                  <div>
                    <h1 class="white--text mb-0"> {{ delivery.title }} </h1>
                    <div>Order Date: {{ delivery.orderDate }}</div>
                  </div>
                </v-card-title>
                <v-card-text>
                  <div> {{ delivery.description }} </div>
                  <div> Scheduled Date: {{ delivery.date }} </div>
                </v-card-text>
                <v-card-actions>
                  <v-flex>
                      <v-dialog v-model="dialog" max-width="600px">
                        <v-btn flat slot="activator" color="white">Schedule Delivery</v-btn>
                        <v-card>
                          <v-form>
                              <v-card-title> <h1> Schedule Date and Time for Delivery {{ delivery.docid }} </h1> </v-card-title>
                              <v-card-text>
                                <v-form class="px-3">
                                  <v-layout row>
                                      <v-flex xs6>
                                      <v-menu :close-on-content-click="true">
                                          <v-text-field slot="activator" 
                                          :value="formattedDate" clearable label="Select Day" prepend-icon="date_range">
                                          </v-text-field>
                                          <v-date-picker v-model="deliveryDT" @change="menu = false"></v-date-picker>
                                      </v-menu>
                                      </v-flex>
                                      <v-flex xs6>
                                          <v-select
                                          v-model="deliveryTime"
                                          :items="items"
                                          item-text="time"
                                          label="Select Delivery Time"
                                          return-object
                                          single-line
                                          ></v-select>
                                      </v-flex>
                                  </v-layout>
                                  <v-spacer></v-spacer>
                                  <v-btn right block flat @click="submit(delivery.docid); dialog = false;" class="mx-0 mt-3" color="light-blue">Confirm</v-btn>
                                </v-form>
                              </v-card-text>
                          </v-form>
                        </v-card>
                    </v-dialog>
                  </v-flex>
                </v-card-actions>
              </v-flex>
            </v-layout> 
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import db from '.././../main'
import format from 'date-fns/format'
import firebase from 'firebase'
export default {
    data () {
      return {
        dialog: false,
        deliveries: [],
        currentDate: new Date().toISOString().substr(0, 10),
        deliveryDT: null,
        deliveryTime: null,
        deliveries: [],
        items: [
          '12:00 pm - 1:00 pm',
          '1:00 pm - 2:00 pm',
          '2:00 pm - 3:00 pm',
          '3:00 pm - 4:00 pm',
          '5:00 pm - 6:00 pm',
          '6:00 pm - 7:00 pm',
          '7:00 pm - 8:00 pm',
          '8:00 pm - 9:00 pm',
          '9:00 pm - 10:00 pm',
          '10:00 pm - 11:00 pm',
          '11:00 pm - 12:00 am',
          '12:00 am - 1:00 am',
          '1:00 am - 2:00 am',
          '2:00 am - 3:00 am',
          '3:00 am - 4:00 am',
          '4:00 am - 5:00 am',
          '5:00 am - 6:00 am',
          '6:00 am - 7:00 am',
          '7:00 am - 8:00 am',
          '8:00 am - 9:00 am',
          '9:00 am - 10:00 am',
          '10:00 am - 11:00 am',
          '11:00 am - 12:00 pm',
        ]
      }
    },
    created () {
      db.collection('users').doc(firebase.auth().currentUser.email).collection('orders').get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(doc.data());
            const data = {
            'date': doc.data().date,
            'description': doc.data().description,
            'scheduled': doc.data().scheduled,
            'time': doc.data().time,
            'title': doc.data().title,
            'docid': doc.id,
            'orderDate': doc.data().orderDate,
          }
          console.log(data);
          this.deliveries.push(data);
        })
      })
    },
    methods: {
      submit(id) {
          //dialog = false;
          console.log(id);
          var currentEmail = firebase.auth().currentUser.email;
          db.collection('users').doc(currentEmail).collection('orders').doc(id).update({
            date: this.formattedDate,
            time: this.deliveryTime,
            scheduled: true
          }).then(querySnapshot => {
              console.log("Document successfully written!");
              window.location.reload();
          })
          .catch(function(error) {
              console.error("Error writing document: ", error);
          });
      }
    },
    computed: {
      formattedDate() {
          return this.deliveryDT ? format(this.deliveryDT, 'Do MMM YYYY') : ''
      }
    }
}

// var user = firebase.auth().currentUser;

// if (user) {
//   // User is signed in.
// } else {
//   // No user is signed in.
// }

</script>
