import express from 'express';
import checkFile from './checkFile';
import genFileName from './newImageName';
import resizeImage from './resizeImage';
import path from 'path';

const fullSizeImagePath = path.resolve('./api/full') + '\\';
const resizedImagePath = path.resolve('./api/thumb') + '\\';

const resizer = (req: express.Request, res: express.Response): void => {
  //console.log(fullSizeImagePath, resizedImagePath);
  // validate the inputs in the req.query
  if (req.query.filename === undefined) {
    res.send(`Error: Filename not provided by user.`);
    return;
  }
  if (req.query.height === undefined) {
    res.send(`Error: New image height not provided by user.`);
    return;
  }
  if (req.query.width === undefined) {
    res.send(`Error: New image width not provided by user.`);
    return;
  }

  // assign the inputs from the req.query
  const originalFileName = req.query.filename as string;
  const height = parseInt(req.query.height as string) as number;
  const width = parseInt(req.query.width as string) as number;

  // filename and extension validation
  const fileHasExt = originalFileName.split('.').length === 2 ? true : false;
  if (!fileHasExt) {
    res.send(
      `Error: Image file must be a JPEG, PNG, WebP, GIF, AVIF, or TIFF.`
    );
    return;
  }
  const fileExtVal = originalFileName.split('.')[1].toLowerCase();
  if (
    !(
      fileExtVal === 'jpg' ||
      fileExtVal === 'jpeg' ||
      fileExtVal === 'png' ||
      fileExtVal === 'webp' ||
      fileExtVal === 'gif' ||
      fileExtVal === 'avif' ||
      fileExtVal === 'tiff'
    )
  ) {
    res.send(
      `Error: Image file must be a JPEG, PNG, WebP, GIF, AVIF, or TIFF.`
    );
    return;
  }

  // width and height validation
  if (isNaN(height) || height <= 0) {
    res.send(`Error: New image height must be a positive integer.`);
    return;
  }
  if (isNaN(width) || width <= 0) {
    res.send(`Error: New image width must be a positive integer.`);
    return;
  }

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
