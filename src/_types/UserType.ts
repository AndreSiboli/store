export interface UserType {
  id: string;
  username: string;
  email: string;
  favorites: {
    _id: string;
  }[];
  cart: {
    _id: string;
    how_many: number
  }[];
  createdAt: Date;
}
