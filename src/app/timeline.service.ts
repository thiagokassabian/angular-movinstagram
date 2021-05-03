import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post';
import { Comment } from './comment';
import { Like } from './like';

const urlBase = 'http://localhost:3000';

@Injectable({
	providedIn: 'root',
})
export class TimelineService {
	constructor(private http: HttpClient) {}

	getPosts = (start: number, limit: number) => {
		return this.http.get<Post[]>(
			`${urlBase}/posts?_start=${start}&_limit=${limit}`,
			{ observe: 'response' }
		);
	};

	getComments = (postId: string) => {
		return this.http.get<Comment[]>(`${urlBase}/comments?postId=${postId}`);
	};

	getAllComments = () => {
		return this.http.get<Comment[]>(`${urlBase}/comments`);
	};

	getLikes = (postId: string) => {
		return this.http.get<Like[]>(`${urlBase}/likes?postId=${postId}`);
	};

	getAllLikes = () => {
		return this.http.get<Like[]>(`${urlBase}/likes`);
	};

	addLike = (like: Like) => {
		return this.http.post<Like>(`${urlBase}/likes`, like);
	};

	removeLike = (id: string) => {
		return this.http.delete(`${urlBase}/likes/${id}`);
	};

	getBestFriends = () => {
		return this.http.get<[]>(`${urlBase}/bestFriends`);
	};

	addComment = (comment: Comment) => {
		return this.http.post<Comment>(`${urlBase}/comments`, comment);
	};
}
