export interface Test {
  test: Number;
}

export interface Category {
  name: string;
  description: string;
}

export interface CategoryState {
  category: Category[];
}

export interface BlogState {
  id: string;
}

export interface HomeState {
  user: {};
}
export enum CommonStatus {
  IDLE,
  LOADING,
  SUCCESS,
  ERROR,
}
