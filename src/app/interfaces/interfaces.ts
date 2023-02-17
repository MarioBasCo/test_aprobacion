export interface IUser {
    uid?: string;
    email: string;
    username: string;
    password: string;
}

export interface IMeal {
    uid?: string;
    strMeal: string;
    strCategory: string;
    strInstructions: string;
    strMealThumb: string;
    likes?: number
}

export interface ILike {
    uid: string;
    date: any;
    like: boolean;
}

export interface IComment {
    uid: string;
    user: any;
    date: any;
    detail: string;
}