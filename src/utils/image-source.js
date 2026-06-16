const imageSource = image => {
  if (!image) {
    return null;
  }

  return image.publicURL || null;
};

export default imageSource;
