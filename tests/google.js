module.exports = {
    '@tags': ['google'],
    "Google advanced search: Elon Musk" : browser => {
        const mainQuery = "Elon Musk"

        const advancedSearchPage = browser.page.googleAdvancedSearch();
        const resultsPage = browser.page.resultsPage

        const resultsPageQuerySelector = `#searchform input[name="q"][value="${mainQuery}"]`;
        const laguageSettingSelector = `[aria-label="Search Italian pages"]`;
        const timeSettingSelector = `[aria-label="Past month"]`

        advancedSearchPage
            .navigate()
            .setQuery(mainQuery)
            .selectFilter('@languageDropdownOpener', 'lang_it')
            .selectFilter('@lastUpdateDropdownOpener', 'm')
            .search()
            .assert.urlContains('as_q=Elon+Musk', 'Query is Elon Musk')
            .assert.urlContains('lr=lang_it', 'Language is Italian')
            .assert.urlContains('as_qdr=m', 'Time period is last month')
        
        browser.assert.visible(resultsPageQuerySelector, "UI: Elon Musk is set in Query Input")
        browser.assert.visible(laguageSettingSelector, "UI: Language is set to Italian")
        browser.assert.visible(timeSettingSelector, "UI: Timeframe is set to past month")
            .saveScreenshot('tests_output/google.png')
    },
};