const fs = require('fs');
const csv = require('csv-parser');
const updatedWebsiteURL = [];

/**
 * 
 * @param {string} str 
 * @returns 
 */
function validationChecker(str){
    if(!str || str.length === 0 || str.includes('https://') || str.includes('https://www') || str.includes('http://')){
        return false;
    }else {
        return true;
    }
}

/**
 * 
 * @param {string} str 
 * @returns 
 */
function makeValidUrl(str){
    let correctURL = new String("");
    if(!str.includes('www') && !str.includes('https://') && !str.includes('https://www.') && !str.includes('http://')){
        correctURL = 'https://www.' + str;
    }else {
        correctURL = 'https://' + str;
    }
    
    return correctURL;
}

/**
 * writeFileToCSV 
 */
function writeToCSVFile(){
    const fileName = 'updated-websites-URL.csv'
    fs.writeFile(fileName, extractAsCSV(), err => {
        if(err){
            console.log('Error writing to CSV file', err);
        } else {
            console.log(`saved as ${fileName}`);
        }
    })
}

/**
 * 
 * @returns concat header and updated URL with "\n"
 */
function extractAsCSV(){
    const header = ['Updated Url'];
    return header.concat(updatedWebsiteURL).join("\n");
}

/**
 * read CSV file and on data check the validation and update, on end write file to CSV
 */
fs.createReadStream('business.csv').pipe(csv()).on('data', (row) => {
    if(validationChecker(row.website)){
       row.website =  makeValidUrl(row.website);
       updatedWebsiteURL.push(row.website);
    }
}).on('end', () => {
    writeToCSVFile();
})