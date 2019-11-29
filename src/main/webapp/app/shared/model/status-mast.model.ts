export interface IStatusMast {
  id?: number;
  statusCode?: number;
  status?: string;
}

export class StatusMast implements IStatusMast {
  constructor(public id?: number, public statusCode?: number, public status?: string) {}
}
