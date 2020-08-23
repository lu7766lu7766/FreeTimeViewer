import moment from 'moment'
import 'moment-timezone'

export default {
	install(Vue, config) {
		const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
		moment.fn.getTime = function() {
			return this.tz(tz).format('HH:mm')
		}
		moment.fn.getDate = function() {
			return this.tz(tz).format('YYYY-MM-DD')
		}
		moment.fn.getDayOfWeek = function() {
			switch (Number(this.tz(tz).format('e'))) {
				case 0:
					return 'sun'
				case 1:
					return 'mon'
				case 2:
					return 'tue'
				case 3:
					return 'wed'
				case 4:
					return 'thu'
				case 5:
					return 'fri'
				case 6:
					return 'sat'
			}
		}
		moment.fn.getDayOfMonth = function() {
			return this.tz(tz).format('DD')
		}
		Vue.prototype.moment = moment
	},
}
