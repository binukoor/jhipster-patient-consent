import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IConsentDiag, ConsentDiag } from 'app/shared/model/consent-diag.model';
import { ConsentDiagService } from './consent-diag.service';
import { IIcdMast } from 'app/shared/model/icd-mast.model';
import { IcdMastService } from 'app/entities/icd-mast/icd-mast.service';
import { IConsent } from 'app/shared/model/consent.model';
import { ConsentService } from 'app/entities/consent/consent.service';

@Component({
  selector: 'jhi-consent-diag-update',
  templateUrl: './consent-diag-update.component.html'
})
export class ConsentDiagUpdateComponent implements OnInit {
  isSaving: boolean;

  icds: IIcdMast[];

  consents: IConsent[];

  editForm = this.fb.group({
    id: [],
    description: [],
    icd: [],
    consent: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected consentDiagService: ConsentDiagService,
    protected icdMastService: IcdMastService,
    protected consentService: ConsentService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ consentDiag }) => {
      this.updateForm(consentDiag);
    });
    this.icdMastService.query({ filter: 'consentdiag-is-null' }).subscribe(
      (res: HttpResponse<IIcdMast[]>) => {
        if (!this.editForm.get('icd').value || !this.editForm.get('icd').value.id) {
          this.icds = res.body;
        } else {
          this.icdMastService
            .find(this.editForm.get('icd').value.id)
            .subscribe(
              (subRes: HttpResponse<IIcdMast>) => (this.icds = [subRes.body].concat(res.body)),
              (subRes: HttpErrorResponse) => this.onError(subRes.message)
            );
        }
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
    this.consentService
      .query()
      .subscribe((res: HttpResponse<IConsent[]>) => (this.consents = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(consentDiag: IConsentDiag) {
    this.editForm.patchValue({
      id: consentDiag.id,
      description: consentDiag.description,
      icd: consentDiag.icd,
      consent: consentDiag.consent
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const consentDiag = this.createFromForm();
    if (consentDiag.id !== undefined) {
      this.subscribeToSaveResponse(this.consentDiagService.update(consentDiag));
    } else {
      this.subscribeToSaveResponse(this.consentDiagService.create(consentDiag));
    }
  }

  private createFromForm(): IConsentDiag {
    return {
      ...new ConsentDiag(),
      id: this.editForm.get(['id']).value,
      description: this.editForm.get(['description']).value,
      icd: this.editForm.get(['icd']).value,
      consent: this.editForm.get(['consent']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IConsentDiag>>) {
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

  trackIcdMastById(index: number, item: IIcdMast) {
    return item.id;
  }

  trackConsentById(index: number, item: IConsent) {
    return item.id;
  }
}
