<template lang="pug">

#main
  TheHeader
  #page
    h1 Welcome to HyperDViz
    .v
    
    icon(name='bar-chart' scale=8)
    icon(name='area-chart' scale=8)
    icon(name='line-chart' scale=8)
    icon(name='pie-chart' scale=7)
    .v

    #text
      p It's better to run this app in full-screen mode, either:
      ul
        li toggled with F11, or 
        
        li with the 
          span(id='restore')
            icon(name='window-restore' scale=1.25)
          | button at top-right
        
        li or the nice big button below
          .v2
          button(@click='fullScreen') let's go fullscreen
      
      p press the 'next page' button below to continue
    .v

    VLink(href='/datasource' class='throb') next page


</template>


<script>

import {EventBus} from './../main'
import VLink from './../components/VLink'
import TheHeader from './../header/TheHeader'

export default {

components: {
  VLink, TheHeader
},


methods: {
  nextPage() {
    EventBus.$emit('changePage', 1)
  },

  fullScreen() {
    EventBus.$emit('fullScreen')
  }
}

}

</script>


// <style lang="stylus">
// * 
//   box-sizing border-box
//   user-select none
//   outline none

// html
//   height 100%
//   // background green
//   background $g5
  

// body 
//   margin 0
//   padding 0
//   color #121
//   height 100%
//   background $g5
//   font-size 1.15em
//   font-family Ubuntu, Helvetica, Arial, sans-serif

// #app 
//   display flex        // sidebar 'fixed', #main grows
//   background $g4
//   height 100%
// </style>



<style lang="stylus" scoped>

#restore
  margin 0 0.25rem 0 0.15rem

li 
  margin-bottom 0.5rem

.v2
  height .5rem

</style>
