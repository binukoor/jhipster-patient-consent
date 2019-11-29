import { IPatientBar } from 'app/shared/model/patient-bar.model';
import { IVisitBar } from 'app/shared/model/visit-bar.model';
import { IEstMast } from 'app/shared/model/est-mast.model';
import { IStatusMast } from 'app/shared/model/status-mast.model';
import { ICategoryMast } from 'app/shared/model/category-mast.model';
import { IScopeMast } from 'app/shared/model/scope-mast.model';
import { IPersonMast } from 'app/shared/model/person-mast.model';
import { IConsentProcs } from 'app/shared/model/consent-procs.model';
import { IConsentDiag } from 'app/shared/model/consent-diag.model';
import { IConsentFrom } from 'app/shared/model/consent-from.model';

export interface IConsent {
  id?: number;
  consentId?: number;
  description?: string;
  indicationBenefits?: string;
  complications?: string;
  alternatives?: string;
  patient?: IPatientBar;
  visit?: IVisitBar;
  institute?: IEstMast;
  status?: IStatusMast;
  category?: ICategoryMast;
  scope?: IScopeMast;
  createdBy?: IPersonMast;
  procs?: IConsentProcs[];
  diags?: IConsentDiag[];
  verifiers?: IConsentFrom[];
}

export class Consent implements IConsent {
  constructor(
    public id?: number,
    public consentId?: number,
    public description?: string,
    public indicationBenefits?: string,
    public complications?: string,
    public alternatives?: string,
    public patient?: IPatientBar,
    public visit?: IVisitBar,
    public institute?: IEstMast,
    public status?: IStatusMast,
    public category?: ICategoryMast,
    public scope?: IScopeMast,
    public createdBy?: IPersonMast,
    public procs?: IConsentProcs[],
    public diags?: IConsentDiag[],
    public verifiers?: IConsentFrom[]
  ) {}
}
