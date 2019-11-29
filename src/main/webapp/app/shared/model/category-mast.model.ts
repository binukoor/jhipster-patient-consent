export interface ICategoryMast {
  id?: number;
  catCode?: number;
  category?: string;
}

export class CategoryMast implements ICategoryMast {
  constructor(public id?: number, public catCode?: number, public category?: string) {}
}
