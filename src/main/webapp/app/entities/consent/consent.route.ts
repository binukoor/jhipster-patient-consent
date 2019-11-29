import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Consent } from 'app/shared/model/consent.model';
import { ConsentService } from './consent.service';
import { ConsentComponent } from './consent.component';
import { ConsentDetailComponent } from './consent-detail.component';
import { ConsentUpdateComponent } from './consent-update.component';
import { IConsent } from 'app/shared/model/consent.model';

@Injectable({ providedIn: 'root' })
export class ConsentResolve implements Resolve<IConsent> {
  constructor(private service: ConsentService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IConsent> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((consent: HttpResponse<Consent>) => consent.body));
    }
    return of(new Consent());
  }
}

export const consentRoute: Routes = [
  {
    path: '',
    component: ConsentComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'patientConsentApp.consent.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ConsentDetailComponent,
    resolve: {
      consent: ConsentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'patientConsentApp.consent.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ConsentUpdateComponent,
    resolve: {
      consent: ConsentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'patientConsentApp.consent.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ConsentUpdateComponent,
    resolve: {
      consent: ConsentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'patientConsentApp.consent.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
