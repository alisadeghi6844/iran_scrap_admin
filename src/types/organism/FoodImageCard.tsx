export interface FoodImageCardTypes {
    image?: string;
    title?: string;
    base64?:boolean;
    description?: string;
    categories?:any;
    restaurant?:string;
    small?:boolean;
    handleSelectFood?:any;
    active?:boolean;
    buttonTitle?:string;
    selectFood?:any;
    [key: string]: any; // برای سایر props
}
