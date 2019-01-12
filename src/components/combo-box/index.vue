<template>
  <div class="combobox">
    <div class="combobox__label"></div>
    <input class="combobox__input" :value="searchValue" @input="_onInput($event)"/>
    <div class="combobox__suggestions" v-if="matchedSuggestions.length > 0">
      <div 
        class="combobox__suggestions__item" 
        v-for="(suggestion, index) in matchedSuggestions" 
        :key="index">
        {{suggestion}}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    suggestions: {
      type: Array,
      default: () => []
    }
  },
  model: {
    prop: 'searchValue',
    event: 'input'
  },
  data() {
    return ({
      searchValue: null,
      matchedSuggestions: []
    })
  },
  methods: {
    _onInput(e) {
      this.setSearchValue(e.target.value)
    },
    makeSuggestionsFor(text) {
      if (text) {
        this.matchedSuggestions = this.suggestions;
        // this.matchedSuggestions = this.suggestions.filter(item => item.includes(text));
      } else {
        this.matchedSuggestions = []
      }
    },
    setSearchValue(value) {
      this.searchValue = value
      this.makeSuggestionsFor(this.searchValue)
      this.notifyChange()
    },
    notifyChange() {
      this.$emit('input', this.searchValue)
    }
  }
}
</script>
