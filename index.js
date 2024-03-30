import puppeteer from 'puppeteer';

async function fbDetails(url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    try {
        await page.goto(url);

        // Wait until the element specified by the XPath expression is found
        await page.waitForFunction(() => {
            return document.evaluate("/html/body/div[1]/div/div[1]/div/div[5]/div/div/div[1]/div/div[2]/div/div/div/div[2]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue !== null;
        });

        // Now, locate the element using the XPath expression
        const pageCategory = await page.evaluate(() => {
            const element = document.evaluate("/html/body/div[1]/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div/div/div[4]/div[2]/div/div[1]/div[2]/div/div[1]/div/div/div/div/div[2]/div[2]/div/ul/div[1]/div[2]/div/div/div/span/div/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            return element ? element.textContent.trim() : "pageCategory Element not found";
        });
        const countryName = await page.evaluate(() => {
            const element = document.evaluate("/html/body/div[1]/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div/div/div[4]/div[2]/div/div[1]/div[2]/div/div[1]/div/div/div/div/div[2]/div[2]/div/ul/div[2]/div[2]/div/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            return element ? element.textContent.trim() : "countryName Element not found";
        });
        const phoneNumber = await page.evaluate(() => {
            const element = document.evaluate("/html/body/div[1]/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div/div/div[4]/div[2]/div/div[1]/div[2]/div/div[1]/div/div/div/div/div[2]/div[2]/div/ul/div[3]/div[2]/div/div/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            return element ? element.textContent.trim() : "phoneNumber Element not found";
        });
        const pageEmail = await page.evaluate(() => {
            const element = document.evaluate("/html/body/div[1]/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div/div/div[4]/div[2]/div/div[1]/div[2]/div/div[1]/div/div/div/div/div[2]/div[2]/div/ul/div[4]/div[2]/div/div/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            return element ? element.textContent.trim() : "pageEmail Element not found";
        });
        const website = await page.evaluate(() => {
            const element = document.evaluate("/html/body/div[1]/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div/div/div[4]/div[2]/div/div[1]/div[2]/div/div[1]/div/div/div/div/div[2]/div[2]/div/ul/div[6]/div[2]/div/a/div/div/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            return element ? element.textContent.trim() : "website Element not found";
        });
        const otherSocialAcc = await page.evaluate(() => {
            const element = document.evaluate("/html/body/div[1]/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div/div/div[4]/div[2]/div/div[1]/div[2]/div/div[1]/div/div/div/div/div[2]/div[2]/div/ul/div[5]/div[2]/div/div/span/a", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            return element ? element.textContent.trim() : "otherSocialAcc Element not found";
        });

        const officeOpenOrClose = await page.evaluate(() => {
            const element = document.evaluate("/html/body/div[1]/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div/div/div[4]/div[2]/div/div[1]/div[2]/div/div[1]/div/div/div/div/div[2]/div[2]/div/ul/div[7]/div[2]/div/div/span[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            return element ? element.textContent.trim() : "officeOpenOrClose Element not found";
        });
        const rating = await page.evaluate(() => {
            const element = document.evaluate("/html/body/div[1]/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div/div/div[4]/div[2]/div/div[1]/div[2]/div/div[1]/div/div/div/div/div[2]/div[2]/div/ul/div[8]/div[2]/a/div/div/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            return element ? element.textContent.trim() : "rating Element not found";
        });




console.log(pageCategory, countryName, phoneNumber, pageEmail, website, otherSocialAcc, officeOpenOrClose, rating);




    } catch (error) {
        console.error("Error occurred:", error);
    } finally {
        await browser.close();
    }
}

fbDetails('https://www.facebook.com/StreetPhotographyYT');