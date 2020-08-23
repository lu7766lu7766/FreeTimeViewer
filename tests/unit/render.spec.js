import { shallowMount } from '@vue/test-utils'
import FreeTimeViewer from '@/components/FreeTimeViewer.vue'
import moment from 'moment'
import plugin from '@/plugin'
import Vue from 'vue'
plugin.install(Vue)
import data from '@/data/data'

describe('FreeTimeViewer.vue', () => {
	it('renders success', () => {
		const wrapper = shallowMount(FreeTimeViewer, {
			mocks: {
				$t: (key) => key,
				moment,
			},
			propsData: {
				available: data.available,
				booked: data.booked,
			},
		})
		expect(wrapper.text()).toMatch('subTitle')
	})
})
