<template lang="pug">

#main
  TheHeader
  #page
    h1 Choose a dataset
    .v
    icon(name='database' scale=8)
    .h
    icon(name='upload' scale=8)
    .h
    icon(name='tasks' scale=8)
    .v
    
    #text
      p First, you need to get some data.
      p Either by uploading a CSV file from your computer,
      p or you can pick from an exciting range of sources.
    .v
    
    #links
      button(id='csv' @click="nextPage(2)")
        icon(name='folder-open' scale=4)
        p get data from CSV file
      .h
      button(id='firebase')
        icon(name='cloud' scale=4)
        p get data from firebase
 
  
</template>


<script>

import {EventBus} from './../../main'
import TheHeader from './../../header/TheHeader'

export default {

components: {
  TheHeader
},

methods: {

  nextPage(newPage) {
    EventBus.$emit('changePage', newPage)
  }

}

}
</script>


<style lang="stylus" scoped>

#links
  width 600px

button
  width 275px

#firebase
  background $g3


</style>
