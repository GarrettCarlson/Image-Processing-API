import sharp from 'sharp';
import genFileName from './newImageName';
import fs from 'fs';

const fullDir = './api/full/';

const resizeImage = async (
  fileName: string,
  newHeight: number,
  newWidth: number
) => {
  const newFileName = genFileName(fileName, newHeight, newWidth);
  const newFileDir = './api/thumb/';

  try {
    if (!fs.existsSync(newFileDir)) {
      fs.mkdirSync(newFileDir);
    }
    await sharp(fullDir + fileName)
      .resize({
        width: newWidth,
        height: newHeight,
      })
      .toFile(newFileDir + newFileName);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default resizeImage;
