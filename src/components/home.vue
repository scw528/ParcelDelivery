
<template>
    <v-container id="home">
        <v-layout row wrap justify-center>
            <v-flex xs12 class="text-xs-center">
                <v-carousel hide-delimiters>
                    <v-carousel-item 
                        v-for="(deliveries, i) in deliveries"
                        v-bind:src='deliveries.src'
                        v-bind:key="i"
                        gradient="to top right, rgba(100,115,150,.33), rgba(25,32,50,.7)"
                    >
                    <div class="py-4">
                        <h1> {{ deliveries.title }} </h1>
                        <h2> {{ deliveries.description }} </h2>
                    </div>
                    </v-carousel-item>
                </v-carousel>   
            </v-flex>
        </v-layout>

        <v-layout row wrap>
            <v-flex xs12 sm6 lg3
                v-for="item in howItWorks"
                :key="item.title"
            >
                <v-card 
                    flat
                    class="text-xs-center ma-1" 
                    height="100%" 
                    id="HIWCards"
                    >
                    <v-responsive class="pt-4">
                        <v-icon color="light-blue"> {{ item.icon }} </v-icon>
                    </v-responsive>
                    <v-card-text>
                        <div class="subheading">
                            {{ item.title }}
                        </div>
                        <div class="grey--text mt-2">
                            {{ item.description }}
                        </div>
                    </v-card-text>

                    <v-card-actions class="justify-center mt-3">
                        <v-btn block flat id='cardBtn' color="blue">
                            {{ item.btnName }}
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex xs12>
                <v-card flat class="justify-center mt-2" id="pricing">
                    <v-img :src="require('../assets/piggybank.jpg')" aspect-ratio="3"> </v-img>

                    <v-card-title primary-title>
                    <div class="text-xs-center">
                        <h3 class="headline mb-0">{{title}}</h3>
                        <div class="grey--text mt-2">
                            {{ info }}
                        </div>
                    </div>
                    </v-card-title>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            computed: {
                deliveries () {
                    return this.$store.getters.featuredDeliveries
                }
            },
            methods: {
                onLoadDelivery (id) {
                    this.$router.push('/deliveries/' + id)
                }
            },
            deliveries: [
                {
                    src: require('../assets/manbox.jpg'), title: 'Convenient', description: 'Never miss a parcel delivery again with *Delivery Service*\'s 24/7 parcel delivery service!' 
                },
                {
                    src: require('../assets/files.jpg'), title: 'Parcel Insurance', description: '*Delivery Service* provides insurance for every parcel we recieve. Your items are covered from the time they enter out warehouse, to the time we deliver it directly to your hands!'
                },
                {
                    src: require('../assets/key.jpg'), title: 'Peace Of Mind', description: 'Never worry about having your parcel stolen from your front step again!'
                },
                {
                    src: require('../assets/family.jpg'), title: 'Free Up Valuable Time', description: 'Your time is valuable, enjoy it. Let *Delivery Service* free up your day with our convenient parcel delivery service!'
                }
            ],
            howItWorks: [
                {
                    icon: 'person_add', title: 'Log In or Create an Account', description: 'First you will create an account with *Delivery Service* by simply clicking the Create Account Button below.', btnName: 'Create an Account', link: '/register'
                },
                {
                    icon: 'shopping_cart', title: 'Ship Online Purchases to *Delivery Service*', description: 'Have items purchased online sent to *Delivery Service*\'s warehouse where we will take delivery of these items for you. Click the Warehouse Address Button below to copy and paste *Delivery Service*\'s warehouse address details.', btnName: 'Warehouse Address', link: '/warehousedetails'
                },
                {
                    icon: 'notifications_active', title: 'Get Notified When Parcel Arrives', description: 'Receive a text message or email when *Delivery Service* takes delivery of your items and you are able to schedule your delivery', btnName: 'Delivery History', link: '/deliveries'
                },
                {
                    icon: 'airport_shuttle', title: 'Schedule Your Delivery', description: 'Schedule the day, time and location you would like your items delivered. Click the Schedule Delivery Button below to have your items delivered.', btnName: 'Schedule Delivery', link: '/schedule'
                }
            ],
            title: '$9.85 Flat Rate Delivery',
            info: 'For just $9.85 you can have your parcels safely and conveniently delivered right to your hands with just a few clicks of your mouse. Never worry about costly items being stolen or damaged, or having time sensitive items show up late again!'
        }
    }
}
</script>

<style scoped>
    h1 {
        font-size: 50pt;
        color: white;
        letter-spacing: 3px;
    }

    h2 {
        font-size: 14pt;
        color: white;
    }

    .v-icon {
        font-size: 70px;
        text-align: center;
    }

    #home {
        margin-bottom: 100px;
    }

    #cardBtn {
        position: absolute;
        bottom: 2%;
    }

</style>

