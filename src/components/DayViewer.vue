<template>
  <div class="root">
    <div
      class="column-container"
      :class="{
        disabled: moment(date).isBefore(moment().startOf('day')),
      }"
    >
      <div class="title-box">
        <div class="at-text-center week-title">
          {{ $t("day." + thisDate.getDayOfWeek()) }}
        </div>
        <div class="at-text-center">{{ thisDate.getDayOfMonth() }}</div>
      </div>
      <div class="time-box">
        <div
          class="time-list"
          v-if="moment(date).isSameOrAfter(moment().startOf('day'))"
        >
          <div
            class="time at-text-center pt-1 pb-1"
            v-for="(time, index) in datas"
            :key="index"
            :class="{ booked: inBooked(`${thisDateTxt} ${time}`) }"
          >
            {{ time }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    available: {
      type: Array,
      required: true
    },
    booked: {
      type: Array,
      required: true
    },
    date: {
      type: String,
      required: true
    }
  },
  methods: {
    createAllTimePoint() {
      const res = []
      for (let m = 0; m < 60 * 24; m += 30) {
        res.push(this.moment(this.theTimeStartOfDay).add(m, 'minutes').getTime())
      }
      return res
    },
    inAvailable(time) {
      return this.available.some(x => this.moment(time).isBetween(x.start, x.end, null, "[]"))
    },
    inBooked(time) {
      return this.booked.some(x => this.moment(time).isBetween(x.start, x.end, null, "[]"))
    }
  },
  computed: {
    thisDate() {
      return this.moment(this.date)
    },
    thisDateTxt() {
      return this.thisDate.getDate()
    },
    theTimeStartOfDay() {
      return this.thisDate.startOf('day')
    },
    datas() {
      return this.createAllTimePoint().filter(time => this.inAvailable(`${this.thisDateTxt} ${time}`))
    }
  }
}
</script>

<style lang="stylus" scoped>
.column-container
  border-top 3px solid #02cab9

  &.disabled
    border-top 3px solid #d2d2d2

.time
  font-size 0.6em
  color #bbb

  &.booked
    font-weight bold
    color #02cab9

@media (max-width 576px)
  .week-title
    font-size 0.3em
</style>