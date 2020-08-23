<template>
  <div class="card free-time-viewer">
    <div class="card-body">
      <div class="section-title h3">
        <span>{{ $t("title") }}</span>
      </div>
      <div class="section-body">
        <div class="schedule">
          <div>
            <div class="schedule-control-box">
              <div class="buttion-group">
                <button type="button" class="btn" @click="prevWeek()">
                  <i class="fas fa-arrow-left"></i>
                </button>
                <button type="button" class="btn" @click="nextWeek()">
                  <i class="fas fa-arrow-right"></i>
                </button>
                <span class="mr-3">
                  {{ theDateStartOfWeek.getDate() }} -
                  {{ theDateEndOfWeek.getDayOfMonth() }}
                </span>
              </div>
              <div class="label-box sub-title">
                <span>
                  <span style="color: red;">*</span> {{ $t("subTitle") }}:
                  {{ timeZone }} ({{ GMT }})</span
                >
              </div>
            </div>
            <div class="row">
              <div
                class="one-day p-1"
                v-for="(date, index) in dates"
                :key="index"
              >
                <day-viewer
                  :available="available"
                  :booked="booked"
                  :date="date"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DayViewer from './DayViewer'

export default {
  props: {
    available: {
      type: Array,
      required: true
    },
    booked: {
      type: Array,
      required: true
    }
  },
  components: {
    DayViewer
  },
  data: () => ({
    date: null,
    dates: []
  }),
  computed: {
    today() {
      return this.moment()
    },
    theDateStartOfWeek() {
      return this.moment(this.date).startOf('week')
    },
    theDateEndOfWeek() {
      return this.moment(this.date).endOf('week')
    },
    GMT() {
      const time = new Date().toString()
      return time.substr(time.indexOf('GMT'), 6) + ":00"
    },
    timeZone() {
      const time = new Date().toString()
      return time.substr(time.indexOf('(') + 1).replace(")", "")
    }
  },
  methods: {
    createWeekDays() {
      return [...Array(7).keys()].map(x => this.moment(this.theDateStartOfWeek).add(x, 'days').getDate());
    },
    setDate(date) {
      this.date = date
      this.date.getDate()
      this.dates = this.createWeekDays()
    },
    prevWeek() {
      this.setDate(this.date.subtract(1, 'weeks'))
    },
    nextWeek() {
      this.setDate(this.date.add(1, 'weeks'))
    }
  },
  mounted() {
    this.setDate(this.today)
  }
}
</script>

<style scoped lang="stylus">
.one-day
  flex 0 0 14.27%
  max-width 14.27%

.free-time-viewer
  min-height 700px

@media (min-width 576px)
  .one-day >>> .root
    padding 0.4rem

@media (max-width 576px)
  .sub-title
    font-size 0.8em
</style>
