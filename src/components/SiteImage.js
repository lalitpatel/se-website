import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import useSiteImages from '../hooks/use-site-images';

const SiteImage = ({ src, alt, imgClassName, width, height, style, ...props }) => {
  const isLocalImage = src && !src.startsWith('http');
  const localImage = useSiteImages(isLocalImage ? src : null);
  const imageStyle = {
    ...style,
    ...(width ? { width } : {}),
    ...(height ? { height } : {})
  };

  if (!src) {
    return null;
  }

  if (localImage?.image) {
    return <GatsbyImage image={localImage.image} alt={alt} imgClassName={imgClassName} style={imageStyle} {...props} />;
  }

  return (
    <img
      src={isLocalImage ? localImage.src : src}
      alt={alt}
      className={imgClassName}
      width={width}
      height={height}
      style={style}
      {...props}
    />
  );
};

export default SiteImage;
