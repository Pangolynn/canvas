import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  video: HTMLVideoElement;
  timerID: any;
  // currentTime = 0;
  constructor() { }

  ngOnInit() {
    this.setupCanvas();
    this.videoCanvas();
  }

  setupCanvas(): void {
    this.canvas = <HTMLCanvasElement>document.getElementById('cv');
    this.context = this.canvas.getContext('2d');
    this.video = <HTMLVideoElement>document.getElementById('video');
  }

  videoCanvas(): void {
    this.video.addEventListener('play', () => {
      this.video.currentTime = 1.0;
      this.timerID = window.setInterval(() => {
        this.context.drawImage(this.video, 5, 5, 270, 125);
        console.log(this.timerID);
      }, 30);
    });

    this.video.addEventListener('pause', () => {
      this.stopTimer();
    });

    this.video.addEventListener('ended', () => {
      this.stopTimer();
    });
  }

  stopTimer(): void {
    window.clearInterval(this.timerID);
  }
}
