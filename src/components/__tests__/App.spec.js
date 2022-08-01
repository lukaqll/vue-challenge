import { describe, it, expect } from 'vitest'

import { mount, shallow } from '@vue/test-utils'
import App from '../../App.vue'

describe('App', () => {
  it('renders properly', () => {
    const wrapper = shallow(App, { propsData: { msg: 'Hello Vitest' } })
    expect(wrapper.isVueInstance()).toBeTruthy(   )
  })
})
