import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';

interface CustomImageCroppedEvent {
  base64: string;
  width: number;
  height: number;
  cropperPosition: CropperPosition;
  imagePosition: CropperPosition;
  offsetImagePosition: CropperPosition;
}

interface CustomLoadedImageEvent {
  original: {
    base64: string;
    image: HTMLImageElement;
    size: Dimension;
  };
  transformed: {
    base64: string;
    image: HTMLImageElement;
    size: Dimension;
  };
  exifTransform: ExifTransform;
}



interface CropperPosition {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

interface Dimension {
  width: number;
  height: number;
}

interface ExifTransform {
  scaleX: number;
  scaleY: number;
  translateX: number;
  translateY: number;
  rotate: number;
  flipHorizontal: boolean;
  flipVertical: boolean;
}

@Component({
  selector: 'ImgCropper',
  templateUrl: './ImgCropper.component.html',
  styleUrls: ['./ImgCropper.component.css']
})
export class ImgCropperComponent {

  imageChangedEvent: any = '';
  croppedImage: any = '';

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: CustomImageCroppedEvent | ImageCroppedEvent) {
    if ('base64' in event && event.base64 !== null) {
      this.croppedImage = event.base64;
    }
  }

  imageLoaded(event: CustomLoadedImageEvent | LoadedImage) {
    if ('transformed' in event && event.transformed.base64 !== null) {
      // show cropper
    }
  }

  cropperReady(): void {
    // Cropper is ready to be interacted with
  }

  loadImageFailed(): void {
    // Show an error message for failed image loading
  }
  
}
