import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'imgPath',
})
export class ImgPathPipe implements PipeTransform {
	transform(value: unknown): unknown {
		return `assets/img/${value}.png`;
	}
}
