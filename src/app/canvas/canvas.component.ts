import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {

  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  width = '300px';
  height = '300px';
  constructor() { }

  ngOnInit() {
    this.width = '300px';
    this.height = '300px';
    this.setupCanvas();
    //this.drawRectangles();
    // this.drawTriangles();
    // this.drawSmiley();
    // this.drawArcs();
    // this.drawQuadtraticBezier();
    // this.drawCubicBezier();

    // this.drawPacMan();
    this.path2D();
  }

  setupCanvas(): void {
    this.canvas = <HTMLCanvasElement>document.getElementById('tutorial');
    this.context = this.canvas.getContext('2d');
  }

  drawRectangles(): void {

    this.context.fillStyle = 'rgba(0, 0, 200, 0.5)';
    this.context.fillRect(30, 30, 50, 50);

    this.context.fillRect(25, 25, 100, 100);
    this.context.clearRect(45, 45, 60, 60);
    this.context.strokeRect(50, 50, 50, 50);
  }

  drawTriangles(): void {
    // Filled Triangle
    this.context.fillStyle = 'rgba(100, 0, 200, 0.7)';
    this.context.beginPath();
    this.context.moveTo(25, 25);
    this.context.lineTo(105, 25);
    this.context.lineTo(25, 105);
    this.context.fill();

    // Stroked Triangle
    this.context.beginPath();
    this.context.moveTo(110, 110);
    this.context.lineTo(110, 30);
    this.context.lineTo(30, 110);
    this.context.closePath();
    this.context.stroke();
  }

  drawSmiley(): void {
    this.context.beginPath();
    // C = π· 2r = 2πr.

    this.context.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
    this.context.moveTo(110, 75);
    this.context.arc(75, 75, 35, 0, Math.PI, false); // Mouth (clockwise)
    this.context.moveTo(65, 65);
    this.context.arc(60, 65, 5, 0, Math.PI * 2, true); // Left eye
    this.context.moveTo(95, 65);
    this.context.arc(90, 65, 5, 0, Math.PI * 2, true); // Right eye
    this.context.stroke();
  }

  drawCircle(): void {
    const step = 2 * Math.PI / 20;
    const h = 150;
    const k = 150;
    const r = 50;

    this.context.beginPath();

    for (let theta = 0; theta < 2 * Math.PI; theta += step) {
      const x = h + r * Math.cos(theta);
      const y = k - r * Math.sin(theta);  // the y axis is inverted, the positive y
                                        // is down the screen not up.

    }
  }

  drawArcs(): void {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++ ) {
        this.context.beginPath();
        const x = 25 + j * 50;
        const y = 25 + i * 50;
        const radius = 20;
        const startAngle = 0;
        const endAngle = Math.PI + (Math.PI * j) / 2;
        const anticlockwise = i % 2 !== 0;

        this.context.arc(x, y, radius, startAngle, endAngle, anticlockwise);

        if (i > 1) {
          this.context.fill();
        } else {
          this.context.stroke();
        }
      }
    }


    this.context.beginPath();
    this.context.lineTo(45, 25);
    this.context.lineTo(55, 25);
    this.context.closePath();
    this.context.stroke();
  }

  drawQuadtraticBezier(): void {
    this.context.beginPath();
    this.context.moveTo(75, 25);
    this.context.quadraticCurveTo(25, 25, 25, 62.5);
    this.context.quadraticCurveTo(25, 100, 50, 100);
    this.context.quadraticCurveTo(50, 120, 40, 125);
    this.context.quadraticCurveTo(60, 120, 65, 100);
    this.context.quadraticCurveTo(125, 100, 125, 62.5);
    this.context.quadraticCurveTo(125, 25, 75, 25);
    this.context.stroke();
  }

  drawCubicBezier(): void {
    this.context.beginPath();
    this.context.moveTo(75, 40);
    this.context.bezierCurveTo(75, 37, 70, 25, 50, 25);
    this.context.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
    this.context.bezierCurveTo(20, 80, 40, 102, 75, 120);
    this.context.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
    this.context.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
    this.context.bezierCurveTo(85, 25, 75, 37, 75, 40);
    this.context.fillStyle = 'rgba(100, 0, 50, .9)';
    this.context.fill();
  }


  drawPacMan() {
    // this.width = '150px';
    // this.height = '150px';

    this.roundedRect(this.context, 12, 12, 150, 150, 15);
    this.roundedRect(this.context, 19, 19, 150, 150, 9);
    this.roundedRect(this.context, 53, 53, 49, 33, 10);
    this.roundedRect(this.context, 53, 119, 49, 16, 6);
    this.roundedRect(this.context, 135, 53, 49, 33, 10);
    this.roundedRect(this.context, 135, 119, 25, 49, 10);

    this.context.beginPath();
    this.context.arc(37, 37, 13, Math.PI / 7, -Math.PI / 7, false);
    this.context.lineTo(31, 37);
    this.context.fill();

    for (var i = 0; i < 8; i++) {
      this.context.fillRect(51 + i * 16, 35, 4, 4);
    }
    console.log(i);
    for (i = 0; i < 6; i++) {
      this.context.fillRect(115, 51 + i * 16, 4, 4);
    }

    for (i = 0; i < 8; i++) {
      this.context.fillRect(51 + i * 16, 99, 4, 4);
    }

    this.context.beginPath();
    this.context.moveTo(83, 116);
    this.context.lineTo(83, 102);
    this.context.bezierCurveTo(83, 94, 89, 88, 97, 88);
    this.context.bezierCurveTo(105, 88, 111, 94, 111, 102);
    this.context.lineTo(111, 116);
    this.context.lineTo(106.333, 111.333);
    this.context.lineTo(101.666, 116);
    this.context.lineTo(97, 111.333);
    this.context.lineTo(92.333, 116);
    this.context.lineTo(87.666, 111.333);
    this.context.lineTo(83, 116);
    this.context.fill();

    this.context.fillStyle = 'white';
    this.context.beginPath();
    this.context.moveTo(91, 96);
    this.context.bezierCurveTo(88, 96, 87, 99, 87, 101);
    this.context.bezierCurveTo(87, 103, 88, 106, 91, 106);
    this.context.bezierCurveTo(94, 106, 95, 103, 95, 101);
    this.context.bezierCurveTo(95, 99, 94, 96, 91, 96);
    this.context.moveTo(103, 96);
    this.context.bezierCurveTo(100, 96, 99, 99, 99, 101);
    this.context.bezierCurveTo(99, 103, 100, 106, 103, 106);
    this.context.bezierCurveTo(106, 106, 107, 103, 107, 101);
    this.context.bezierCurveTo(107, 99, 106, 96, 103, 96);
    this.context.fill();

    this.context.fillStyle = 'black';
    this.context.beginPath();
    this.context.arc(101, 102, 2, 0, Math.PI * 2, true);
    this.context.fill();

    this.context.beginPath();
    this.context.arc(89, 102, 2, 0, Math.PI * 2, true);
    this.context.fill();
  }

  // A utility function to draw a rectangle with rounded corners.

  roundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x, y + radius);
    ctx.lineTo(x, y + height - radius);
    ctx.arcTo(x, y + height, x + radius, y + height, radius);
    ctx.lineTo(x + width - radius, y + height);
    ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
    ctx.lineTo(x + width, y + radius);
    ctx.arcTo(x + width, y, x + width - radius, y, radius);
    ctx.lineTo(x + radius, y);
    ctx.arcTo(x, y, x, y + radius, radius);
    ctx.stroke();
  }

  path2D(): void {
    var rectangle = new Path2D();
    rectangle.rect(10, 10, 50, 50);

    var circle = new Path2D();
    circle.moveTo(125, 35);
    circle.arc(100, 35, 25, 0, 2 * Math.PI);

    this.context.stroke(rectangle);
    this.context.fill(circle);
  }


}

