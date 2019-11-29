import { IIcdMast } from 'app/shared/model/icd-mast.model';
import { IConsent } from 'app/shared/model/consent.model';

export interface IConsentDiag {
  id?: number;
  description?: string;
  icd?: IIcdMast;
  consent?: IConsent;
}

export class ConsentDiag implements IConsentDiag {
  constructor(public id?: number, public description?: string, public icd?: IIcdMast, public consent?: IConsent) {}
}
