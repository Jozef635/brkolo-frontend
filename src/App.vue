<template>
  <div id="app">
<v-app>
  <v-navigation-drawer class="pa-3" fixed clipped v-model="drawer" app>
      <h2>Vítejte!</h2>
      <p>Brkolo 2019 co to je</p>
      <h3>Pravidla</h3>
      <p>Irure laborum sit Lorem do est minim. Nostrud aliquip enim sint sit occaecat reprehenderit exercitation ut aliqua nisi tempor commodo do. Minim dolore eu anim ad adipisicing pariatur. Dolor sunt et mollit ea sunt magna proident minim anim pariatur nostrud.</p>
      <p>Adipisicing nostrud eu pariatur veniam exercitation minim nisi incididunt nulla nostrud minim. Tempor sunt reprehenderit dolore culpa aliqua ipsum nostrud excepteur sunt nisi minim labore non mollit. Est velit labore nisi ullamco dolore amet mollit ex est. Mollit velit proident minim cillum do esse consectetur in sit. Id proident in anim ullamco labore Lorem ipsum.</p>
      <p>Consectetur reprehenderit est dolor nisi qui irure tempor sit sint dolore quis anim Lorem. Laboris id incididunt velit minim laboris esse consequat nostrud officia minim qui occaecat eiusmod. Ea ea reprehenderit dolore et sint veniam officia laboris.</p>
  </v-navigation-drawer>
  <v-navigation-drawer fixed clipped right app v-model="detail">
      <detail></detail>
  </v-navigation-drawer>
  <v-toolbar app clipped-right clipped-left fixed dark color="primary">
      <v-toolbar-side-icon @click.stop="drawer = !drawer">
          <v-icon>help_outline</v-icon>
      </v-toolbar-side-icon>   
      <img style="height:38px" src="../assets/dvojka_title.png" />
      <v-toolbar-title style="width: 400px" class="ml-0 pl-3">
           
          <span class="hidden-sm-and-down">{{ title }}</span></v-toolbar-title>
      <v-spacer></v-spacer>
  </v-toolbar>
  <v-content fluid>
    <v-container pa-0 fluid fill-height>
      <v-layout fill-height column>
      <Map />
      </v-layout>
    </v-container>
  </v-content>
  <v-footer app color="secondary">
      <v-layout justify-center row wrap>
        <v-flex secondary pa-2 text-xs-center xs12>
            &copy;2019, <a href="https://nastojte.cz">Adam Kučera</a>
        </v-flex>
      </v-layout>
    </v-footer>
    <v-dialog v-model="locWarnDialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Upozornění</v-card-title>

        <v-card-text>
          Pokud nepovolíte zjišťování polohy, stránka nebude fungovat správně.
        </v-card-text>
        <v-card-actions><v-spacer></v-spacer>
          <v-btn flat="flat" @click="locWarnDialog = false">Chápu</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
   </v-app> 
  </div>
</template>

<script>
    import Map from './Map.vue';
    import Detail from './Detail.vue';
    export default {
        name: 'postboxes-frontend',
        components: {
            Map,
            Detail,
        },
        data: function () {
            return {
                title: 'Brkolo 2019',
                drawer: true,
            }
        },
        computed: {
            detail: {
                get () {
                    return this.$store.state.detail;
                },
                set (val) {
                    this.$store.commit({ type: 'detail', detail: val });
                }
            },
            locWarnDialog: {
                get () {
                    return this.$store.state.locWarnDialog;
                },
                set (val) {
                    this.$store.commit({ type: 'locWarnDialog', d: val });
                }
            }    
        },
        methods: {
        },
        created() {
         }
    }
</script>
<style scoped>
</style>