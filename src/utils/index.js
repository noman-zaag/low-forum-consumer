// Image validator
export const isImageInvalid = async (file) => {
  if (!file) {
    return;
  }

  const { type, size } = file;
  const allowedFileTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
  const maxSizeBytes = 3 * 1024 * 1024; // 3MB

  const isValidFileType = allowedFileTypes.includes(type);
  const isWithinSizeLimit = size <= maxSizeBytes;

  if (!isValidFileType || !isWithinSizeLimit) {
    let errorMessage = "Please select a valid image (PNG, JPG, JPEG, or WebP) file.";
    if (!isWithinSizeLimit) {
      errorMessage = "The selected image is too large. Please select an image that is 3MB or smaller.";
    }

    return errorMessage;
  }

  return false;
};
