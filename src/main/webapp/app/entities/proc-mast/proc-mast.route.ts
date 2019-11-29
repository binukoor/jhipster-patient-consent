import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProcMast } from 'app/shared/model/proc-mast.model';
import { ProcMastService } from './proc-mast.service';
import { ProcMastComponent } from './proc-mast.component';
import { ProcMastDetailComponent } from './proc-mast-detail.component';
import { ProcMastUpdateComponent } from './proc-mast-update.component';
import { IProcMast } from 'app/shared/model/proc-mast.model';

@Injectable({ providedIn: 'root' })
export class ProcMastResolve implements Resolve<IProcMast> {
  constructor(private service: ProcMastService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProcMast> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((procMast: HttpResponse<ProcMast>) => procMast.body));
    }
    return of(new ProcMast());
  }
}

export const procMastRoute: Routes = [
  {
    path: '',
    component: ProcMastComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'patientConsentApp.procMast.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ProcMastDetailComponent,
    resolve: {
      procMast: ProcMastResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'patientConsentApp.procMast.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ProcMastUpdateComponent,
    resolve: {
      procMast: ProcMastResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'patientConsentApp.procMast.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ProcMastUpdateComponent,
    resolve: {
      procMast: ProcMastResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'patientConsentApp.procMast.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
