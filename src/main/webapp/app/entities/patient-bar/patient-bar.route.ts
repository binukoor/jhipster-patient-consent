import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PatientBar } from 'app/shared/model/patient-bar.model';
import { PatientBarService } from './patient-bar.service';
import { PatientBarComponent } from './patient-bar.component';
import { PatientBarDetailComponent } from './patient-bar-detail.component';
import { PatientBarUpdateComponent } from './patient-bar-update.component';
import { IPatientBar } from 'app/shared/model/patient-bar.model';

@Injectable({ providedIn: 'root' })
export class PatientBarResolve implements Resolve<IPatientBar> {
  constructor(private service: PatientBarService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPatientBar> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((patientBar: HttpResponse<PatientBar>) => patientBar.body));
    }
    return of(new PatientBar());
  }
}

export const patientBarRoute: Routes = [
  {
    path: '',
    component: PatientBarComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'patientConsentApp.patientBar.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PatientBarDetailComponent,
    resolve: {
      patientBar: PatientBarResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'patientConsentApp.patientBar.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PatientBarUpdateComponent,
    resolve: {
      patientBar: PatientBarResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'patientConsentApp.patientBar.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PatientBarUpdateComponent,
    resolve: {
      patientBar: PatientBarResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'patientConsentApp.patientBar.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
