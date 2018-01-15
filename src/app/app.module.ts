import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CanvasComponent } from './canvas/canvas.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ImageService } from 'app/image.service';
import { VideoComponent } from './video/video.component';
import { AnimationComponent } from './animation/animation.component';

@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    GalleryComponent,
    VideoComponent,
    AnimationComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [ImageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
