export interface IPersonMast {
  id?: number;
  persCode?: number;
  personName?: string;
}

export class PersonMast implements IPersonMast {
  constructor(public id?: number, public persCode?: number, public personName?: string) {}
}
