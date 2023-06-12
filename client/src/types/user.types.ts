export interface User {
  id: string;
  login: string;
  img: string;
  name: string | null;
  email: string | null;
  password: string;
  createdAt: Date;
}
