export interface IScopeMast {
  id?: number;
  scopeCode?: number;
  scope?: string;
}

export class ScopeMast implements IScopeMast {
  constructor(public id?: number, public scopeCode?: number, public scope?: string) {}
}
