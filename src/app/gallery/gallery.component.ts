import { Component, OnInit } from '@angular/core';
import { ImageService } from 'app/image.service';
//TODO: Make responsive , width of canvas/how many imgs fit

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  imageSources: string[] = [];
  images: HTMLImageElement[] = [];
  frames: HTMLImageElement[] = [];

  constructor(private imgService: ImageService) {
    this.imageSources = [
      'https://mdn.mozillademos.org/files/5399/gallery_1.jpg',
      'https://mdn.mozillademos.org/files/5401/gallery_2.jpg',
      'https://mdn.mozillademos.org/files/5403/gallery_3.jpg',
      'https://mdn.mozillademos.org/files/5405/gallery_4.jpg',
      'https://mdn.mozillademos.org/files/5407/gallery_5.jpg',
      'https://mdn.mozillademos.org/files/5409/gallery_6.jpg',
      'https://mdn.mozillademos.org/files/5411/gallery_7.jpg',
      'https://mdn.mozillademos.org/files/5413/gallery_8.jpg',
      'https://mdn.mozillademos.org/files/5399/gallery_1.jpg',
      'https://mdn.mozillademos.org/files/5405/gallery_4.jpg',
      'https://mdn.mozillademos.org/files/5407/gallery_5.jpg',
      'https://mdn.mozillademos.org/files/5409/gallery_6.jpg',
      'https://mdn.mozillademos.org/files/5411/gallery_7.jpg',
      'https://mdn.mozillademos.org/files/5413/gallery_8.jpg',
      'https://mdn.mozillademos.org/files/5399/gallery_1.jpg',
      'https://mdn.mozillademos.org/files/5405/gallery_4.jpg',
      'https://mdn.mozillademos.org/files/5407/gallery_5.jpg',
      'https://mdn.mozillademos.org/files/5409/gallery_6.jpg',
      'https://mdn.mozillademos.org/files/5411/gallery_7.jpg',
      'https://mdn.mozillademos.org/files/5413/gallery_8.jpg',
      'https://mdn.mozillademos.org/files/5399/gallery_1.jpg',
    ];
  }

  ngOnInit() {
    this.setupCanvas();
    this.preload();
    this.draw();
  }

  // Gets the canvas and the CanvasRenderingContext2D (the context)
  setupCanvas(): void {
    this.canvas = <HTMLCanvasElement>document.getElementById('gallery');
    this.context = this.canvas.getContext('2d');
  }

  draw(): void {
    const frameWidth = 132;
    const frameHeight = 150;
    const imageWidth = 85;
    const imageHeight = 103;
    const imageOffsetXLeft = 22; // Pixels from outer to inner left edge of frame
    const imageOffsetXRight = 25; // Pixels from inner to outer right edge of frame
    const imageOffsetYTop = 21; // Pixels from outer to inner top edge of frame
    const imageOffsetYBottom = 26; // Pixels from outer to inner bottom edge of frame
    const frameMargin = 10; // Margin in between each frame X
    const marginTop = 20; // Margin between each row of frames Y
    const numImgs = this.imageSources.length; // Number of images to be drawn
    let count = 0; // Number of images drawn
    // 4 columns in each row, Need to add a row if not evenly div by 4
    const cols = 4;
    let rows = (numImgs <= cols) ? 1 : Math.floor(numImgs / cols);
    if (numImgs % cols !== 0) {
      rows++;
    }


    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        // console.log(count, numImgs, x);
        if (count === numImgs) { console.log(count, numImgs, x, y); break; }
        // where the next frame should be X
        const frameOffsetX = (frameWidth * x) + (frameMargin * x);
        // where the next image should be X
        const imageOffsetX = (imageOffsetXLeft * x + imageOffsetXLeft) +
            (imageWidth * x) + (imageOffsetXRight * x) + (frameMargin * x);

        const newRowFrameY = (frameHeight + marginTop) * y;
        const newRowImageY = imageOffsetYTop + newRowFrameY;

        if (this.frames[count].complete) {
          this.context.drawImage(this.frames[count], frameOffsetX, newRowFrameY, frameWidth, frameHeight);
        } else {
          this.frames[count].onload = () => {
            this.context.drawImage(this.frames[count], frameOffsetX, newRowFrameY, frameWidth, frameHeight);
          }
        }

        if (this.images[count].complete) {
          this.context.drawImage(this.images[count], imageOffsetX, newRowImageY, imageWidth, imageHeight);
          count++;
        } else {
          this.images[count].onload = () => {
            this.context.drawImage(this.images[count], imageOffsetX, newRowImageY, imageWidth, imageHeight);
            count++;
          }
        }
      }
    }
  }

  preload() {
    for (let i = 0; i < this.imageSources.length; i++) {
      this.frames[i] = new Image();
      this.frames[i].src = 'https://mdn.mozillademos.org/files/242/Canvas_picture_frame.png';

      this.images[i] = new Image();
      this.images[i].src = this.imageSources[i];
    }
  }
}
