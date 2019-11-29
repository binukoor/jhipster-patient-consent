import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IConsentProcs, ConsentProcs } from 'app/shared/model/consent-procs.model';
import { ConsentProcsService } from './consent-procs.service';
import { IProcMast } from 'app/shared/model/proc-mast.model';
import { ProcMastService } from 'app/entities/proc-mast/proc-mast.service';
import { IConsent } from 'app/shared/model/consent.model';
import { ConsentService } from 'app/entities/consent/consent.service';

@Component({
  selector: 'jhi-consent-procs-update',
  templateUrl: './consent-procs-update.component.html'
})
export class ConsentProcsUpdateComponent implements OnInit {
  isSaving: boolean;

  proccodes: IProcMast[];

  consents: IConsent[];

  editForm = this.fb.group({
    id: [],
    description: [],
    procCode: [],
    consent: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected consentProcsService: ConsentProcsService,
    protected procMastService: ProcMastService,
    protected consentService: ConsentService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ consentProcs }) => {
      this.updateForm(consentProcs);
    });
    this.procMastService.query({ filter: 'consentprocs-is-null' }).subscribe(
      (res: HttpResponse<IProcMast[]>) => {
        if (!this.editForm.get('procCode').value || !this.editForm.get('procCode').value.id) {
          this.proccodes = res.body;
        } else {
          this.procMastService
            .find(this.editForm.get('procCode').value.id)
            .subscribe(
              (subRes: HttpResponse<IProcMast>) => (this.proccodes = [subRes.body].concat(res.body)),
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

  updateForm(consentProcs: IConsentProcs) {
    this.editForm.patchValue({
      id: consentProcs.id,
      description: consentProcs.description,
      procCode: consentProcs.procCode,
      consent: consentProcs.consent
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const consentProcs = this.createFromForm();
    if (consentProcs.id !== undefined) {
      this.subscribeToSaveResponse(this.consentProcsService.update(consentProcs));
    } else {
      this.subscribeToSaveResponse(this.consentProcsService.create(consentProcs));
    }
  }

  private createFromForm(): IConsentProcs {
    return {
      ...new ConsentProcs(),
      id: this.editForm.get(['id']).value,
      description: this.editForm.get(['description']).value,
      procCode: this.editForm.get(['procCode']).value,
      consent: this.editForm.get(['consent']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IConsentProcs>>) {
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

  trackProcMastById(index: number, item: IProcMast) {
    return item.id;
  }

  trackConsentById(index: number, item: IConsent) {
    return item.id;
  }
}
