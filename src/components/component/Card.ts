import { ICard, IUser } from '../../types';
import { cloneTemplate } from '../../utils/utils';
import { IEvents } from '../base/events';
import { Component } from '../base/Сomponent';

export class Card extends Component<ICard> {
	protected element: HTMLElement;
	protected events: IEvents;
	protected likeButton: HTMLButtonElement;
	protected likesCount: HTMLElement;
	protected deleteButton: HTMLButtonElement;
	protected cardImage: HTMLDivElement;
	protected cardTitle: HTMLElement;
	protected cardId: string;

	constructor(protected container: HTMLElement, events: IEvents) {
		super(container);
		this.events = events;

		this.likeButton = this.container.querySelector('.card__like-button');
		this.likesCount = this.container.querySelector('.card__like-count');
		this.deleteButton = this.container.querySelector('.card__delete-button');
		this.cardImage = this.container.querySelector('.card__image');
		this.cardTitle = this.container.querySelector('.card__title');

		this.cardImage.addEventListener('click', () => {
			this.events.emit('card:select', { card: this });
		});

		this.deleteButton.addEventListener('click', () => {
			this.events.emit('card:delete', { card: this });
		});

		this.likeButton.addEventListener('click', () => {
			this.events.emit('card:like', { card: this, isLike: this.isLiked() });
		});
	}

	isLiked() {
		return this.likeButton.classList.contains('card__like-button_is-active');
	}

	render(data?: Partial<ICard>): HTMLElement;
	render(cardData: Partial<ICard>, userId: string): HTMLElement;

	render(cardData: Partial<ICard> | undefined, userId?: string) {
		if (!cardData) return this.container;

		const { likes, owner, ...otherCardData } = cardData;

		if (userId) {
			if (likes) this.likes = { likes, userId };
			if (owner) this.owner = { owner, userId };
		}

		return super.render(otherCardData);
	}

	set name(name: string) {
		this.cardTitle.textContent = name;
	}

	set link(link: string) {
		this.cardImage.style.backgroundImage = `url(${link})`;
	}

	set owner({ owner, userId }: { owner: IUser; userId: string }) {
		if (owner._id !== userId) {
			this.deleteButton.style.display = 'none';
		} else {
			this.deleteButton.style.display = 'inherit';
		}
	}

	set likes({ likes, userId }: { likes: IUser[]; userId: string }) {
		const cardIsLiked = likes.some((like) => like._id === userId);

		this.likeButton.classList.toggle(
			'card__like-button_is-active',
			cardIsLiked
		);

		this.likesCount.textContent = String(likes.length);
	}

	set _id(id: string) {
		this.cardId = id;
	}

	get _id() {
		return this.cardId;
	}

	deleteCard() {
		this.element.remove();
		this.element = null;
	}
}
