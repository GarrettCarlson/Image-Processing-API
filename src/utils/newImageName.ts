const genFileName = (
  fileName: string,
  height: number,
  width: number
): string => {
  // remove file extension from the current filename
  const fileNameNoExt = fileName.split('.')[0];
  const fileExt = fileName.split('.')[1];
  const newFilename =
    fileNameNoExt + '_' + height + '_' + width + '.' + fileExt;
  return newFilename;
};

export default genFileName;
