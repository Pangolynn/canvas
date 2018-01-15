
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class ImageService {
  images: HTMLImageElement[] = [];

  constructor() { }

  getImages(imgs: string[]): Observable<HTMLImageElement[]> {

    console.log()
    for (let i = 0; i < imgs.length; i++) {
      this.images[i] = new Image();
      this.images[i].src = imgs[i];
    }

    return of(this.images);
  }


}
