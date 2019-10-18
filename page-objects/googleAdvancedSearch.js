module.exports = {
  url: 'https://www.google.com/advanced_search',
  elements: {
    mainQueryInput: 'input[name="as_q"]',
    languageDropdownOpener: '#lr_button',
    languageDropdownValue: '.goog-menuitem[value="lang_it"]',
    lastUpdateDropdownOpener: '#as_qdr_button',
    lastUpdateDropdownValue: '.goog-menuitem[value="m"]',
    submitButton: '.jfk-button[type="submit"]',

  },
  commands: [{
    setQuery(value) {
      return this
        .setValue("@mainQueryInput", value);
    },
    selectFilter(selector, value) {
      return this
        .click(selector)
        .click(`.goog-menuitem[value="${value}"]`);
    },
    search() {
      return this
        .click('@submitButton')
    }
  }]
}