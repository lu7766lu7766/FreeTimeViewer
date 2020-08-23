<template>
  <div id="container-fluid">
    <div class="row">
      <div class="col-sm-12 col-md-5">
        <free-time-viewer :available="data.available" :booked="data.booked" />
      </div>
    </div>
  </div>
</template>

<script>
import FreeTimeViewer from './components/FreeTimeViewer.vue'
import data from './data/data'

export default {
  components: {
    FreeTimeViewer
  },
  data: () => ({
    data
  })
}
</script>

<style lang="stylus"></style>
