//there is no need to import enzyme as the components render in the browser

import puppeteer from "puppeteer";


describe('show/hide an event details', () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 250,
            ignoreDefaultArgs: ['--disable-extensions'] //ignores default setting that causes timeout errors 
        }); //this launches the browser 
        page = await browser.newPage();
        await page.goto('http://localhost:3000/'); //this specifies what web page to navigate to

        //this method ensures that the desired element appears, before moving on
        await page.waitForSelector('.event');
      });

    afterAll(() => {
        browser.close()
    });


    //test1
    test('An event element is collapsed by default', async() =>{

    let eventDetails = await page.$('.event .event_Details');//this selects an element on the page
    expect(eventDetails).toBeNull();//this is to determine whether the element exsts or no
    })

    //test2
    test('User can expand an event to see its details', async () => {
        await page.click('.event .details-btn');
        let eventDetails = await page.$('.event .event_Details');
        expect(eventDetails).toBeDefined();
      });

    //test3
    test('User can collapse an event to hide its details', async()=>{
        await page.click('.event .details-btn');
        let eventDetails = await page.$('.event .event_Details')
        expect(eventDetails).toBeNull();
    })
});