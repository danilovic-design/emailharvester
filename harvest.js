const axios = require("axios").default;
const cheerio = require("cheerio");
const scraper = require("./parse").scraper;
const getAnchorTags = require("./parse").getAnchorTags;
const getScripts = require("./parse").getScripts;
const info = require("./functions").info;
const getURL = require("./functions").getURL;
let visitedPages = {};

const registerAsVisited = (url) => {
  visitedPages[getURL(url)] = true;
};

const crawler = async (url) => {
  if (!url) {
    url = "";
  }
  registerAsVisited(url);

  try {
    info("----------------------");
    info(`Scraping URL: ${url}`);
    info("HTTP call to: " + getURL(url) + "\n");
    let htmlData = await axios.get(getURL(url));
    if (htmlData.data) {
      const $ = cheerio.load(htmlData.data);
      scraper($.text(), url);

      const links = getAnchorTags($);
      let scriptSources = getScripts($);

      scriptSources.forEach((src) => {
        src = "/" + src;
        links.push(src);
      });

      links.forEach((link) => {
        if (!visitedPages[getURL(link)]) {
          crawler(link);
        }
      });
    }
  } catch (error) {
    info("An error happened, code", error.code);
  }
};

crawler();
