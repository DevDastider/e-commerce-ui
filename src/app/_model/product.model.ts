import { FileHandle } from "./file-handle.model";

export interface Product{
    productNumber: any,
    productName: string,
    productDescription: string,
    productDiscountedPrice: number,
    productActualPrice: number,
    productImages: FileHandle[]
}