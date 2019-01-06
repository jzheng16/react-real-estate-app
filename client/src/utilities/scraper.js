const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");

// DEFINING FUNCTION TO _______
const scrapeDataFromFSBO = (city, state) => {
  const urlBase = "https://www.forsalebyowner.com/search/list/";
  // USE A SPLIT-JOIN METHOD TO PROPERLY HANDLE CITIES WITH MULTIPLE WORDS
  city = city.split(" ").join("-");
  state = state.split(" ").join("-");
  const scrapeUrl = `${urlBase}${city}-${state}`;
  console.log(scrapeUrl);

  // request is a function which comes from the request module
  request(scrapeUrl, function (err, response, html) {

    fs.writeFileSync("./filename.html", html);
    const $ = cheerio.load(html);

    const myTitle = $("h1.hdg").text()

    const propertyList = $("ol.vList li").each(function (i, elem) {
      // ADDRESS 
      let locationSpans = $(this).find('div.estateSummary-address span')
      let streetAddress = $(locationSpans[0]).text()
      let city = $(locationSpans[1]).text()
      let state = $(locationSpans[2]).text()
      let zipCode = $(locationSpans[3]).text()

      // PRICE 
      let price = $(this).find("div.estateSummary-price").text()

      // SUMMARY 
      let summaries = $(this).find("div.estateSummary-list")
      let roomsCount = $(summaries[0]).text().replace(/\s/g, "");
      let size = $(summaries[1]).text().replace(/\s/g, "");

      //IMAGE 
      let imageURL = $(this).find("div.imgBkgrd").attr("style")

      if (imageURL) {
        // imageURL = imageURL.slice(23) 
        imageURL = imageURL.slice(23, imageURL.length - 2)
      }

      console.log(` 
      Listing: ${i + 1}
      Street: ${streetAddress}
      City: ${city} 
      State: ${state} 
      Zip Code: ${zipCode} 
      Price: ${price} 
      Rooms: ${roomsCount} 
      Size: ${size} 
      ImageURL: ${imageURL}
      `)
      console.log('\n')
    })

    console.log(myTitle)

  });
};

// www.forsalebyowner.com/search/list/beverly-hills-california
// https://www.craigslist.org/tampa-fl/
// TESTING BY USING FUNCTION
scrapeDataFromFSBO("beverly hills", "california");