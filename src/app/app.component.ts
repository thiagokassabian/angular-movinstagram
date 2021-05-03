import { Component } from '@angular/core';
import { faFilm } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	title = 'Movinstagram';
	faFilm = faFilm;
}
