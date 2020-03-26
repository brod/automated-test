const JasmineConsoleReporter = require('jasmine-console-reporter');
const HtmlReporter = require('protractor-jasmine2-screenshot-reporter');

const baseTestData = require('./testdata/url');

const reporter = new HtmlReporter({
    dest: './reports',
    filename: 'html-report.html',
    reportTitle: "Exercise Test Report"
});

const reporterJasmine = new JasmineConsoleReporter({
    colors: 2,
    cleanStack: 2,
    verbosity: 4,
    listStyle: 'flat',
    activity: false
});

const init = (config) => {
    config.directConnect = true;
    return config;
}

exports.config = (function () {
    return init({
        framework: 'jasmine',
        seleniumAddress: 'localhost:3000',
        allScriptsTimeout: 60000,
        getPageTimeout: 60000,
        specs: './tests/*.spec.js',

        beforeLaunch: function () {
            console.log("Before Launch...")
            return new Promise(function (resolve) {
                reporter.beforeLaunch(resolve);
            });
        },

        onPrepare: async function () {            
            //if the tool doesn't have ng-app constiable you need to put this constible in true
            browser.ignoreSynchronization = true;
            
            browser.baseUrl = baseTestData.aboutyourself_url;
            browser.manage().window().maximize();

            jasmine.getEnv().addReporter(reporter);
            jasmine.getEnv().addReporter(reporterJasmine);

        },
        
        //Script executes after completing tests
        onComplete: async function (exitCode) {
            // In this space you can add something to do after the all test suite finished
            
            return new Promise(async function (resolve) {
                reporter.afterLaunch(resolve.bind(this, exitCode));
            });
        }
    });
})();