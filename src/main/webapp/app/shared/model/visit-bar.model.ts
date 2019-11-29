import { Moment } from 'moment';

export interface IVisitBar {
  id?: number;
  visitId?: number;
  visitType?: string;
  visitTime?: Moment;
  seenTime?: Moment;
  deptCode?: number;
  deptName?: string;
  clinicCode?: number;
  clinicName?: string;
  consultantCode?: number;
  consultantName?: string;
}

export class VisitBar implements IVisitBar {
  constructor(
    public id?: number,
    public visitId?: number,
    public visitType?: string,
    public visitTime?: Moment,
    public seenTime?: Moment,
    public deptCode?: number,
    public deptName?: string,
    public clinicCode?: number,
    public clinicName?: string,
    public consultantCode?: number,
    public consultantName?: string
  ) {}
}
