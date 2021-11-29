//there is no need to import enzyme as the components render in the browser

import puppeteer from "puppeteer";


describe('show/hide an event details', () => {

    beforeAll(async () => {
        jest.setTimeout(30000);
    });

    //test1
    test('An event element is collapsed by default', async() =>{
        let browser = await puppeteer.launch(); //this first launches the browser

        let page = await browser.newPage(); //instructs the browser to open a new page
        await page.goto('http://localhost:3000/'); //instructs the browser to open the test in the speciifed link

        await page.waitForSelector('.event');

        //Puppeteer provides the method page.$() for selecting an element on the page. 
        let eventDetails = await page.$('.event .eventDetails');
        expect(eventDetails).toBeNull();
        browser.close();
    });

    //test2
    test('User can expand an event to see its details', async () => {
        let browser = await puppeteer.launch();
        let page = await browser.newPage();
        await page.goto('http://localhost:3000/');
    
        await page.waitForSelector('.event');
        await page.click('.event .showDetails');
    
        let eventDetails = await page.$('.event .event__Details');
        expect(eventDetails).toBeDefined();
        browser.close();
      });

      //test3
      test('User can collapse an event to hide its details', async () => {
        let browser = await puppeteer.launch();
        let page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        await page.click('.event .showDetails');
        const eventDetails = await page.$('.event .event__Details');
        expect(eventDetails).toBeNull();
        browser.close();
      });
});