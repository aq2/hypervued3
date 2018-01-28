<template lang="pug">
  
  component(v-bind:is='comp2show')


</template>


<script>

import ParallelSelection from '../parallel/ParallelSelection.vue'

export default {
  components: {
    ParallelSelection
  },
  data() {
    return {
      comp2show: 'ParallelSelection'
    }
  }
}
</script>


// button in selection emits event
// this component listems and changes comp2show
// fuckin simple
// could redo page controller