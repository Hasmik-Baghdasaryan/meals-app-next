export type RawCategory = {
  idCategory?: string;
  strCategory?: string;
  strCategoryThumb?: string | null;
  strCategoryDescription?: string | null;
};

export type Category = {
  id: string;
  name: string;
  thumb: string;
  description: string;
};
