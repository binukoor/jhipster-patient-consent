import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IConsentFrom, ConsentFrom } from 'app/shared/model/consent-from.model';
import { ConsentFromService } from './consent-from.service';
import { IConsent } from 'app/shared/model/consent.model';
import { ConsentService } from 'app/entities/consent/consent.service';

@Component({
  selector: 'jhi-consent-from-update',
  templateUrl: './consent-from-update.component.html'
})
export class ConsentFromUpdateComponent implements OnInit {
  isSaving: boolean;

  consents: IConsent[];

  editForm = this.fb.group({
    id: [],
    isVerified: [],
    verifiedBy: [null, [Validators.required]],
    verifiedTime: [],
    consent: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected consentFromService: ConsentFromService,
    protected consentService: ConsentService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ consentFrom }) => {
      this.updateForm(consentFrom);
    });
    this.consentService
      .query()
      .subscribe((res: HttpResponse<IConsent[]>) => (this.consents = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(consentFrom: IConsentFrom) {
    this.editForm.patchValue({
      id: consentFrom.id,
      isVerified: consentFrom.isVerified,
      verifiedBy: consentFrom.verifiedBy,
      verifiedTime: consentFrom.verifiedTime != null ? consentFrom.verifiedTime.format(DATE_TIME_FORMAT) : null,
      consent: consentFrom.consent
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const consentFrom = this.createFromForm();
    if (consentFrom.id !== undefined) {
      this.subscribeToSaveResponse(this.consentFromService.update(consentFrom));
    } else {
      this.subscribeToSaveResponse(this.consentFromService.create(consentFrom));
    }
  }

  private createFromForm(): IConsentFrom {
    return {
      ...new ConsentFrom(),
      id: this.editForm.get(['id']).value,
      isVerified: this.editForm.get(['isVerified']).value,
      verifiedBy: this.editForm.get(['verifiedBy']).value,
      verifiedTime:
        this.editForm.get(['verifiedTime']).value != null ? moment(this.editForm.get(['verifiedTime']).value, DATE_TIME_FORMAT) : undefined,
      consent: this.editForm.get(['consent']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IConsentFrom>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackConsentById(index: number, item: IConsent) {
    return item.id;
  }
}
