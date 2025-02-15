import React from "react";
import { ImageTypes } from '../../types/components/ImageTypes';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Image:React.FC<ImageTypes> = (props) => {
  const {
    alt,
    className,
    height,
    notImage = "/images/core/placeholder.png",
    src,
    base64=false,
    width,
    ...rest
  } = props;
  return (
    <>
      <LazyLoadImage
        src={src ? base64?`data:image/*;base64,${src}`:src : notImage}
        alt={alt ? alt : "image"}
        className={className ? className : ""}
        width={width && width}
        height={height && height}
        {...rest}
      />
    </>
  );
};
export default Image;
