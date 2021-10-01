const fs = require('fs');
const csv = require("csv-parser");
const urlExists = require('url-exists');
const http = require('http');
const existsUrl = [];

function urlObj(str)  {
    let h = {}
    if(! str ||str.length === 0){
        return false;
    }else{
        h = {
            urlString: str,
        }
    }
    return h;
}

/**
 * writeFileToCSV
 */
 function writeToCSVFile() {
    const fileName = "exists-URL.csv";
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
    const header = ["ExistsUrl"];
    return header.concat(existsUrl).join("\n");
  }

fs.createReadStream("updated-websites-URL.csv")
  .pipe(csv())
  .on("data", (row) => {
    let url = row.UpdatedUrl;
    if(urlObj(url)){
        urlExists(url, function(err, exists){
          let foundUrl = "";
          if(err) throw err;
          if(exists){
              foundUrl = url;
              existsUrl.push(foundUrl);     
              console.table(existsUrl);         
          }
      })
        
    }
    
  })
  .on("end", () => {
    console.table(existsUrl);
    writeToCSVFile();
  });
