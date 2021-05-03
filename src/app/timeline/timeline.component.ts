import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { TimelineService } from '../timeline.service';

@Component({
	selector: 'app-timeline',
	templateUrl: './timeline.component.html',
	styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements OnInit {
	constructor(private timelineService: TimelineService) {}

	posts: Post[] = [];
	bestFriends: string[] = [];
	actualUser: string = 'superman';
	//users: string[] = [];
	selectedUser: string = '';
	notEmptyPost: boolean = true;
	notScrolly: boolean = true;
	spinner: boolean = false;
	startPage: number = 0;
	limitPage: number = 2;
	totalPosts: number = 0;
	totalComments: number = 0;
	totalLikes: number = 0;
	timeline: string = 'superman';
	users: string[] = [
		'antman',
		'aquaman',
		'batman',
		'blackWidow',
		'captainAmerica',
		'captainMarvel',
		'greenLantern',
		'ironMan',
		'spiderMan',
		'superman',
		'thor',
		'wonderWoman',
	];

	ngOnInit(): void {
		this.getPosts(this.startPage, this.limitPage);

		this.timelineService.getBestFriends().subscribe((response) => {
			this.bestFriends = response;
			//this.users = [this.actualUser, ...this.bestFriends];
		});

		this.timelineService.getAllLikes().subscribe((response) => {
			this.totalLikes = response.length;
		});

		this.timelineService.getAllComments().subscribe((response) => {
			this.totalComments = response.length;
		});
	}

	onScroll = () => {
		if (this.notScrolly && this.notEmptyPost) {
			this.spinner = true;
			this.notScrolly = false;
			this.getPosts(this.startPage, this.limitPage);
		}
	};

	getPosts = (start: number, limit: number) => {
		this.timelineService.getPosts(start, limit).subscribe((response) => {
			this.totalPosts = +response.headers.get('X-Total-Count')!;
			this.spinner = false;
			const newPosts = response.body!;
			if (newPosts.length === 0) {
				this.notEmptyPost = false;
			} else {
				this.posts = this.posts.concat(newPosts);
				this.notScrolly = true;
				this.startPage += this.limitPage;
			}
		});
	};

	incrementComment = () => {
		this.totalComments++;
	};
	incrementLike = () => {
		this.totalLikes++;
	};
	decrementLike = () => {
		this.totalLikes--;
	};
}
