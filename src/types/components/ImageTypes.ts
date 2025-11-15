export interface ImageTypes extends React.ImgHTMLAttributes<HTMLImageElement>{
    alt?:string,
    className?:string,
    height?:string|number,
    notImage?:string,
    src?:any,
    base64?:boolean,
    width?:string|number,
}