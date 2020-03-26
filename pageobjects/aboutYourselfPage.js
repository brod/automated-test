const Common = require('./commonActions')
const EC = protractor.ExpectedConditions

class AboutYourselfPage extends Common{

    constructor(browser) {
        super()
        this.logoId = element(by.id('NPS-Module')); // 2nd option id = 'Page-1'
        this.h1Text = element(by.css('[class="sc-AykKD fHgPER"]'));
        this.stateDropdown = element(by.name('state'))
    };

    logoIdIsPresent(){
        console.log('Checking logo is present')
        return this.logoId.isPresent();
    };

    returnHeaderText(){
        console.log('Getting H1 header text')
        var text = this.h1Text.getText();
        return text;
    };

    getErrorTextWithPlaceholderField(placeholder){
        var field = element(by.xpath(`//input[@placeholder='${placeholder}']/following-sibling::span`));
        return field.getText();
    };

    fillAddressForm(obj){
        this.sendKeysWithPlaceholderField(obj.address.address1, 'Address 1');
        this.sendKeysWithPlaceholderField(obj.address.address2, 'Address 2');
        this.sendKeysWithPlaceholderField(obj.address.city, 'City');
        this.sendKeysWithPlaceholderField(obj.address.zipcode, 'Zip code');
        this.selectState(obj.address);
        this.sendKeysWithPlaceholderField(obj.contact.mobilenumber, 'Mobile phone number');
        this.sendKeysWithPlaceholderField(obj.contact.email, 'Email');
        this.enterBirthDate(obj.dob);
    };

    enterBirthDate(obj){
        this.sendKeysWithPlaceholderField(obj.month, 'MM');
        this.sendKeysWithPlaceholderField(obj.day, 'DD');
        this.sendKeysWithPlaceholderField(obj.year, 'YYYY');
    };

    selectState(obj){
        this.stateDropdown.sendKeys(obj.state);
    };

    getAboutYourselfInfoText(placeholder){
        var elem = element.all(by.xpath(`//h4[text()='${placeholder}']/..`)).last();
        return elem.getText()
    }
};

module.exports = AboutYourselfPage;