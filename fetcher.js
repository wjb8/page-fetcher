const args = process.argv.slice(2);
const request = require('request');
const fs = require('fs');

const requestPage = function(functionToRunAfter) {
  
  request(args[0], (error, response, body) => {
    if (error) {
      throw new Error(`error`);
    }
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    functionToRunAfter(body);
  });

};

const writeFile = function(content) {

  fs.writeFile(args[1], content, (error) => {
    
    if (error) {
      throw new Error(`error`);
    }

    const stats = fs.statSync(args[1]);
    const bytes = stats.size;

    console.log(`Downloaded ${bytes} bytes and saved to ${args[1]}`);
  });

};

requestPage(writeFile);