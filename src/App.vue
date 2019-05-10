<template>
  <div id="app">
<v-app>
  <v-navigation-drawer class="pa-3" fixed clipped v-model="drawer" app>
      <h2>Vítejte!</h2>
      <p>Toto je jeden z úkolů hry Brkolo 2019, který vás provede po méně známých zákoutích Brna. Na této stránce najdete mapu s vynačenými
        místy, která můžete navštívit a získat tak body do celkového hodnocení. Na každém navštíveném místě vás čeká úkol, který musíte splnit
        (obvykle něco na místě zjistit). Odpovědi zapisujte do papíru, který jste dostali na startu. Papír odevzdáte vyplněný v cíli. 
        Jednak nám to usnadní vyhodnocování, jednak tak nemůžete zkoušet správnou odpověď tipovat a jednak vám tak můžeme uznat i
        kreativnější odpovědi, které by stroj nemusel skousnout. :) Věnujte prosím ještě pozor následujícím pravidlům.
      </p>
      <h3>Pravidla</h3>
      <p>Stanoviště nemusíte navštívit všechna. Dostanete body za každé, které jste navštívili a odpověděli správně na otázku. Zhodnocení,
        v jakém pořadí stanoviště navštěvovat, jak to skloubit s ostatními úkoly, a jestli se tam vůbec vydávat, je čistě na vás.</p>
        <p>Stanoviště pro splnění úkolu musíte navštívít. Je ZAKÁZÁNO používat Google Street View nebo Seznam Panorama a zkoumat
          zdrojový kód aplikace.</p>
      <p>Na mapě byste měli vidět svoji polohu (oranžové panáčky). Stanoviště jsou červená, ve chvíli, kdy se k nim přiblížite na 50 metrů, měla by zezelenat.
        Když vyberete zelené stanoviště na mapě, ukáže se vám zadání úkolu. Úkoly je obvykle třeba řešit na místě stanoviště. Zadání úkolů
        proto ani nevidíte dříve, než se na stanoviště dostanete. Předání polohy stránce občas chvíli trvá, dejte tomu minutku nebo dvě.
      </p>
      <p>Hra vyžaduje, abyste měli povolena mobilní data (stránka není nijak extrémně náročná na data) a zapnutou GPS. 
        Webové stránce také musíte povolit, aby směla zjišťovat vaši polohu. Potřebuje to k tomu, aby zobrazovala vaši ikonku na mapě
        a zpřístupňovala vám úkoly.
        Předpokládáme, že aspoň jeden z týmu takto vybavený telefon mít bude.
        Pokud ne, nezbývá vám bohužel nic jiného než oběhnout ostatní stanoviště tak rychle, že ostatní porazíte.</p>
      <p>V případě technických komplikací můžete zkusit zavolat Adama na 775 397 795.</p>
  </v-navigation-drawer>
  <v-navigation-drawer fixed clipped right app v-model="detail">
      <detail></detail>
  </v-navigation-drawer>
  <v-toolbar app clipped-right clipped-left fixed dark color="primary">
      <v-toolbar-side-icon @click.stop="drawer = !drawer">
          <v-icon>help_outline</v-icon>
      </v-toolbar-side-icon>   
      <img style="height:38px;" src="../assets/title.png" />
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
        name: 'brkolo-frontend',
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