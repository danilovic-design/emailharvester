const path = require("path");
const info = require("./functions").info;

const saveEmails = require("./filesave");

const getEmailsFromHtml = (htmlText) => {
  if (htmlText.includes("@")) {
    let pageText = htmlText.trim();
    pageText = pageText.replace(/\n/g, " ");
    pageText = pageText.replace(/\t/g, " ");
    pageText = pageText.replace(/\s+/g, " ");
    let pageWords = pageText.split(" ");
    pageWords.forEach((word) => {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(word)) {
        info(`New email saved: ${word}`);
        saveEmails(word);
      }
    });
  }
};

const getEmailsFromScript = (scriptText) => {
  if (scriptText.includes("@")) {
    let pageText = scriptText.trim();
    pageText = pageText.replace(/\n/g, " ");
    pageText = pageText.replace(/\t/g, " ");
    pageText = pageText.replace(/\s+/g, " ");
    pageText = pageText.replace(/[\{\}\(\)\"\']+/g, " ");
    let pageWords = pageText.split(" ");
    pageWords.forEach((word) => {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(word)) {
        saveEmails(word);
      }
    });
  }
};

const getAnchorTags = ($) => {
  return $("a")
    .map((index, tag) => {
      return tag.attribs.href;
    })
    .get();
};

const getScripts = ($) => {
  return $("script")
    .map((index, tag) => {
      return tag.attribs.src;
    })
    .get();
};

const scraper = (text, url) => {
  let ext = path.extname(url).replace(".", "");
  if (ext === "js") {
    return getEmailsFromScript(text);
  }

  if (ext === "html" || ext === "htm" || ext === "php" || ext === "php5") {
    return getEmailsFromHtml(text);
  }
};

module.exports.getAnchorTags = getAnchorTags;
module.exports.getScripts = getScripts;
module.exports.scraper = scraper;
