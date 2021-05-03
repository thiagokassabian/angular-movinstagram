import {
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
	AfterViewInit,
} from '@angular/core';
import { Comment } from '../../comment';
import { Like } from '../../like';
import { Post } from '../../post';
import { TimelineService } from '../../timeline.service';
import { v4 as uuidv4 } from 'uuid';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

declare var $: any;

@Component({
	selector: 'post',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit, AfterViewInit {
	@Input() post!: Post;
	@Input() set actualUser(user: string) {
		this.activeUser = user;
		if (!this.isFirstCheckLike) {
			this.isLiked();
		}
	}

	@Output() incrementCommentCount = new EventEmitter<number>();
	@Output() incrementLikeCount = new EventEmitter<number>();
	@Output() decrementLikeCount = new EventEmitter<number>();

	faComment = faComment;
	faAngleRight = faAngleRight;
	comments: Comment[] = [];
	likes: Like[] = [];
	isLike: boolean = false;
	activeUser: string = '';
	isFirstCheckLike: boolean = true;
	commentText: string = '';

	constructor(private timelineService: TimelineService) {}

	ngOnInit(): void {
		const postId = this.post.id;

		this.timelineService.getComments(postId).subscribe((response) => {
			this.comments = response;
		});

		this.timelineService.getLikes(postId).subscribe((response) => {
			this.likes = response;
			this.isLiked();
			this.isFirstCheckLike = false;
		});

		$('[data-toggle="popover"]').popover();
	}
	ngAfterViewInit(): void {
		$('[data-toggle="tooltip"]').tooltip();
	}

	isLiked = () => {
		if (this.findLike()) {
			this.isLike = true;
		} else {
			this.isLike = false;
		}
	};

	findLike = () => {
		const found = this.likes.find((element) => element.user == this.activeUser);
		return found;
	};

	likeChange = () => {
		if (this.isLike) {
			const foundLike = this.findLike()!;
			this.timelineService.removeLike(foundLike.id).subscribe(() => {
				this.isLike = false;
				const index = this.likes.indexOf(foundLike);
				if (index > -1) this.likes.splice(index, 1);
				this.decrementLike();
			});
		} else {
			const like: Like = {
				id: uuidv4(),
				postId: this.post.id,
				user: this.activeUser,
			};
			this.timelineService.addLike(like).subscribe((response) => {
				this.isLike = true;
				this.likes.push(response);
				this.incrementLike();
			});
		}
	};

	addComment = (commentText: string) => {
		if (commentText) {
			const comment: Comment = {
				id: uuidv4(),
				comment: commentText,
				user: this.activeUser,
				postId: this.post.id,
			};
			this.timelineService.addComment(comment).subscribe((response) => {
				this.comments.push(response);
				this.commentText = '';
				this.incrementComment();
			});
		}
	};

	incrementComment = () => {
		this.incrementCommentCount.emit();
	};
	incrementLike = () => {
		this.incrementLikeCount.emit();
	};
	decrementLike = () => {
		this.decrementLikeCount.emit();
	};
}
