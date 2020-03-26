var contactData = require('../testdata/contact')
var EC = protractor.ExpectedConditions;

var AboutYourselfPage = require('../pageobjects/aboutYourselfPage')
var aboutYourself = new AboutYourselfPage()

describe('Testing "About Yourself" form', function() {

    beforeAll(() => {
        aboutYourself.goToUrl(browser.baseUrl);
        browser.wait(EC.urlContains(browser.baseUrl));
        browser.getTitle().then((title) => {
            expect(title).toEqual("React App")
        })
    })

    afterAll(async() => {
        // Adding this so we can see the final landing page of test. Typically we add teardown method
        browser.sleep(5000)
    })

    it(`page loads and logo appears successfully`, () => {
        expect(aboutYourself.logoIdIsPresent()).toBe(true);
    })

    it(`header text appears`, () => {
        expect(aboutYourself.returnHeaderText()).toBe('Tell us about yourself');
    })

    it(`correct field error validation appears`, () => {
        aboutYourself.clickButtonWithText('Submit')
        expect(aboutYourself.getErrorTextWithPlaceholderField(
            'Address 1',
            'City',
            'Zip code',
            'Mobile phone number',
            'Email'
            )
        ).toBe(
            'Please enter a valid address 1.',
            'Please enter a valid city.',
            'Please enter a zip code.',
            'Please enter a valid mobile phone number.',
            'Please enter a valid email.'
        );

        expect(aboutYourself.textIsPresent(
            'Please enter a valid state.',
            'Please enter a valid date of birth.'
        ));
    })

    it(`submit valid form takes user to confirmation page`, async () => {
        aboutYourself.fillAddressForm(contactData)
        aboutYourself.clickButtonWithText('Submit')
        expect(aboutYourself.getAboutYourselfInfoText(
            'Address 1',
            'Address 2',
            'City',
            'State',
            'Zip Code',
            'Phone',
            'Email',
            'Dob Month',
            'Dob Day',
            'Dob Year'
            )
        ).toContain(
            contactData.address.address1,
            contactData.address.address2,
            contactData.address.city,
            contactData.address.state,
            contactData.address.zipcode,
            contactData.contact.mobilenumber,
            contactData.contact.email,
            contactData.dob.month,
            contactData.dob.day,
            contactData.dob.year
        );
    })

    it(`clicking continue successfully submit form`, () => {
        aboutYourself.clickButtonWithText('Continue');
        expect(aboutYourself.returnHeaderText()).toBe('Success!');
        // Add check to verify data was submitted. API endpoint possible?
    });

    it(`user able to start over`, () => {
        aboutYourself.clickButtonWithText('Start over');
        expect(aboutYourself.returnHeaderText()).toBe('Tell us about yourself');
    });
})
