<template lang="pug">
  
#page
  h1 Manual Candidate Selection
  Initialize
  


</template>

<script>

// need to get candiData from store
// sort candIDs alpha
// put initial caps into a set

import Initialize from './Initialize'

export default {
  components: {
    Initialize
  },
  computed: {
    candiData() {
      return this.$store.getters.getCandiData
    }
  },

  methods: {
    
  },

  mounted() {
    // this.main()
  }
}
</script>

