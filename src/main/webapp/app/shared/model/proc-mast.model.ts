export interface IProcMast {
  id?: number;
  procCode?: number;
  procName?: string;
}

export class ProcMast implements IProcMast {
  constructor(public id?: number, public procCode?: number, public procName?: string) {}
}
