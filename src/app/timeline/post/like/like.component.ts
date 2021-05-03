import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';

@Component({
	selector: 'like',
	templateUrl: './like.component.html',
	styleUrls: ['./like.component.scss'],
})
export class LikeComponent implements OnInit {
	constructor() {}

	@Input() isLike!: boolean;
	@Output() likeChange = new EventEmitter();

	fasHeart = fasHeart;
	farHeart = farHeart;

	ngOnInit(): void {}

	likeClick = () => {
		this.likeChange.emit();
	};
}
