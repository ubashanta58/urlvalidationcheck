const fs = require("fs");
const csv = require("csv-parser");
var validUrl = require('valid-url');
const updatedValidUrl = [];

/**
 * I have inserted title
 * @param {string} str
 * @returns
 */
function validationChecker(str) {
  let returnVal = false;
  if (
    !str ||
    str.length === 0 ||
    str.includes("https://") ||
    str.includes("https://www") ||
    str.includes("http://")
  ) {
    returnVal = true;
  }
  return returnVal;
}

/**
 *
 * @param {string} str
 * @returns
 */
function makeValidUrl(str) {
  let correctURL = new String("");
  if (
    !str.includes("www") &&
    !str.includes("https://") &&
    !str.includes("https://www.") &&
    !str.includes("http://")
  ) {
    correctURL = "https://www." + str;
  } else {
    correctURL = "https://" + str;
  }

  return correctURL;
}

/**
 * 
 * @param {string} str 
 * @returns 
 */
function validUrlChecker(str){
    let returnUrl = false;
    if(validUrl.isUri(str)){
        returnUrl = true;
    }
    return returnUrl;
}

/**
 * writeFileToCSV
 */
function writeToCSVFile() {
  const fileName = "updated-websites-URL.csv";
  fs.writeFile(fileName, extractAsCSV(), (err) => {
    if (err) {
      console.log("Error writing to CSV file", err);
    } else {
      console.log(`saved as ${fileName}`);
    }
  });
}

/**
 *
 * @returns concat header and updated URL with "\n"
 */
function extractAsCSV() {
  const header = ["Updated Valid Url"];
  return header.concat(updatedValidUrl).join("\n");
}

/**
 * read CSV file and on data check the validation and update, on end write file to CSV
 */
fs.createReadStream("business.csv")
  .pipe(csv())
  .on("data", (row) => {
    if (!validationChecker(row.website)) {
      var validWebsite = makeValidUrl(row.website);
    }
    validUrlChecker(validWebsite);
    updatedValidUrl.push(validWebsite);
  })
  .on("end", () => {
    writeToCSVFile();
  });
