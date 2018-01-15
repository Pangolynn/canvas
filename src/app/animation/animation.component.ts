import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.css']
})
export class AnimationComponent implements OnInit {
  radius = 50;
  posY = 70;
  posX = this.radius;
  speed = 20;
  canvas: HTMLCanvasElement;
  canvasWidth = 0;
  canvasHeight = 0;
  ctx: CanvasRenderingContext2D;
  dir = 1;

  constructor() {
  }

  ngOnInit() {
    /* For circle animation
      this.canvas = <HTMLCanvasElement>document.getElementById('ani');
      this.canvasWidth = this.canvas.width;
      this.canvasHeight = this.canvas.height;
      this.ctx = this.canvas.getContext('2d');

      window.setInterval(() => {
        this.animate();
      }, 60);
      this.animate();
    */

    // HTML5 canvas chart lesson by dan wahlin adaptation.
    const canvasGraph = () => {
      let margin = { top: 40, left: 75, right: 0, bottom: 75 },
      chartHeight, chartWidth, yMax, xMax, data,
      maxYValue = 0,
      ratio = 0,
      pointRadius = 10,
      renderType = { lines: 'lines', points: 'points' },
      finalDataPoints = [],
      selectedDataPoint = null,
      timerID,
      overlayDiv,

      render = (canvasID, dataObj) => {
        data = dataObj;
        createOverlay();

        this.canvas = <HTMLCanvasElement>document.getElementById(canvasID);
        chartHeight = this.canvas.getAttribute('height');
        chartWidth = this.canvas.getAttribute('width');
        this.canvas.addEventListener('mousemove', mouseMove, false);
        this.ctx = this.canvas.getContext('2d');

        xMax = chartWidth - (margin.left + margin.right);
        yMax = chartHeight - (margin.top + margin.bottom);
        maxYValue = getMaxDataYValue();
        ratio = yMax / maxYValue;
        // render data based upon type of renderTypes that client supplies
        if (data.renderTypes === undefined || data.renderTypes === null) {
          data.renderTypes = [renderType.lines];
        };
        renderParts();

      },
      renderParts = () => {
        renderBackground();
        renderText();
        renderLinesAndLabels(true);
        renderData();
      },

      renderBackground = () => {
        let lingrad = this.ctx.createLinearGradient(margin.left, margin.top, xMax - margin.right, yMax);
        lingrad.addColorStop(0.0, '#D4D4D4');
        lingrad.addColorStop(0.2, '#fff');
        lingrad.addColorStop(0.8, '#fff');
        lingrad.addColorStop(1, '#D4D4D4');
        this.ctx.fillStyle = lingrad;
        this.ctx.fillRect(margin.left, margin.top, xMax - margin.left, yMax - margin.top);
        this.ctx.fillStyle = 'black';
      },

      renderLinesAndLabels = (shouldRenderText) => {
        let yInc = yMax / data.dataPoints.length;
        let yPos  = 0;
        let xInc = getXInc();
        let xPos = margin.left;

        for (let i = 0; i < data.dataPoints.length; i++) {
          yPos += (i === 0) ? margin.top : yInc;
          // draw horizontal lines
          drawLine({x: margin.left, y: yPos, x2: xMax, y2: yPos}, '#E8E8E8');

          if (shouldRenderText) {
            // y axis labels
            this.ctx.font = (data.dataPointFont != null) ? data.dataPointFont : '10pt Calibri';
            let txt = (Math.round(maxYValue - ((i === 0) ? 0 : yPos / ratio))).toString();
            let txtSize = this.ctx.measureText(txt);
            this.ctx.fillText(txt, margin.left - ((txtSize.width >= 14) ? txtSize.width : 10) - 7, yPos + 4);

            // x axis labels
            txt = data.dataPoints[i].x;
            txtSize = this.ctx.measureText(txt);
            this.ctx.fillText(txt, xPos, yMax + (margin.bottom / 3));
            xPos += xInc;
          }
        }

        // Vertical line
        drawLine({ x: margin.left, y: margin.top, x2: margin.left, y2: yMax}, 'black');

        // Horizontal lin
        drawLine({ x: margin.left, y: yMax, x2: xMax, y2: yMax}, 'black');

      },

      drawLine = (pt, strokeStyle?) => {
        this.ctx.strokeStyle = (strokeStyle === null) ? 'black' : strokeStyle;
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(pt.x2, pt.y2);
        this.ctx.lineTo(pt.x, pt.y);
        this.ctx.stroke();
        this.ctx.closePath();
      },

      renderText = () => {
        let labelFont = (data.labelFont != null) ? data.labelFont : '20pt Arial';
        this.ctx.font = labelFont;
        this.ctx.textAlign = 'center';

        // Title
        this.ctx.fillText(data.title, (chartWidth / 2), margin.top / 2);

        // X axis text
        let txtSize = this.ctx.measureText(data.xLabel);
        this.ctx.fillText(data.xLabel, margin.left + (xMax / 2) - (txtSize.width / 2), yMax + (margin.bottom / 1.2));

        // Y axis text
        this.ctx.save();
        this.ctx.rotate(-Math.PI / 2);
        this.ctx.font = labelFont;
        // x and y axis gets flipped by rotating backwards so y comes 1st then x
        this.ctx.fillText(data.yLabel, (yMax / 2) * -1, margin.left / 4);
        this.ctx.restore();
      },

      getXInc = () => {
        return Math.round(xMax / data.dataPoints.length) - 1;
      },

      getMaxDataYValue = () => {
        let maxY = 0;
        for (let i = 0; i < data.dataPoints.length; i++) {
          let y = data.dataPoints[i].y;
          if (y > maxY) {
            maxY = y;
          }
        }
        return maxY;
      },

      createOverlay = () => {
        // create overlay div for displaying data
        overlayDiv = document.createElement('div');
        overlayDiv.style.display = 'none';
        overlayDiv.style.backgroundColor = '#efefef';
        overlayDiv.style.border = '1px solid black';
        overlayDiv.style.position = 'absolute';
        overlayDiv.style.padding = '5px';
        document.body.appendChild(overlayDiv);
      },

      renderData = () => {
        let xInc = getXInc();
        let prevX = 0;
        let prevY = 0;

        for (let i = 0; i < data.dataPoints.length; i++) {
          let pt = data.dataPoints[i];
          let y = (maxYValue - pt.y) * ratio;
          if (y < margin.top) {
            y = margin.top;
          }
          let x = (i * xInc) + margin.left;

          // Calculate dataPoint details
          let dataPoint = { x: x, y: y, currX: margin.left, x2: prevX, y2: prevY, originalY: pt.y };
          finalDataPoints.push(dataPoint);

          prevX = x;
          prevY = y;
        };

        if (data.renderTypes.indexOf(renderType.lines) !== -1)  { drawLines() };
        if (data.renderTypes.indexOf(renderType.points) !== -1) { drawPoints() };
      },

      drawLines = () => {
        for (let i = 0; i < finalDataPoints.length; i++) {
          let pt = finalDataPoints[i];
          if (pt.x2 > 0) {
            drawLine(pt, 'black');
          }
        }
      },

      drawPoints = () => {
        if (data.animatePoints) {
          animate();
        } else {
          for (let i = 0; i < finalDataPoints.length; i++) {
            let pt = finalDataPoints[i];
            renderCircle(pt.x, pt.y, 'green');
          }
        }
      },

      animate = () => {
        this.speed = (this.speed === null) ? 50 : this.speed;
        timerID = requestAnimationFrame(animate);
        clear();
        drawLines();
        for (let i = 0; i < finalDataPoints.length; i++) {
            let pt = finalDataPoints[i];
            pt.currX += this.speed; // Animating x position to increment it here
            if (pt.currX >= pt.x) {
              pt.currX = pt.x;
            }
            renderCircle(pt.currX, pt.y, 'green');
            if (i === finalDataPoints.length - 1 && pt.currX === pt.x) {
              cancelAnimationFrame(timerID);
            }
        }
      },

      clear = () => {
        this.ctx.clearRect(margin.left - pointRadius - 2, margin.top - pointRadius - 2, xMax, yMax - margin.bottom / 3);
        renderBackground();
        renderLinesAndLabels(false);
      },


      renderCircle = (x, y, highlightColor?) => {
        let radgrad = this.ctx.createRadialGradient(x, y, pointRadius, x - 5, y - 5, 0);
        highlightColor = (highlightColor === null) ? 'Green' : highlightColor;
        radgrad.addColorStop(0, highlightColor);
        radgrad.addColorStop(0.9, 'White');
        this.ctx.beginPath();
        this.ctx.fillStyle = radgrad;

        // Render circle
        this.ctx.arc(x, y, pointRadius, 0, 2 * Math.PI, false)
        this.ctx.fill();
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = '#000';
        this.ctx.stroke();
        this.ctx.closePath();
      },

      mouseMove = (ev) => {
        let x, y;
        // Get the mouse position relative to canvas
        if (ev.offsetX || ev.offsetX === 0) {
            x = ev.offsetX;
            y = ev.offsetY;
        } else if (ev.layerX || ev.layerX === 0) { // Firefox
            x = ev.layerX - margin.left + (pointRadius * 2) + 5;
            y = ev.layerY - margin.top - 5;
        }

        if ((x > margin.left) && (y > margin.top)) {
            const radius = pointRadius + 4;
            for (let i = 0; i < finalDataPoints.length; i++) {
                let pt = finalDataPoints[i];
                let xMin = pt.x - radius;
                let xMax = pt.x + radius;
                let yMin = pt.y - radius;
                let yMax = pt.y + radius;
                if ((x >= xMin && x <= xMax) && (y >= yMin && y <= yMax)) {
                    clearCircle(pt.x, pt.y);
                    renderCircle(pt.x, pt.y, 'Red');
                    selectedDataPoint = pt;
                    showOverlay(pt);
                    // document.getElementById('output').innerHTML += '<br />' + x + " " + y;
                    break;
                } else {
                  if (selectedDataPoint != null) {
                    overlayDiv.style.display = 'none';
                    clearCircle(selectedDataPoint.x, selectedDataPoint.y);
                    renderCircle(selectedDataPoint.x, selectedDataPoint.y, 'red');
                    selectedDataPoint = null;
                  }
                }
            }
        }
      },

      clearCircle = (x, y) => {
        // clear out with white to avoid duplicated borders
        this.ctx.beginPath();
        this.ctx.fillStyle = 'white';
        this.ctx.arc(x, y, pointRadius + 1, 0, 2 * Math.PI, false);
        this.ctx.fill();
        this.ctx.closePath();
      },

      showOverlay = (pt) => {
        overlayDiv.innerHTML = pt.originalY;
        overlayDiv.style.left = pt.x + 'px';
        overlayDiv.style.top = pt.y + 'px';
        overlayDiv.style.display = 'block';
      };

      return {
        render: render,
        renderType: renderType
      };
    }

    const chart = canvasGraph();
    const dataAndSettings = {
        title: 'US Population Chart',
        animatePoints: true,
        animationSpeed: true,
        xLabel: 'Year',
        yLabel: 'Population (millions)',
        labelFont: '19pt Arial',
        dataPointFont: '10pt Arial',
        renderTypes: [chart.renderType.lines, chart.renderType.points],
        dataPoints: [{x: '1790', y: 3.9 },
        {x: '1810', y: 7.2},
        {x: '1830', y: 12.8},
        {x: '1850', y: 23.1},
        {x: '1870', y: 36.5},
        {x: '1890', y: 62.9},
        {x: '1910', y: 92.2},
        {x: '1930', y: 123.2},
        {x: '1950', y: 151.3},
        {x: '1970', y: 203.2},
        {x: '1990', y: 248.7},
        {x: '2010', y: 308.7}]

    };
    chart.render('ani', dataAndSettings);
  }

  /* For circle animation
  animate() {
    this.update();
    this.draw();
    window.requestAnimationFrame(() => {this.animate()});
  }

  update(): void {
    // Move to right until we reach canvas width
    if (this.dir > 0) {
      this.dir = (this.posX < this.canvasWidth - this.radius) ? 1 : -1;
    }

    // Move to left until we reach 0
    if (this.dir < 0) {
      this.dir = (this.posX > 0 + this.radius) ? -1 : 1;
    }
    this.posX += this.speed * this.dir;
  }

  draw(): void {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    this.ctx.fillStyle = 'Green';
    this.ctx.beginPath();
    this.ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
    this.ctx.closePath();
    this.ctx.fill();
  }
*/



}
