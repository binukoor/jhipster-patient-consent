import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IConsent, Consent } from 'app/shared/model/consent.model';
import { ConsentService } from './consent.service';
import { IPatientBar } from 'app/shared/model/patient-bar.model';
import { PatientBarService } from 'app/entities/patient-bar/patient-bar.service';
import { IVisitBar } from 'app/shared/model/visit-bar.model';
import { VisitBarService } from 'app/entities/visit-bar/visit-bar.service';
import { IEstMast } from 'app/shared/model/est-mast.model';
import { EstMastService } from 'app/entities/est-mast/est-mast.service';
import { IStatusMast } from 'app/shared/model/status-mast.model';
import { StatusMastService } from 'app/entities/status-mast/status-mast.service';
import { ICategoryMast } from 'app/shared/model/category-mast.model';
import { CategoryMastService } from 'app/entities/category-mast/category-mast.service';
import { IScopeMast } from 'app/shared/model/scope-mast.model';
import { ScopeMastService } from 'app/entities/scope-mast/scope-mast.service';
import { IPersonMast } from 'app/shared/model/person-mast.model';
import { PersonMastService } from 'app/entities/person-mast/person-mast.service';

@Component({
  selector: 'jhi-consent-update',
  templateUrl: './consent-update.component.html'
})
export class ConsentUpdateComponent implements OnInit {
  isSaving: boolean;

  patients: IPatientBar[];

  visits: IVisitBar[];

  institutes: IEstMast[];

  statuses: IStatusMast[];

  categories: ICategoryMast[];

  scopes: IScopeMast[];

  createdbies: IPersonMast[];

