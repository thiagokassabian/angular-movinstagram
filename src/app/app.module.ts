import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ImgPathPipe } from './img-path.pipe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TimelineComponent } from './timeline/timeline.component';
import { PostComponent } from './timeline/post/post.component';
import { LikeComponent } from './timeline/post/like/like.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastsComponent } from './toasts/toasts.component';

@NgModule({
	declarations: [
		AppComponent,
		ImgPathPipe,
		TimelineComponent,
		PostComponent,
		LikeComponent,
  ToastsComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FontAwesomeModule,
		HttpClientModule,
		FormsModule,
		InfiniteScrollModule,
		NgbModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
