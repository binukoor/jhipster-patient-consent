import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConsentDiag } from 'app/shared/model/consent-diag.model';
import { ConsentDiagService } from './consent-diag.service';
import { ConsentDiagComponent } from './consent-diag.component';
import { ConsentDiagDetailComponent } from './consent-diag-detail.component';
import { ConsentDiagUpdateComponent } from './consent-diag-update.component';
import { IConsentDiag } from 'app/shared/model/consent-diag.model';

@Injectable({ providedIn: 'root' })
export class ConsentDiagResolve implements Resolve<IConsentDiag> {
  constructor(private service: ConsentDiagService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IConsentDiag> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((consentDiag: HttpResponse<ConsentDiag>) => consentDiag.body));
    }
    return of(new ConsentDiag());
  }
}

export const consentDiagRoute: Routes = [
  {
    path: '',
    component: ConsentDiagComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'patientConsentApp.consentDiag.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ConsentDiagDetailComponent,
    resolve: {
      consentDiag: ConsentDiagResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'patientConsentApp.consentDiag.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ConsentDiagUpdateComponent,
    resolve: {
      consentDiag: ConsentDiagResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'patientConsentApp.consentDiag.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ConsentDiagUpdateComponent,
    resolve: {
      consentDiag: ConsentDiagResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'patientConsentApp.consentDiag.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