  editForm = this.fb.group({
    id: [],
    consentId: [null, [Validators.required]],
    description: [],
    indicationBenefits: [],
    complications: [],
    alternatives: [],
    patient: [],
    visit: [],
    institute: [],
    status: [],
    category: [],
    scope: [],
    createdBy: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected consentService: ConsentService,
    protected patientBarService: PatientBarService,
    protected visitBarService: VisitBarService,
    protected estMastService: EstMastService,
    protected statusMastService: StatusMastService,
    protected categoryMastService: CategoryMastService,
    protected scopeMastService: ScopeMastService,
    protected personMastService: PersonMastService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ consent }) => {
      this.updateForm(consent);
    });
    this.patientBarService.query({ filter: 'consent-is-null' }).subscribe(
      (res: HttpResponse<IPatientBar[]>) => {
        if (!this.editForm.get('patient').value || !this.editForm.get('patient').value.id) {
          this.patients = res.body;
        } else {
          this.patientBarService
            .find(this.editForm.get('patient').value.id)
            .subscribe(
              (subRes: HttpResponse<IPatientBar>) => (this.patients = [subRes.body].concat(res.body)),
              (subRes: HttpErrorResponse) => this.onError(subRes.message)
            );
        }
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
    this.visitBarService.query({ filter: 'consent-is-null' }).subscribe(
      (res: HttpResponse<IVisitBar[]>) => {
        if (!this.editForm.get('visit').value || !this.editForm.get('visit').value.id) {
          this.visits = res.body;
        } else {
          this.visitBarService
            .find(this.editForm.get('visit').value.id)
            .subscribe(
              (subRes: HttpResponse<IVisitBar>) => (this.visits = [subRes.body].concat(res.body)),
              (subRes: HttpErrorResponse) => this.onError(subRes.message)
            );
        }
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
    this.estMastService.query({ filter: 'consent-is-null' }).subscribe(
      (res: HttpResponse<IEstMast[]>) => {
        if (!this.editForm.get('institute').value || !this.editForm.get('institute').value.id) {
          this.institutes = res.body;
        } else {
          this.estMastService
            .find(this.editForm.get('institute').value.id)
            .subscribe(
              (subRes: HttpResponse<IEstMast>) => (this.institutes = [subRes.body].concat(res.body)),
              (subRes: HttpErrorResponse) => this.onError(subRes.message)
            );
        }
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
    this.statusMastService.query({ filter: 'consent-is-null' }).subscribe(
      (res: HttpResponse<IStatusMast[]>) => {
        if (!this.editForm.get('status').value || !this.editForm.get('status').value.id) {
          this.statuses = res.body;
        } else {
          this.statusMastService
            .find(this.editForm.get('status').value.id)
            .subscribe(
              (subRes: HttpResponse<IStatusMast>) => (this.statuses = [subRes.body].concat(res.body)),
              (subRes: HttpErrorResponse) => this.onError(subRes.message)
            );
        }
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
    this.categoryMastService.query({ filter: 'consent-is-null' }).subscribe(
      (res: HttpResponse<ICategoryMast[]>) => {
        if (!this.editForm.get('category').value || !this.editForm.get('category').value.id) {
          this.categories = res.body;
        } else {
          this.categoryMastService
            .find(this.editForm.get('category').value.id)
            .subscribe(
              (subRes: HttpResponse<ICategoryMast>) => (this.categories = [subRes.body].concat(res.body)),
              (subRes: HttpErrorResponse) => this.onError(subRes.message)
            );
        }
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
    this.scopeMastService.query({ filter: 'consent-is-null' }).subscribe(
      (res: HttpResponse<IScopeMast[]>) => {
        if (!this.editForm.get('scope').value || !this.editForm.get('scope').value.id) {
          this.scopes = res.body;
        } else {
          this.scopeMastService
            .find(this.editForm.get('scope').value.id)
            .subscribe(
              (subRes: HttpResponse<IScopeMast>) => (this.scopes = [subRes.body].concat(res.body)),
              (subRes: HttpErrorResponse) => this.onError(subRes.message)
            );
        }
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
    this.personMastService.query({ filter: 'consent-is-null' }).subscribe(
      (res: HttpResponse<IPersonMast[]>) => {
        if (!this.editForm.get('createdBy').value || !this.editForm.get('createdBy').value.id) {
          this.createdbies = res.body;
        } else {
          this.personMastService
            .find(this.editForm.get('createdBy').value.id)
            .subscribe(
              (subRes: HttpResponse<IPersonMast>) => (this.createdbies = [subRes.body].concat(res.body)),
              (subRes: HttpErrorResponse) => this.onError(subRes.message)
            );
        }
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  updateForm(consent: IConsent) {
    this.editForm.patchValue({
      id: consent.id,
      consentId: consent.consentId,
      description: consent.description,
      indicationBenefits: consent.indicationBenefits,
      complications: consent.complications,
      alternatives: consent.alternatives,
      patient: consent.patient,
      visit: consent.visit,
      institute: consent.institute,
      status: consent.status,
      category: consent.category,
      scope: consent.scope,
      createdBy: consent.createdBy
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const consent = this.createFromForm();
    if (consent.id !== undefined) {
      this.subscribeToSaveResponse(this.consentService.update(consent));
    } else {
      this.subscribeToSaveResponse(this.consentService.create(consent));
    }
  }

  private createFromForm(): IConsent {
    return {
      ...new Consent(),
      id: this.editForm.get(['id']).value,
      consentId: this.editForm.get(['consentId']).value,
      description: this.editForm.get(['description']).value,
      indicationBenefits: this.editForm.get(['indicationBenefits']).value,
      complications: this.editForm.get(['complications']).value,
      alternatives: this.editForm.get(['alternatives']).value,
      patient: this.editForm.get(['patient']).value,
      visit: this.editForm.get(['visit']).value,
      institute: this.editForm.get(['institute']).value,
      status: this.editForm.get(['status']).value,
      category: this.editForm.get(['category']).value,
      scope: this.editForm.get(['scope']).value,
      createdBy: this.editForm.get(['createdBy']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IConsent>>) {
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

  trackPatientBarById(index: number, item: IPatientBar) {
    return item.id;
  }

  trackVisitBarById(index: number, item: IVisitBar) {
    return item.id;
  }

  trackEstMastById(index: number, item: IEstMast) {
    return item.id;
  }

  trackStatusMastById(index: number, item: IStatusMast) {
    return item.id;
  }

  trackCategoryMastById(index: number, item: ICategoryMast) {
    return item.id;
  }

  trackScopeMastById(index: number, item: IScopeMast) {
    return item.id;
  }

  trackPersonMastById(index: number, item: IPersonMast) {
    return item.id;
  }
}
