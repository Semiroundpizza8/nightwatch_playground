module.exports = {
    '@tags': ['google'],
    "Google advanced search: Elon Musk" : browser => {
        const mainQuery = "Elon Musk"

        const mainQueryInputSelector = 'input[name="as_q"]'
        const lrButtonSelector = '#lr_button'
        const lrValueSelector = '.goog-menuitem[value="lang_it"]'
        const lastDDSelector = '#as_qdr_button'
        const lastValueSelector = '.goog-menuitem[value="m"]'
        const submitSelector = '.jfk-button[type="submit"]'
        const resultsPageQuerySelector = `#searchform input[name="q"][value="${mainQuery}"]`
        const laguageSettingSelector = `[aria-label="Search Italian pages"]`
        const timeSettingSelector = `[aria-label="Past month"]`

        browser
            .url('https://www.google.com/advanced_search')
            .setValue(mainQueryInputSelector, mainQuery)
            .click(lrButtonSelector)
            .click(lrValueSelector)
            .click(lastDDSelector)
            .click(lastValueSelector)
            .click(submitSelector)
            .assert.urlContains('as_q=Elon+Musk', 'Query is Elon Musk')
            .assert.urlContains('lr=lang_it', 'Language is Italian')
            .assert.urlContains('as_qdr=m', 'Time period is last month')
        
        browser.assert.visible(resultsPageQuerySelector, "UI: Elon Musk is set in Query Input")
        browser.assert.visible(laguageSettingSelector, "UI: Language is set to Italian")
        browser.assert.visible(timeSettingSelector, "UI: Timeframe is set to past month")
            .saveScreenshot('tests_output/google.png')
    },
};