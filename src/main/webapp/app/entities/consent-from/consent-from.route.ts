import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConsentFrom } from 'app/shared/model/consent-from.model';
import { ConsentFromService } from './consent-from.service';
import { ConsentFromComponent } from './consent-from.component';
import { ConsentFromDetailComponent } from './consent-from-detail.component';
import { ConsentFromUpdateComponent } from './consent-from-update.component';
import { IConsentFrom } from 'app/shared/model/consent-from.model';

@Injectable({ providedIn: 'root' })
export class ConsentFromResolve implements Resolve<IConsentFrom> {
  constructor(private service: ConsentFromService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IConsentFrom> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((consentFrom: HttpResponse<ConsentFrom>) => consentFrom.body));
    }
    return of(new ConsentFrom());
  }
}

export const consentFromRoute: Routes = [
  {
    path: '',
    component: ConsentFromComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'patientConsentApp.consentFrom.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ConsentFromDetailComponent,
    resolve: {
      consentFrom: ConsentFromResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'patientConsentApp.consentFrom.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ConsentFromUpdateComponent,
    resolve: {
      consentFrom: ConsentFromResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'patientConsentApp.consentFrom.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ConsentFromUpdateComponent,
    resolve: {
      consentFrom: ConsentFromResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'patientConsentApp.consentFrom.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
