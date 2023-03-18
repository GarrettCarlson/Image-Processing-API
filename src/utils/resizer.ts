import express from 'express';
import checkFile from './checkFile';
import genFileName from './newImageName';
import resizeImage from './resizeImage';
import path from 'path';

const fullSizeImagePath = path.resolve('./api/full') + '\\';
const resizedImagePath = path.resolve('./api/thumb') + '\\';

const resizer = (req: express.Request, res: express.Response): void => {
  //console.log(fullSizeImagePath, resizedImagePath);
  // handle image resizing functions
  const originalFileName = req.query.filename as string;
  const height = parseInt(req.query.height as string) as number;
  const width = parseInt(req.query.width as string) as number;

  // check if the file requested exists on the server
  const fileExist = checkFile(originalFileName, fullSizeImagePath);

  // check if the file has already been resized to the requested dimensions
  const resizedFileName = genFileName(originalFileName, height, width);
  const newFileExist = checkFile(resizedFileName, resizedImagePath);

  // Send error if the file does not exist
  if (!fileExist) {
    res.send(`Error: Image requested ${originalFileName} does not exist.`);
    return;
  }

  // display the resized image if it has already been created
  if (newFileExist) {
    console.log(resizedFileName + ' was already on the server.');
    res.send(`<img src="/api/thumb/${resizedFileName}">`);
    return;
  }

  // otherwise, try to resize the image
  console.log('Attempting to resize ' + originalFileName + '...');
  resizeImage(originalFileName, height, width)
    .then(() => {
      // display the new image if there are no errors...
      res.send(`<img src="/api/thumb/${resizedFileName}">`);
    })
    .catch((err) => {
      // and pass the error back if there is a problem resizing the file
      res.send(`Error processing ${originalFileName}: ${err}`);
    });
};

export default resizer;
