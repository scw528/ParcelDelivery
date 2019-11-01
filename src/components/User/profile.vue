<template>
  <v-container
    fill-height
    fluid
    grid-list-xl>
    <v-layout
      justify-center
      wrap
    >
      <v-flex
        xs12
        md8
      >
        <v-card flat>
          <v-form>
            <v-container py-0>
              <v-layout wrap>
                <v-flex
                  xs12
                  md6
                >
                  <v-text-field label="First Name" />
                </v-flex>
                <v-flex
                  xs12
                  md6
                >
                  <v-text-field label="Last Name" />
                </v-flex>
                <v-flex
                  xs12
                  md6
                >
                  <v-text-field label="City" />
                </v-flex>
                <v-flex
                  xs12
                  md6
                >
                  <v-text-field label="Phone Number" />
                </v-flex>
                <v-flex
                  xs12
                  md12
                >
                  <v-text-field label="Street Address" />
                </v-flex>
                <v-flex
                  xs12
                  md6>
                  <v-text-field label="Province" />
                </v-flex>
                <v-flex
                  xs12
                  md6>
                  <v-text-field label="Postal Code" />
                </v-flex>
                <v-flex
                  xs12
                  text-xs-right
                >
                  <v-btn dark
                    class="mx-0"
                    color="light-blue"
                  >
                    Update Profile
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </v-card>
      </v-flex>
      <v-btn class="ma-2" @click="signOut()"> Sign Out </v-btn>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  methods: {
      signOut() {
        this.$store.dispatch('signOut')
    }
  }
}
</script>