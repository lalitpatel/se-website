import React from 'react';
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

  return (
    <img
      src={isLocalImage ? localImage.src : src}
      alt={alt}
      className={imgClassName}
      width={width}
      height={height}
      style={imageStyle}
      {...props}
    />
  );
};

export default SiteImage;
