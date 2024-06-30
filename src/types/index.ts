export interface ICard {
	likes: IUser[];
	_id: string;
	name: string;
	link: string;
	owner: IUser;
	createdAt: string;
}

export interface IUser {
	name: string;
	about: string;
	avatar: string;
	_id: string;
	cohort: string;
}

export interface ICardsData {
	cards: ICard[];
	preview: string | null;
	addCard(card: ICard): void;
	deleteCard(cardId: string, payload: Function | null): void;
	updateCard(card: ICard, payload: Function | null): void;
	getCard(cardId: string): ICard;
	checkValidation(data: Record<keyof TCardInfo, string>): boolean;
}

export interface IUserData {
	getUserInfo(): TUserPublicInfo;
	setUserInfo(userData: IUser): void;
	checkUserValidation(data: Record<keyof TUserPublicInfo, string>): boolean;
}

export type TCardInfo = Pick<ICard, 'name' | 'link'>;

export type TUserPublicInfo = Pick<IUser, 'name' | 'about' | 'avatar'>;

export type TUserBaseInfo = Pick<IUser, 'name' | 'about'>;

export type TUserAvatar = Pick<IUser, 'avatar'>;

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface IApi {
	baseUrl: string;
	get<T>(uri: string): Promise<T>;
	post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}
