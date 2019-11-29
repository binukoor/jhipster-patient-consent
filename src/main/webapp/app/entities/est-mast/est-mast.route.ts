import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EstMast } from 'app/shared/model/est-mast.model';
import { EstMastService } from './est-mast.service';
import { EstMastComponent } from './est-mast.component';
import { EstMastDetailComponent } from './est-mast-detail.component';
import { EstMastUpdateComponent } from './est-mast-update.component';
import { IEstMast } from 'app/shared/model/est-mast.model';

@Injectable({ providedIn: 'root' })
export class EstMastResolve implements Resolve<IEstMast> {
  constructor(private service: EstMastService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEstMast> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((estMast: HttpResponse<EstMast>) => estMast.body));
    }
    return of(new EstMast());
  }
}

export const estMastRoute: Routes = [
  {
    path: '',
    component: EstMastComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'patientConsentApp.estMast.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: EstMastDetailComponent,
    resolve: {
      estMast: EstMastResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'patientConsentApp.estMast.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: EstMastUpdateComponent,
    resolve: {
      estMast: EstMastResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'patientConsentApp.estMast.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: EstMastUpdateComponent,
    resolve: {
      estMast: EstMastResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'patientConsentApp.estMast.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
