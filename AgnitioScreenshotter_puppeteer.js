const   puppeteer = require('puppeteer'),
        fs = require("fs");

var slideList = fs.readdirSync("slides"),
    screenshotsFolder = "./screens/";

if( !fs.existsSync(screenshotsFolder) )
{
    fs.mkdir(screenshotsFolder, function() {
        console.log(screenshotsFolder + " folder has been created.")
    });
}

makeScreenshots(slideList, screenshotsFolder);

async function makeScreenshots(slideAr, screenDest) {
    const   browser = await puppeteer.launch(),
            page = await browser.newPage();

    await page.setViewport({width: 1024, height: 768});
    await page.goto('http://localhost:3000');

    /* we need to wait 2-3 sec for first slide to fully render */
    await timeout(3000);

    const executionContext = await page.mainFrame().executionContext();
    
    for(var i = 0; i < slideAr.length; i++)
    {
        var curSlide = slideAr[i];

        console.log("Going to " + curSlide + "...");
        await executionContext.evaluate(
            (slideID) => {
                window.app.goTo(slideID);
            },
            curSlide
        );

        console.log("Waiting 1sec...");
        await timeout(1000);

        var screenName = screenDest + curSlide + ".png";
        await page.screenshot({path: screenName});
    }

    browser.close();
};

/*
    this fn is needed to wait for slide to be fully rendered
    before taking screenshot with puppeteer
    - - - - - - - - - - - - - - - - - - -
    данная фукция нужна для того,
    чтобы пупетир подождал какое-то время
    после захода на страницу
    и только потом делал скриншот
*/
function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};
