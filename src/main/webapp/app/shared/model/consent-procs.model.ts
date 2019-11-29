import { IProcMast } from 'app/shared/model/proc-mast.model';
import { IConsent } from 'app/shared/model/consent.model';

export interface IConsentProcs {
  id?: number;
  description?: string;
  procCode?: IProcMast;
  consent?: IConsent;
}

export class ConsentProcs implements IConsentProcs {
  constructor(public id?: number, public description?: string, public procCode?: IProcMast, public consent?: IConsent) {}
}
