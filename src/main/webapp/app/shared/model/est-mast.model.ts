export interface IEstMast {
  id?: number;
  estCode?: number;
  estName?: string;
}

export class EstMast implements IEstMast {
  constructor(public id?: number, public estCode?: number, public estName?: string) {}
}
