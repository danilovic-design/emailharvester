//const targetURL = "http://127.0.0.1:5500";

const info = (message) => {
  console.log(`[+] ${message}`);
};

const getDomainName = (fullUrl) => {
  let myUrl = new URL(fullUrl);
  return myUrl.hostname;
};

const getURL = (harvestedURL) => {
  let targetURL = process.argv.slice(2);
  if (harvestedURL.startsWith("/") || harvestedURL === "") {
    let relativePath = harvestedURL;
    return targetURL + relativePath;
  } else if (!harvestedURL.startsWith("http")) {
    return targetURL + "/" + harvestedURL;
  } else {
    if (getDomainName(targetURL) === getDomainName(harvestedURL)) {
      let absolutePath = harvestedURL;
      return absolutePath;
    } else if (
      getDomainName(harvestedURL) === "localhost" ||
      getDomainName(harvestedURL) === "127.0.0.1"
    ) {
      let absolutePath = harvestedURL;
      return absolutePath;
    } else {
      info(`Out of scope call stopped! (${harvestedURL})`);
      let absolutePath = targetURL;
      return absolutePath;
    }
  }
};

module.exports.info = info;
module.exports.getURL = getURL;
