import puppeteer from 'puppeteer';
import fs from 'fs';
const dataAll = [];

async function fbDetails(usernames) {
    const browser = await puppeteer.launch({headless: false});
    try {
        for (const username of usernames) {
            const page = await browser.newPage();
            let url = '';
            if (typeof username === "number") {
                url = `https://www.facebook.com/profile.php?id=${username}`;
            } else if (typeof username === "string") {
                url = `https://www.facebook.com/${username}`;
            } else {
                console.error("Invalid username type.");
                continue; // Move to the next iteration
            }

            await page.goto(url);
            await page.waitForFunction(() => {
                return document.evaluate("/html/body/div[1]/div/div[1]/div/div[5]/div/div/div[1]/div/div[2]/div/div/div/div[2]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue !== null;
            });

            const result = await page.evaluate(() => {
                const mainPath = "/html/body/div[1]/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div/div/div[4]/div[2]/div/div[1]/div[2]/div/div[1]/div/div/div/div/div[2]/div[2]/div/ul/";
                const elements = document.evaluate(`${mainPath}div`, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                const data = {};
                for (let i = 0; i < elements.snapshotLength; i++) {
                    const element = elements.snapshotItem(i);
                    data[i] = element ? element.textContent.trim() : "Element not found";
                }
                data.url = window.location.href;
                return data;
            });
            dataAll.push(result);

            await page.close();
        }
    } catch (error) {
        console.error("Error occurred:", error);
    } finally {
        await browser.close();
    }
    // console.log(dataAll);
     // Write data to file
     const fileName = 'output.json';
     fs.writeFileSync(fileName, JSON.stringify(dataAll, null, 2));
     console.log(`Data has been written to ${fileName}`);
}

fbDetails(['weddingsbymichellelouise', 'knobcreekmeadowsvenue', 'softechphotography', 'carlagatesphotography', 'sweetdreamsphotographyuk', 'elainebolesphotography', 'christopherlewisphotography','helenesimpsonphotography','sweetdreamsphotographyuk','boglarkabirophoto','Capturedbyemma','elainebolesphotography','christopherlewisphotography','Julesfortunephotography','weddingsbymichellelouise','Theliverpoolweddingphotographer','JeffLandPhotography','damianburcherphotographer','SMHPhotography.Cheshire','ohdeerportraits','pryor1966','KimCravenPhotography','1919photography','AmandaLeePhotographsbyALMcBride','carlagatesphotography','profile.php?id=100089832105364','HeatherKayePhotograhy','photographybykaseyduvall'
]); // Pass an array of usernames
