import { mount } from '@vue/test-utils'
import ComboBox from '@/components/combo-box'

describe('ComboBox', () => {
  let component
  let properties = {
    inputValue: null,
    suggestions: []
  }

  const wraperComponent = props => ({
    data: () => props,
    components: {
      ComboBox
    },
    template: `
      <div>
        <ComboBox v-model="inputValue" :sugesstions="suggestions"></ComboBox>
      </div>
    `
  })

  const setupComponent = props => {
    return mount(wraperComponent(props))
  }

  beforeEach(() => {
    component = setupComponent(properties)
  })

  describe('label', () => {
    it('should exist', () => {
      const renderedLabel = component.find('.combobox__label')
      expect(renderedLabel.exists()).toBeTruthy()
    })
  })

  describe('input', () => {
    it('should exist', () => {
      const renderedInput = component.find('.combobox__input')
      expect(renderedInput.exists()).toBeTruthy()
    })
    it('should be editable', () => {
      const renderedInput = component.find('.combobox__input')
      expect(renderedInput.is('input')).toBeTruthy()
      expect(renderedInput.attributes('disabled')).toBeFalsy()
    })
    it('should relect input to its model', () => {
      const renderedInput = component.find('.combobox__input')
      const TEXT = 'some text'

      renderedInput.setValue(TEXT)

      expect(properties.inputValue).toBe(TEXT)
    })
  })

  describe('suggestions', () => {
    let renderedInput, renderedSuggestions
    beforeEach(() => {
      renderedInput = component.find('.combobox__input')
      renderedSuggestions = component.find('.combobox__suggestions')
    })
    it('should not exist when input is empty', () => {
      const SEARH_TEXT = ''
      renderedInput.setValue(SEARH_TEXT)
      renderedSuggestions = component.find('.combobox__suggestions')
      expect(renderedSuggestions.exists()).toBeFalsy()
    })
    it('should exist when input is not empty', () => {
      const SEARH_TEXT = 'ty'
      renderedInput.setValue(SEARH_TEXT)
      renderedSuggestions = component.find('.combobox__suggestions')
      expect(renderedSuggestions.exists()).toBeTruthy()
    })
    it('should show correct suggestions', () => {
      properties.suggestions = ['type', 'something', 'type something', 'typppe', 'nananan']
      const SEARH_TEXT = 'ty'
      const EXPECTED_SUGGESTIONS = ['type', 'type something', 'typppe']
      renderedInput.setValue(SEARH_TEXT)
      console.log(component.findAll('.combobox__suggestions__item').wrappers[0].html())
      const renderedSuggestionItenmValues = component.findAll('.combobox__suggestions__item').wrappers.map(item => item.text())
      expect(renderedSuggestionItenmValues).toBe(EXPECTED_SUGGESTIONS)
    })
    // it('should populate value to input when selected', () => {})
  })
})
