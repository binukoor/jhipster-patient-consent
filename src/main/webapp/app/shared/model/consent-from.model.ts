import { Moment } from 'moment';
import { IConsent } from 'app/shared/model/consent.model';

export interface IConsentFrom {
  id?: number;
  isVerified?: boolean;
  verifiedBy?: string;
  verifiedTime?: Moment;
  consent?: IConsent;
}

export class ConsentFrom implements IConsentFrom {
  constructor(
    public id?: number,
    public isVerified?: boolean,
    public verifiedBy?: string,
    public verifiedTime?: Moment,
    public consent?: IConsent
  ) {
    this.isVerified = this.isVerified || false;
  }
}
