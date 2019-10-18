module.exports = {
    url: "",
    elements: {
        resultsPageQuery:`#searchform input[name="q"]`,
        laguageSetting:`[aria-label="Search Italian pages"]`,
        timeSetting:`[aria-label="Past month"]`
    },
    commands: [{
      resultIs: (query, message) => {
          const queryArea = `${this.resultsPageQuery}[value=${query}]`
          return this
            .assert.visible(queryArea, message)
      }
    }]
}