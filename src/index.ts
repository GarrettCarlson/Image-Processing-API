import express from 'express';
import checkFile from './utils/checkFile';
import genFileName from './utils/newImageName';
import resizeImage from './utils/resizeImage';

const app = express();
const port = 3000;

//app.use(express.static(path.resolve('./api/')));
app.use(express.static('api'));

// use a route handler to parse the parameters passed for resizing the image
app.get('/api/images', (req, res) => {
  const originalFileName = req.query.filename as string;
  const height = parseInt(req.query.height as string) as number;
  const width = parseInt(req.query.width as string) as number;

  // check if the file requested exists on the server
  const fileExist = checkFile(originalFileName, './api/full/');

  // check if the file has already been resized to the requested dimensions
  const resizedFileName = genFileName(originalFileName, height, width);
  const newFileExist = checkFile(resizedFileName, './api/thumb/');

  // Send error if the file does not exist
  if (!fileExist) {
    res.send(`Error: Image requested ${originalFileName} does not exist.`);
  }
  // display the resized image if it has already been created
  else if (newFileExist) {
    console.log(resizedFileName + ' was already on the server.');
    res.send(`<img src="/thumb/${resizedFileName}">`);
  }
  // otherwise, try to resize the image
  else {
    console.log('Attempting to resize ' + originalFileName + '...');
    resizeImage(originalFileName, height, width)
      .then(() => {
        // display the new image if there are no errors...
        res.send(`<img src="/thumb/${resizedFileName}">`);
      })
      .catch((err) => {
        // and pass the error back if there is a problem resizing the file
        res.send(`Error processing ${originalFileName}: ${err}`);
      });
  }
});

// start the express server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
