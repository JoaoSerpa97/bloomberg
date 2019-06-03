
export class Media {
  id: number
  author: string;
  name: string;
  date_published: number;
  date_added: number;
  mgenre: string;
  mtype: string
  description: string;
  img: string;
}
export class User {
  user: UserImg;
  admin: UserSpecs;
}

export class UserRegister {
  username : string;
  password : string;
  email : string;
}

export class UserImg {
  id: number;
  img: string;
}

export class UserSpecs {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  date_joined: string;
  last_login: string;
  is_superuser: boolean;
  password: string;


}

export class Review {
  id: number;
  rate: number;
  media_name: string;
  username: string;
  review: string;
  author: number;
  media: number;
  img: string;
}

export class MediaAuthor {
  id: number;
  name: string;
  surname: string;
  img: string;
}

export class AuthToken {
  token: string;
}
