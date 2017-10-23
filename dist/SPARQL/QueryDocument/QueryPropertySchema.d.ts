export interface Class {
    "@id"?: string;
    "@type"?: "@id" | string;
    "@language"?: string;
    "@container"?: "@set" | "@list" | "@language";
}
export default Class;
