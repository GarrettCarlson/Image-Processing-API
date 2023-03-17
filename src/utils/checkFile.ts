import fs from 'fs';

// Check if file exists on server
const fileOnServer = (fileName: string, dirName: string): boolean => {
  const fullPath = dirName + fileName;
  return fs.existsSync(fullPath);
};

export default fileOnServer;
