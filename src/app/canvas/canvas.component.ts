import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {

  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  constructor() { }

  ngOnInit() {
    this.setupCanvas();
    // this.drawRectangles();
    // this.drawTriangles();
    // this.drawSmiley();
    // this.drawArcs();
    // this.drawQuadtraticBezier();
    // this.drawCubicBezier();
    // this.colorPalette();
    //  this.colorPaletteCircles();
    // this.alphaCircles();
    // this.drawCircle();
    // this.rgbaRectangles('255', '0', '150');
    // this.drawPacMan();
    // this.path2D();
    // this.drawLineWidth();
    this.drawLineCap();
  }

  // Gets the canvas and the CanvasRenderingContext2D (the context)
  setupCanvas(): void {
    this.canvas = <HTMLCanvasElement>document.getElementById('tutorial');
    this.context = this.canvas.getContext('2d');
  }

  // Demonstrates fillRect(), clearRect(), & strokeRect()
  // methods of creating rectangles
  drawRectangles(): void {
    this.context.fillStyle = 'rgba(0, 0, 200, 0.5)';
    this.context.fillRect(30, 30, 50, 50);
    this.context.fillRect(25, 25, 100, 100);
    this.context.clearRect(45, 45, 60, 60);
    this.context.strokeRect(50, 50, 50, 50);
  }

  // Demonstrates how to creat triangles using lineTo()
  drawTriangles(): void {
    this.context.fillStyle = 'rgba(100, 0, 200, 0.7)';
    this.context.beginPath();
    this.context.moveTo(25, 25);
    this.context.lineTo(105, 25);
    this.context.lineTo(25, 105);
    this.context.fill();

    this.context.beginPath();
    this.context.moveTo(110, 110);
    this.context.lineTo(110, 30);
    this.context.lineTo(30, 110);
    this.context.closePath();
    this.context.stroke();
  }

  // Demonstrates how to make a smiley face using arc()
  drawSmiley(): void {
    this.context.beginPath();

    // A full circle is 360° = 2π
    this.context.fillStyle = 'rgb(250, 255, 0)';
    this.context.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
    this.context.fill();

    // Half a circle is 180° = π
    this.context.fillStyle = 'rgb(0, 0, 0)';
    this.context.beginPath();
    this.context.arc(75, 75, 35, 0, Math.PI, false); // Mouth
    this.context.fill();

    this.context.fillStyle = 'rgb(190, 80, 120)';
    this.context.beginPath();
    this.context.arc(75, 102, 20, 0, Math.PI, false);
    this.context.fill();


    this.context.fillStyle = 'rgb(0, 0, 0)';
    this.context.beginPath();
    this.context.arc(55, 65, 10, 0, Math.PI, true); // Left eye outer
    this.context.fill();

    this.context.beginPath();
    this.context.arc(95, 65, 10, 0, Math.PI, true); // Right eye outer
    this.context.fill();

    this.context.fillStyle = 'rgb(90, 200, 100)';
    this.context.beginPath();
    this.context.arc(55, 65, 5, 0, Math.PI, true); // Left eye inner
    this.context.fill();


    this.context.fillStyle = 'rgb(90, 200, 100)';
    this.context.beginPath();
    this.context.arc(95, 65, 5, 0, Math.PI, true); // Right eye inner
    this.context.fill();


  }

  /*Demonstrates how to make a circle using lineTo
  instead of arc. The circle is divided into 20 equal
  sections. The smaller the section, the smoother the circle.
  */
  drawCircle(): void {
    const step = 2 * Math.PI / 20;
    const h = 25;
    const k = 25;
    const r = 20;

    this.context.beginPath();

    for (let theta = 0; theta < 2 * Math.PI; theta += step) {
      let x = h + r * Math.cos(theta);
      let y = k - r * Math.sin(theta);  // the y axis is inverted, the positive y
                                          // is down the screen not up.
      this.context.lineTo(x, y);

    }
    this.context.closePath(); // complete the circle
    this.context.stroke(); // draw the lines
  }

  // Demonstrates various applications of the arc() method
  // to create different circles/partial circles.
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

  // Demonstrates how the quadraticCurveTo can create
  // organic objects with quadratic beziers, forms a speech bubble.
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

  // Demonstrates how the bezierCurveTo can create
  // organic objects with cubic beziers, forms a heart.
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

  // Draws a replication of the corner of the Pacman game
  // Best viewed on a 150x150 canvas
  drawPacMan() {
    this.roundedRect(this.context, 12, 12, 150, 150, 15);
    this.roundedRect(this.context, 19, 19, 150, 150, 9);
    this.roundedRect(this.context, 53, 53, 49, 33, 10);
    this.roundedRect(this.context, 53, 119, 49, 16, 6);
    this.roundedRect(this.context, 135, 53, 49, 33, 10);
    this.roundedRect(this.context, 135, 119, 25, 49, 10);

    // This is pacman
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

  // Demonstrates how to create a Path2D object
  // and reuse it in a variable.
  path2D(): void {
    const rectangle = new Path2D();
    rectangle.rect(10, 10, 50, 50);

    const circle = new Path2D();
    circle.moveTo(125, 35);
    circle.arc(100, 35, 25, 0, 2 * Math.PI);

    this.context.stroke(rectangle);
    this.context.fill(circle);
  }

  // Demonstrates fillStyle method to create rows/cols
  // of slightly different colored filled in rectangles
  colorPalette(): void {
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        this.context.fillStyle = 'rgb(' + Math.floor(200 - 20 * i) + ', ' +
          Math.floor(290 - 20 * j) + ', 0)';
          this.context.fillRect(j * 25, i * 25, 25, 25);
      }
    }
  }

  // Demonstrates strokeStyle method to create rows/cols
  // of slightly different colored outlines of circles
  colorPaletteCircles(): void {
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        this.context.strokeStyle = 'rgb(0, ' + (255 - 42 * i) + ', ' +
          (255 - 42 * j);
        this.context.beginPath();
        this.context.arc(12.5 + j * 25, 12.5 + i * 25, 10, 0, Math.PI * 2, true);
        this.context.stroke();
      }
    }
  }

  // Demonstrates the globalAlpha method of transparency
  // A semi-transparent circle on top of 4 squares
  alphaCircles(): void {
    this.context.fillStyle = '#FD0';
    this.context.fillRect(0, 0, 75, 75);
    this.context.fillStyle = '#6C0';
    this.context.fillRect(75, 0, 75, 75);
    this.context.fillStyle = '#09F';
    this.context.fillRect(0, 75, 75, 75);
    this.context.fillStyle = '#F30';
    this.context.fillRect(75, 75, 75, 75);
    this.context.fillStyle = '#FFF';

    this.context.globalAlpha = 0.2;

    for (let i = 0; i < 7; i++) {
      this.context.fillStyle = 'rgb(255, 197, 218)';
      this.context.beginPath();
      this.context.arc(75, 75, 10 + 10 * i, 0, Math.PI * 2, true);

      this.context.fill();
    }
  }

  // Demonstrates transparency using rgba()
  // Add in rgb values to change the inner square color.
  // Default is 255-255-255 (white).
  rgbaRectangles(r: string = '255', g: string = '255', b: string = '255'): void {
    this.context.fillStyle = 'rgb(250, 200, 0)';
    this.context.fillRect(0, 0, 150, 37.5);
    this.context.fillStyle = 'rgb(100, 200, 0)';
    this.context.fillRect(0, 37.5, 150, 37.5);
    this.context.fillStyle = 'rgb(0, 150, 250)';
    this.context.fillRect(0, 75, 150, 37.5);
    this.context.fillStyle = 'rgb(250, 50, 0)';
    this.context.fillRect(0, 112.5, 150, 37.5);

    for (var i = 0; i < 10; i++) {
      this.context.fillStyle =
        `rgba(${r}, ${g}, ${b}, ${(i + 1) / 10})`;
      for (var j = 0; j < 4; j++) {
        this.context.fillRect(5 + i * 14, 5 + j * 37.5, 14, 27.5);
      }
    }
  }

  // Demonstrates the lineWidth() property for stroke thickness
  // The `if` section removes line widths that are not crisp
  // Comment it out to see the difference
  drawLineWidth(): void {
    for (let i = 0; i < 20; i++) {
      if (i % 2 === 0 ) {
        continue;
      }
      this.context.lineWidth = 1 + i;
      this.context.beginPath();
      this.context.moveTo(5 + i * 20, 5);
      this.context.lineTo(5 + i * 20, 100);
      this.context.stroke();
    }
  }

  // Demonstrates the three types of lineCaps:
  // butt, round, square
  drawLineCap(): void {
    const lineCap = ['butt', 'round', 'square'];

    // guides
    this.context.strokeStyle = '#5fa';
    this.context.beginPath();
    this.context.moveTo(10, 10);
    this.context.lineTo(140, 10);
    this.context.moveTo(10, 140);
    this.context.lineTo(140, 140);
    this.context.stroke();

    this.context.strokeStyle = 'black';
    for (let i = 0; i < lineCap.length; i++ ) {
      this.context.lineWidth = 15;
      this.context.lineCap = lineCap[i];
      this.context.beginPath();
      this.context.moveTo(25 + i * 50, 10);
      this.context.lineTo(25 + i * 50, 140);
      this.context.stroke();
    }

  }
}

