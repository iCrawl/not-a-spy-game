import { Pipe, PipeTransform } from '@angular/core';
import { Role, User } from '@codenames/models';

@Pipe({
	name: 'highlightPlayer',
})
export class HighlightPlayerPipe implements PipeTransform {
	public transform(value: Pick<User, 'name' | 'role'>) {
		return value.role === Role.SPYMASTER ? `[ ${value.name} ]` : value.name;
	}
}
