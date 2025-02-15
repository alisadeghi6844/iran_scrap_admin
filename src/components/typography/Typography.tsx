import React from "react";

import { Link } from "react-router-dom";

// import type
import { TypographyTypes } from "../../types/components/TypographyTypes";
import Box from "../box";

const Typography:React.FC<TypographyTypes> = (props) => {
  const { children, tag, variant, className, link, ...rest } = props;
  return (
    <>
      {tag === "h1" ? (
        <h1
          className={`${variant ? variant : tag} ${className ? className : ""}`}
          {...rest}
        >
          {children}
        </h1>
      ) : tag === "h2" ? (
        <h2
          className={`${variant ? variant : tag} ${className ? className : ""}`}
          {...rest}
        >
          {children}
        </h2>
      ) : tag === "h3" ? (
        <h3
          className={`${variant ? variant : tag} ${className ? className : ""}`}
          {...rest}
        >
          {children}
        </h3>
      ) : tag === "h4" ? (
        <h4
          className={`${variant ? variant : tag} ${className ? className : ""}`}
          {...rest}
        >
          {children}
        </h4>
      ) : tag === "h5" ? (
        <h5
          className={`${variant ? variant : tag} ${className ? className : ""}`}
          {...rest}
        >
          {children}
        </h5>
      ) : tag === "h6" ? (
        <h6
          className={`${variant ? variant : tag} ${className ? className : ""}`}
          {...rest}
        >
          {children}
        </h6>
      ) : tag === "span" ? (
        <span
          className={`${variant ? variant : tag} ${className ? className : ""}`}
          {...rest}
        >
          {children}
        </span>
      ) : tag === "a" ? (
        <Link
          to={link && link}
          className={`${variant ? variant : tag} ${className ? className : ""}`}
          {...rest}
        >
          {children}
        </Link>
      ) : tag === "button" ? (
        <button className={className} {...rest}>
          {children}
        </button>
      ) : tag === "box" ? (
        <Box className={className} {...rest}>
          {children}
        </Box>
      ) : (
        <div
          className={`${variant ? variant : tag} ${className ? className : ""}`}
          {...rest}
        >
          {children}
        </div>
      )}
    </>
  );
};

export default Typography;
