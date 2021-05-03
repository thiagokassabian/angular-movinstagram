import { Component, OnInit } from '@angular/core';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	title = 'Movinstagram';
	windowScrolled: boolean = false;
	faAngleUp = faAngleUp;
	faFilm = faFilm;

	ngOnInit(): void {
		window.addEventListener('scroll', this.onWindowScroll);
	}

	onWindowScroll = (event: any) => {
		if (
			(window.pageYOffset ||
				document.documentElement.scrollTop ||
				document.body.scrollTop) > 100
		) {
			this.windowScrolled = true;
		} else if (
			((this.windowScrolled && window.pageYOffset) ||
				document.documentElement.scrollTop ||
				document.body.scrollTop) < 10
		) {
			this.windowScrolled = false;
		}
	};

	scrollToTop = (event: any) => {
		event.target.blur();
		document.documentElement.scrollTop = 0;
		document.body.scrollTop = 0;
	};
}
