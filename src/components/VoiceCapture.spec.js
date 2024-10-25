import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import VoiceCapture from '@/components/VoiceCapture.vue'

describe('VoiceCapture', () => {
  it('renders content', () => {
    const wrapper = mount(VoiceCapture)

    expect(wrapper).toBeFalsy()
  })
})
