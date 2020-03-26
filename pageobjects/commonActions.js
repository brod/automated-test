/* 
Base class shared across all pageobjects. Add method for things that is repeatative accross application under test
*/


class Common {

    goToUrl(url){
        console.log(`Navigating to ${url}`) 
        browser.get(url)
    }

    sendKeysWithPlaceholderField(text, placeholder){
        console.log(`Typing ${text} to ${placeholder} field`)
        var elem = element(by.css(`[placeholder='${placeholder}']`))
        elem.sendKeys(text)
    }

    clickButtonWithText(text){
        var button = element(by.buttonText(text))
        button.click()
    }

    textIsPresent(text){
        // Use only if text is unique. Use as last resort
        var text = element(by.xpath(`//*[text()="${text}"]`))
        return text.isPresent()
    }
};

module.exports = Common;