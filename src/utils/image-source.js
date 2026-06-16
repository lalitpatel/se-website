import { getSrc } from 'gatsby-plugin-image';

const imageSource = image => {
  if (!image) {
    return null;
  }

  return getSrc(image) || image.publicURL || null;
};

export default imageSource;
