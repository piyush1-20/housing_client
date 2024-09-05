export interface UserToRegister {
    userName?: string;
    userEmail: string;
    password: string;
    mobile?: number;
  }
  export interface UserForLogin {
    id:number;
    userEmail: string;
    password: string;
    token:string
  }
