export interface IPatientBar {
  id?: number;
  patientId?: number;
  patientNo?: string;
  patientName?: string;
  age?: string;
  gender?: string;
}

export class PatientBar implements IPatientBar {
  constructor(
    public id?: number,
    public patientId?: number,
    public patientNo?: string,
    public patientName?: string,
    public age?: string,
    public gender?: string
  ) {}
}
