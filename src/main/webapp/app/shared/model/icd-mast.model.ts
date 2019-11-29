export interface IIcdMast {
  id?: number;
  icd?: string;
  disease?: string;
}

export class IcdMast implements IIcdMast {
  constructor(public id?: number, public icd?: string, public disease?: string) {}
}
