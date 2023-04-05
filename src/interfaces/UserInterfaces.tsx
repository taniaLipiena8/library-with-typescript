export interface IUser{
    user_id: string,
    username: string
}

export interface LoginData{
    data:IUser
}

export interface IUserLogin{
    email: string,
    password: string
}