import { Component } from '../base/Сomponent';

export interface ICardContainer {
	catalog: HTMLElement[];
}

export class CardContainer extends Component<ICardContainer> {
	protected _catalog: HTMLElement;

	constructor(protected container: HTMLElement) {
		super(container);
	}

	set catalog(items: HTMLElement[]) {
		this.container.replaceChildren(...items);
	}
}
