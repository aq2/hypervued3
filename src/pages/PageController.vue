<template lang="pug">

#main
  TheHeader
  #article
    //- todo replace with dynamic components!
    Welcome(v-if='page == 0')
      
    DataSource(v-if='page == 1')
    CSVSource(v-if='page == 2')
    // FBSource(v-if='page == 3')
    GetMetaData(v-if='page == 4')
    SaveCSVtoFB(v-if='page == 5')

    ChooseViz(v-if='page == 6')

    Pareto(v-if='page == 7')
    //- ParallelSelection(v-if='page == 8')
    ParallelController(v-if='page == 8')
    

</template>


<script>

import {EventBus} from './../main'
import TheHeader from './../header/TheHeader'
import Welcome from '../pages/Welcome'
import DataSource from './dataSources/DataSource'
import CSVSource from './dataSources/csv/CSVSource'
import GetMetaData from './dataSources/csv/GetMetaData'
import SaveCSVtoFB from './dataSources/csv/SaveCSVtoFB'
import ChooseViz from './viz/ChooseVizType'

import ParallelController from '../pages/viz/parallel/ParallelController'
import ParallelSelection from '../pages/viz/parallel/ParallelSelection'
import Pareto from '../pages/viz/pareto/Pareto'


export default {

components: {
  TheHeader,
  Welcome,
  DataSource,
  CSVSource,
  GetMetaData,
  SaveCSVtoFB,
  ChooseViz,
  ParallelSelection,
  ParallelController,
  Pareto
},  

data() {
  return {
    page: 0
  }
},

created() {
  EventBus.$on('changePage', newPage => {
    this.page = newPage
  })
}

}

</script>


<style lang="stylus" scoped>

#main 
  margin 0
  padding 0
  flex-grow 1         // expands sideways to fill

</style>
