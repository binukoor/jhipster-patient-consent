import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IcdMast } from 'app/shared/model/icd-mast.model';
import { IcdMastService } from './icd-mast.service';
import { IcdMastComponent } from './icd-mast.component';
import { IcdMastDetailComponent } from './icd-mast-detail.component';
import { IcdMastUpdateComponent } from './icd-mast-update.component';
import { IIcdMast } from 'app/shared/model/icd-mast.model';

@Injectable({ providedIn: 'root' })
export class IcdMastResolve implements Resolve<IIcdMast> {
  constructor(private service: IcdMastService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IIcdMast> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((icdMast: HttpResponse<IcdMast>) => icdMast.body));
    }
    return of(new IcdMast());
  }
}

export const icdMastRoute: Routes = [
  {
    path: '',
    component: IcdMastComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'patientConsentApp.icdMast.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: IcdMastDetailComponent,
    resolve: {
      icdMast: IcdMastResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'patientConsentApp.icdMast.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: IcdMastUpdateComponent,
    resolve: {
      icdMast: IcdMastResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'patientConsentApp.icdMast.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: IcdMastUpdateComponent,
    resolve: {
      icdMast: IcdMastResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'patientConsentApp.icdMast.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
