import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


function getDiff(v) {
    return v.max - v.min;
}

function isActive(e) {
    var latDiff = getDiff(e.lat);
    var lonDiff = getDiff(e.lon);
   if(latDiff > 0.35 
    || lonDiff > 0.15) {
        // zoomed out
        return false;
    }
    return true;
}

function getNewExtent(e, o) {
   if(!isActive(e)) {
        // zoomed out - no markers are fetched
        e.action = 'delete';
        return e;
    }
    
    // compare with existing extent
    if(e.lat.min >= o.lat.min && e.lat.max <= o.lat.max 
        && e.lon.min >= o.lon.min && e.lon.max <= e.lon.max
        // if the old extent is inactive, we have to get the markers again
        && isActive(o)) {
            // current view is within the existing extent
            // user either just zoomed in or panned just a little
            //e.action = 'none';
            return false;
        }

    // we have a new extent - we will expand it a bit to prevent frequent requests when panning the map just a little bit
    var latDiff = getDiff(e.lat);
    var lonDiff = getDiff(e.lon);
    e.lat.min -= latDiff / 4;
    e.lat.max += latDiff / 4;
    e.lon.min -= lonDiff / 4;
    e.lon.max += lonDiff / 4;
    e.action = 'refresh';
    return e;
}

function getGeolocDiff(loc1, loc2) {
    // https://stackoverflow.com/questions/639695/how-to-convert-latitude-or-longitude-to-meters

    var latMid = (loc1.lat+loc2.lat)/2.0;  // or just use Lat1 for slightly less accurate estimate
    var m_per_deg_lat = 111132.954 - 559.822 * Math.cos(2.0 * latMid) + 1.175 * Math.cos(4.0 * latMid);
    var m_per_deg_lon = (Math.PI/180) * 6367449 * Math.cos(latMid);

    var deltaLat = Math.abs(loc1.lat - loc2.lat);
    var deltaLon = Math.abs(loc1.lon - loc2.lon);

    var dist_m = Math.sqrt (Math.pow(deltaLat * m_per_deg_lat, 2) + Math.pow(deltaLon * m_per_deg_lon, 2));
    return dist_m;
}

export default new Vuex.Store({
    state: {
      extent: { lat: { min: 0, max: 0}, lon: { min: 0, max: 0}},
      allMarkers: require('./markers.json'),
      markers: [],
      activeMarker: false,
      mapSuggest: [],
      loc: null,
      detail: null,
      panorama: false,
      loading: false,
      locWarnDialog: false
    },
    mutations: {
      markers(state, payload) {
        state.markers = payload.markers;
      },
      extent(state, payload) {
        state.extent = payload.extent;
      },
      detail(state, payload) {
          state.detail = payload.detail;
      },
      panorama(state, payload) {
          state.panorama = payload.panorama;
      },
      loading(state, payload) {
          state.loading = payload.loading;
      },
      suggests(state, payload) {
          state.mapSuggest = payload.suggests;
      },
      loc(state,payload)  {
          state.loc = payload.loc;
      },
      activeMarker(state,payload)  {
        state.activeMarker = payload.activeMarker;
      },
      locWarnDialog(state,payload) {
        state.locWarnDialog = payload.d;  
      }
    },
    actions: {
        updateExtent(context, payload) {
            //console.log(`Lat diff: ${payload.extent.lat.max - payload.extent.lat.min} Lon diff: ${payload.extent.lon.max - payload.extent.lon.min}`);
            var e = getNewExtent(payload.extent, context.state.extent);
            if(e && e.action && e.action == 'refresh') {
                console.log('Store: Getting new markers...');
                context.commit({ type: 'loading', loading: true });
                
               // this simple game does not require database and backend - markers are filtered here using array functions
               context.commit({ type: 'markers', markers: 
            context.state.allMarkers.filter(m => { return m.lat >= e.lat.min && m.lat <= e.lat.max 
                && m.lon >= e.lon.min && m.lon <= e.lon.max }) });
               context.commit({ type: 'extent', extent: e });
            } else if(e.action == 'delete'){
                // erase existing markers when zoomed out
                console.log('Store: Delete action triggered on markers...');
                if(context.state.markers.length > 0) {
                    console.log('Store: Deleting existing markers.');
                    context.commit({ type: 'markers', markers: [] });
                }
            }
        },

        getDetail (context, payload) {
            var id = payload.id;
            /*
            Vue.http.get(`https://ygytf5wc4e.execute-api.eu-central-1.amazonaws.com/latest/postboxes/${id}`)
            .then(response => {
                context.commit({ type: 'detail', detail: response.body });
            }, response => {
                console.log('error occured!' + JSON.stringify(response));
            });
            */
           context.commit({ type: 'detail', detail: context.state.markers.find(e => e.id == id) });
        },

        getSuggest (context, payload) {
            var input = payload.input;
            context.commit({ type: 'loading', loading: true });
            Vue.http.get(`https://api.mapy.cz/suggest/?count=5&phrase=${input}`)
            .then(response => {
                var s = response.body.result.map(i => { 
                    return {
                       //key: i.userData.id,
                       text: i.userData.suggestFirstRow + ', ' + i.userData.suggestSecondRow,
                       value: { lat: i.userData.latitude, lon: i.userData.longitude }
                    };
                   }); 
                context.commit({ type: 'suggests', suggests: s });
                context.commit({ type: 'loading', loading: false });
            }, response => {
                console.log('error occured!' + JSON.stringify(response));
                context.commit({ type: 'loading', loading: false });
            });
        },

        changeLoc (context, payload) {
            var m = context.state.markers.filter(m => { 
                /*
                console.log(`Lat diff: ${Math.abs(m.lat - payload.loc.lat)} Lon diff: ${Math.abs(m.lon - payload.loc.lon)}`);
                return Math.abs(m.lat - payload.loc.lat) < 0.0005 
                && Math.abs(m.lon - payload.loc.lon) < 0.0005
                */
               var dist = getGeolocDiff(m, payload.loc);
               console.log(`${m.id} ${dist}`);
               return dist < 50;
            });
            if(m && m != context.state.activeMarker) {
                context.commit({ type: 'activeMarker', activeMarker: m });
            }
            context.commit({ type: 'loc', loc: payload.loc });
        },

        showPanorama(context, payload) {
            var h = payload.hide;
            context.commit({ type: 'panorama', panorama: !h });
        },
        endLoading(context, payload) {
            context.commit({ type: 'loading', loading: false });
        }
    }
  });