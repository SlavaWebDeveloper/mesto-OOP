import { IEvents } from '../base/events';
import { Modal } from '../common/Modal';

export interface IModalWithConfirm {
	valid: boolean;
	submitCallback: Function;
}

export class ModalWithConfirm extends Modal<IModalWithConfirm> {
	protected submitButton: HTMLButtonElement;
	protected _form: HTMLFormElement;
	protected formName: string;
	protected _handleSubmit: Function;

	constructor(container: HTMLElement, events: IEvents) {
		super(container, events);

		this._form = this.container.querySelector('.popup__form');
		this.submitButton = this._form.querySelector('.popup__button');
		this.formName = this._form.getAttribute('name');
		this._form.addEventListener('submit', (evt) => {
			evt.preventDefault;
			this.events.emit(`${this.formName}:submit`, {
				submitCallback: this.handleSubmit,
			});
		});
	}

	set valid(isValid: boolean) {
		this.submitButton.classList.toggle('popup__button_disabled', !isValid);
		this.submitButton.disabled = !isValid;
	}

	get form() {
		return this._form;
	}

	set handleSubmit(submitFuntion: Function) {
		this._handleSubmit = submitFuntion;
	}
}
