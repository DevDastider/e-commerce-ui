import { Injectable } from '@angular/core';
import { FileHandle } from '../_model/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {

  constructor(private sanitizer: DomSanitizer) { }

  public convertByteToImages(productImages: any[]): FileHandle[]{
    const imagesFileHandle: FileHandle[] = [];
    
    for(let i = 0; i<productImages.length; i++){
      const imageFileData = productImages[i];
      const imageBlob = this.convertPicBytesToBlob(imageFileData.picByte, imageFileData.type);
      const imageFile = new File([imageBlob], imageFileData.name, {type: imageFileData.type});

      const fileHandle: FileHandle = {
        file: imageFile,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
      };

      imagesFileHandle.push(fileHandle);
    }

    return imagesFileHandle;
  }
  
  private convertPicBytesToBlob(picBytes: string, imageType: string){   
    const byteString = window.atob(picBytes);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }

    return new Blob([int8Array], {type: imageType});
  }
}
