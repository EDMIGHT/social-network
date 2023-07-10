export interface Post {
  id: string;
  text: string | null;
  img: string | null;
  viewsCount: number;
  createdAt: Date;
  updatedAt: Date | null;
  userId: string;
}
