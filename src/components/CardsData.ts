import validate from 'validate.js';
import { ICard, ICardsData, TCardInfo } from '../types';
import { IEvents } from './base/events';
import { constraintsCard } from '../utils/constants';

export class CardData implements ICardsData {
	protected _cards: ICard[];
	protected _preview: string | null;
	protected events: IEvents;

	constructor(events: IEvents) {
		this.events = events;
	}

	set cards(cards: ICard[]) {
		this._cards = cards;
		this.events.emit('cards:changed');
	}

	get cards() {
		return this._cards;
	}

	addCard(card: ICard) {
		this._cards = [card, ...this._cards];
		this.events.emit('cards:changed');
	}

	deleteCard(cardId: string, payload: Function | null = null) {
		this._cards = this._cards.filter((card) => card._id !== cardId);

		if (payload) {
			payload();
		} else {
			this.events.emit('cards:changed');
		}
	}

	updateCard(card: ICard, payload: Function | null = null) {
		const findedCard = this._cards.find((item) => item._id === card._id);
		if (!findedCard) this.addCard(card);

		Object.assign(findedCard, card);

		if (payload) {
			payload();
		} else {
			this.events.emit('cards:changed');
		}
	}

	getCard(cardId: string) {
		return this._cards.find((item) => item._id === cardId);
	}

	set preview(cardId: string | null) {
		if (!cardId) {
			this._preview = null;
			return;
		}
		const selectedCard = this.getCard(cardId);
		if (selectedCard) {
			this._preview = cardId;
			this.events.emit('card:selected');
		}
	}

	checkValidation(data: Record<keyof TCardInfo, string>) {
		const isValid = !Boolean(validate(data, constraintsCard));
		return isValid;
	}

	checkField(data: { field: keyof TCardInfo; value: string }) {
		switch (data.field) {
			case 'name':
				return this.checkName(data.value);
			case 'link':
				return this.checkLink(data.value);
		}
	}

	checkName(value: string) {
		const result = validate.single(value, constraintsCard.name);
		if (result) {
			return result[0];
		} else {
			return '';
		}
	}

	checkLink(value: string) {
		const result = validate.single(value, constraintsCard.link);
		if (result) {
			return result[0];
		} else {
			return '';
		}
	}

	get preview() {
		return this._preview;
	}
}
