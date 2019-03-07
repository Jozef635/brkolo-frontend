<template>
  <v-flex grow id="mapWindow" xs12 d-flex child-flex p-0 m-0>
      <v-btn color="accent" dark small absolute top right fab v-if="panorama" @click="hidePanorama"><v-icon>close</v-icon></v-btn>
      <iframe v-bind:src="frameAdd" id="mapFrame"/>
      <!-- <v-progress-linear :indeterminate="true" height="2" v-if="loading"></v-progress-linear> -->
  </v-flex>
</template>

<script>
    import { mapState } from 'vuex';
    export default {
        name: 'MapWindow',
        components: {
        },
        data: function () {
            return {
                frameAdd: require('./map.html'),
                mp: null,
                geoloc: null,
                showLoc: true,
            }
        },
        computed: mapState([
            'markers', 'panorama', 'detail', 'loading', 'loc', 'activeMarker'
        ]),
        watch: {
            markers: function (newMarkers, oldMarkers) {
                this.mp.removeMarkers();
                this.mp.addMarkers(newMarkers);
                this.$store.dispatch({type: 'endLoading' });
            },
            panorama: function(newP, oldP) {
                if(newP) {
                    this.mp.showPanorama({ lat: this.detail.lat, lon: this.detail.lon});
                } else {
                    this.mp.hidePanorama();
                }
            },
            loc: function(loc) {
                /*
                if(loc) {
                    this.mp.setExtent(loc, true);
                } else {
                    this.mp.removeLocMarker();
                }
                */
               if(loc && this.showLoc && this.mp) {
                   this.mp.updateLocMarker(loc);
               }
            },
            activeMarker: function(activeMarker, oldMarker) {
                if(activeMarker) {
                    alert('close!');
                }
            }
        },
        methods: {
            getInfo: function(id) {
                console.log(id);
                this.$store.dispatch({type: 'getDetail', id });
            },
            getMarkers: function(extent) {
                this.$store.dispatch({type: 'updateExtent', extent });
            },
            mapLoadCheck: function() {
                // https://stackoverflow.com/questions/9249680/how-to-check-if-iframe-is-loaded-or-it-has-a-content
                var iframe = document.getElementById("mapFrame");
                var mapDoc = (iframe.contentWindow.document || iframe.contentDocument);
                if(mapDoc.location.href.indexOf(this.frameAdd) > -1 && mapDoc.readyState  == 'complete' ) {
                   this.$timer.stop('mapLoadCheck');
                   this.mp = mapDoc.MapProxy;
                   this.mp.extentHandler = this.getMarkers;
                   this.mp.markerClickHandler = this.getInfo;
                   this.mp.poiMarkerOptions = { url: require('../assets/map_icon.svg')};
                   this.mp.locMarkerOptions = { url: require('../assets/team_icon.svg')};
                   this.mp.loadMap(this.loc, this.showLoc);
                   console.log('Map handlers mapped to vue methods');
                   
                } else {
                    /*
                    console.log('Iframe location is:');
                    console.log(mapDoc.location.href);
                    console.log('Iframe readysttate is:');
                    console.log(mapDoc.readyState);
                    */
                }
            },
            hidePanorama() {
                this.$store.dispatch({type: 'showPanorama', hide: true });
            },
            getGeoloc() {
                if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    var loc = { lat: position.coords.latitude, lon: position.coords.longitude };
                    if(this.mp && !this.loc) {
                        this.mp.setExtent(loc, this.showLoc);
                    }
                    this.$store.dispatch({type: 'changeLoc', loc: loc });
                }, null, {enableHighAccuracy:true, maximumAge:15000});
            }
            },
        },
        timers: {
            mapLoadCheck: { time: 100, autostart: true, immediate: true, repeat: true },
            getGeoloc: { time: 15000, autostart: true, immediate: true, repeat: true }
        },
        created() {
            
        },
        mounted() {
        }
    }
</script>
<style scoped>
#mapFrame {
    flex: 1 1 auto;
    border: 0px;
    padding: 0px;
    margin: 0px;
}
</style>