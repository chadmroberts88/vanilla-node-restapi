const fs = require('fs')

const writeDataToFile = (filename, content) => {

  console.log(filename);

  fs.writeFileSync(filename, JSON.stringify(content, null, 2), 'utf8', (error) => {
    if (error) {
      console.log(error)
    }
  })
};

const getPostData = (req) => {
  return new Promise((resolve, reject) => {

    try {
      let body = '';

      req.on('data', (chunk) => {
        body += chunk.toString('utf8');
      })

      req.on('end', () => {
        resolve(body);
      })

    } catch (error) {
      reject(error);
    }

  })
}

module.exports = {
  writeDataToFile,
  getPostData
}