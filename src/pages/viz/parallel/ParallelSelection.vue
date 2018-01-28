<template lang="pug">

#page
  h1 Choose Candidates
  .v
  icon(name='check-square-o' scale=8)


  #text
    p <b>Select candidates to include in the plot.</b>
    p The plot can get cluttered, so you may not want to view them all.
    p Here you can specify a subset.
  .v

  #links
    button(id='all')
      icon(name='arrows-v' scale=4)
      p select all
    .h
    button(id='manual')
      icon(name='check-square-o' scale=4)
      p manual checkbox selection
    .v
    button(id='front')
      icon(name='users' scale=4)
      p pareto front peers
    .h
    button(id='frac')
      icon(name='percent' scale=4)
      p fractional selection

</template>


<style lang="stylus" scoped>

#links
  width 600px

button
  width 275px
  padding 1rem
  

</style>
