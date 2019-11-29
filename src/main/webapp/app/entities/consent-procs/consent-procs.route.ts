import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConsentProcs } from 'app/shared/model/consent-procs.model';
import { ConsentProcsService } from './consent-procs.service';
import { ConsentProcsComponent } from './consent-procs.component';
import { ConsentProcsDetailComponent } from './consent-procs-detail.component';
import { ConsentProcsUpdateComponent } from './consent-procs-update.component';
import { IConsentProcs } from 'app/shared/model/consent-procs.model';

@Injectable({ providedIn: 'root' })
export class ConsentProcsResolve implements Resolve<IConsentProcs> {
  constructor(private service: ConsentProcsService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IConsentProcs> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((consentProcs: HttpResponse<ConsentProcs>) => consentProcs.body));
    }
    return of(new ConsentProcs());
  }
}

export const consentProcsRoute: Routes = [
  {
    path: '',
    component: ConsentProcsComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'patientConsentApp.consentProcs.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ConsentProcsDetailComponent,
    resolve: {
      consentProcs: ConsentProcsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'patientConsentApp.consentProcs.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ConsentProcsUpdateComponent,
    resolve: {
      consentProcs: ConsentProcsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'patientConsentApp.consentProcs.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ConsentProcsUpdateComponent,
    resolve: {
      consentProcs: ConsentProcsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'patientConsentApp.consentProcs.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
