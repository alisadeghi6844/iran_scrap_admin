export const getFileExtension = (fileName: string): string => {
    const lastDotIndex = fileName.lastIndexOf('.');
    
    return lastDotIndex > 0 
      ? fileName.slice(lastDotIndex + 1) 
      : '';
  };