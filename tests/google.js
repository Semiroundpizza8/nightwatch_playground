module.exports = {
    '@tags': ['google'],
    "Google advanced search: Elon Musk" : browser => {
        const mainQuery = "Elon Musk"

        const advancedSearchPage = browser.page.googleAdvancedSearch();
        const resultsPage = browser.page.resultsPage();


        advancedSearchPage
            .navigate()
            .setQuery(mainQuery)
            .selectFilter('@languageDropdownOpener', 'lang_it')
            .selectFilter('@lastUpdateDropdownOpener', 'm')
            .search()
            .assert.urlContains('as_q=Elon+Musk', 'Query is Elon Musk')
            .assert.urlContains('lr=lang_it', 'Language is Italian')
            .assert.urlContains('as_qdr=m', 'Time period is last month')
        
        resultsPage
            .assert.visible("@resultsPageQuery", "UI: Elon Musk is set in Query Input")
            .assert.visible("@laguageSetting", "UI: Language is set to Italian")
            .assert.visible("@timeSetting", "UI: Timeframe is set to past month")
            .saveScreenshot('tests_output/google.png')
    },
};