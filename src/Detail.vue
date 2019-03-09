<template>
    <v-scroll-x-transition mode="out-in">
        <v-list two-lines v-if="detail && detail.id" :key="detail.id">
          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="accent">location_on</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-sub-title>{{ detail.info.title }}</v-list-tile-sub-title>
              <v-list-tile-title>{{ detail.info.question }}</v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action @click="showPhoto">
              <v-btn icon><v-icon color="accent">photo_camera</v-icon></v-btn>
            </v-list-tile-action>
          </v-list-tile>

          <v-list-tile v-if="detail.active">
            <v-list-tile-action>
              <v-icon color="accent">help_outline</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-sub-title>Instrukce</v-list-tile-sub-title>
              <v-list-tile-title>{{ detail.info.instructions }}</v-list-tile-title>
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
            addressLines () {
                return this.detail.info.adresa.split(',');
            },
            schedules () {
                var d = this.detail.info.omezeni.split(';').map(i => i.replace(/(\d-\d - )|(\d - )/, '')); 
                return this.detail.info.cas.split(';').map((item, i) => {
                  return {
                      time: item,
                      days: d[i]
                  };  
                })
            },
            office () {
                return {
                    name: this.detail.info.zkrnaz_posty,
                    zip: this.detail.info.psc
                }
            },
            desc () {
                return this.detail.info.misto_popis == '?' ? null : this.detail.info.misto_popis
            }

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