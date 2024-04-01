import puppeteer from 'puppeteer';
import fs from 'fs';

async function fbDetails(usernames) {
    const browser = await puppeteer.launch({headless:false});

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
                const mainPath = "/html/body/div[1]/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div/div/div[4] /div[2]/div/div[1]/div[2]/div/div[1]/div/div/div/div/div[2]/div[2]/div/ul/";
                const elements = document.evaluate(`${mainPath}div`, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                const data = {};
                for (let i = 0; i < elements.snapshotLength; i++) {
                    const element = elements.snapshotItem(i);
                    data[i] = element ? element.textContent.trim() : "Element not found";
                }
                data.url = window.location.href;
                return data;
            });

            // Write data to file
            const fileName = 'output.json';
            let existingData = [];
            try {
                if (fs.existsSync(fileName)) {
                    existingData = JSON.parse(fs.readFileSync(fileName));
                }
            } catch (err) {
                console.error("Error reading existing data:", err);
            }

            // Merge existing data with new data
            const mergedData = existingData.concat([result]);

            // Write merged data back to file
            fs.writeFileSync(fileName, JSON.stringify(mergedData, null, 2));
            console.log(`Data has been Added ${url}`);

            await page.close();
        }
    } catch (error) {
        console.error("Error occurred:", error);
    } finally {
        await browser.close();
    }
}

fbDetails([100084845875280, 61553161029750, 61557759571804, 100089832105364, 100084168641312]); // Pass an array of usernames
