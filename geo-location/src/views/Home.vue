<template>
  <div class="container map">
    <div class="google-map" id="map"></div>
  </div>
</template>

<script>
import { projectFirestore, projectAuth } from '@/firebase/config'

export default {
  name: 'Home',
  //latitude dan longtitude jakarta
  data() { 
    return {
    lat: -6.2,
    lng: 106.816666
  } 
  },
  methods: {
    renderMap() {
      //center(position), lat(talitude), lng(long), streetViewControl(untuk yellowman di gmap)
      const map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: this.lat , lng: this.lng },
        zoom: 6,
        maxZoom: 15,
        minZoom: 3,
        streetViewControl: false
      })

      //marker every user based on location in firestore
      projectFirestore.collection('users').get().then(users => {
        users.docs.forEach(doc => {
          let data = doc.data()

          //if data geolocation exist create marker
            if(data.geolocation) {
              let marker = new google.maps.Marker({
                position: {
                  //sesuai nama yang ada di collection(firestore).berdasarkan properti geolocation
                  lat: data.geolocation.lat,
                  lng: data.geolocation.lng
                },
                map
              })
              //add click event to marker
              marker.addListener("click", ()=> {
                //everytime use parameter in router dont forget pass in
                this.$router.push({name: 'UserProfile', params: {alias: doc.id}})
              })
            }
        })
      })
    }
  },
  mounted() {
    //get current user
    let user = projectAuth.currentUser

    //get user geo location(if support or location true)
    if(navigator.geolocation) {
      //pos(position) sebgai paramater lokasi dr current user
      navigator.geolocation.getCurrentPosition(pos => {
        //coordinat position user
        this.lat = pos.coords.latitude
        this.lng = pos.coords.longitude
        
        //find user record by uid and then update user geo coordinate(coords)(async task)
        projectFirestore.collection('users').where('user_id', '==', user.uid).get()
        .then(snapshot => {
          //ambil nilai document name collection user
          snapshot.forEach(doc=> {
            projectFirestore.collection('users').doc(doc.id).update({
              geolocation: {
                lat: pos.coords.latitude,
                lng: pos.coords.longitude
              }
            })
          })
        }).then(() => {
            //render map location after that asynchronus task complete
          this.renderMap()
        })
      },(err) => {
        console.log(err.message)
        this.renderMap()
      },{maximumAge: 180000, timeout: 3000}) //chace age(3min) and request time out
    } else {
      //position center by default value(if not support location)
      this.renderMap()
    }
  }
};
</script>

<style>
.google-map {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>