<template>
    <v-scroll-x-transition mode="out-in">
        <!--
        <v-list three-line v-if="detail && detail.id" :key="detail.id">
          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="accent">location_on</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-sub-title>{{ detail.info.title }}</v-list-tile-sub-title>
              <v-list-tile-title>{{ detail.info.question }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile v-if="detail.active">
            <v-list-tile-action>
              <v-icon color="accent">help_outline</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>Instrukce</v-list-tile-title>
              <v-list-tile-sub-title>{{ detail.info.instructions }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-else>
            <v-list-tile-action>
                <v-icon color="accent">location_on</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>Tento úkol není aktivní</v-list-tile-title>
              <v-list-tile-sub-title>Nejdřív navštivte toto místo.</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile> 
        </v-list>
        <v-list two-lines v-else key="placeholder">
          <v-list-tile>
            <v-list-tile-action>
                <v-icon color="accent">location_on</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>Není vybrán žádný úkol</v-list-tile-title>
              <v-list-tile-sub-title>Vyberte úkol z mapy.</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        -->
        <v-card flat v-if="detail && detail.id" :key="detail.id">
          <v-card-title><v-icon large left color="accent">location_on</v-icon>
          <span class="title font-weight-light">{{ detail.info.question }}</span><br>
          <!--
          <span class="grey--text font-weight-light">{{ detail.info.title }}</span>
          -->
          </v-card-title>
          <v-card-text>
          <!-- <v-icon color="accent">help_outline</v-icon> -->
          <span v-if="detail.active">
          {{ detail.info.instructions }}  
          </span>
          <span v-else>
            Tento úkol není aktivní. Nejdřív navštivte toto místo.
          </span>  
          </v-card-text>         
        </v-card>
        <v-list two-lines v-else key="placeholder">
          <v-list-tile>
            <v-list-tile-action>
                <v-icon color="accent">location_on</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>Není vybrán žádný úkol</v-list-tile-title>
              <v-list-tile-sub-title>Vyberte úkol z mapy.</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>

        </v-scroll-x-transition>
        
</template>

<script>
    
    export default {
        name: 'Detail',
        components: {
        },
        props: [],
        data: function () {
            return {
                
            }
        },
        computed: {
            detail () {
                return this.$store.state.detail;
            },

        },
        methods: {
            showPhoto () {
                this.$store.dispatch({type: 'showPanorama' });
            }
        },
        timers: {
        },
        created() {

        },
        mounted() {
         }
    }
</script>
<style scoped>

</style>