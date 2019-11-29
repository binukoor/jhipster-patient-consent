import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { StatusMast } from 'app/shared/model/status-mast.model';
import { StatusMastService } from './status-mast.service';
import { StatusMastComponent } from './status-mast.component';
import { StatusMastDetailComponent } from './status-mast-detail.component';
import { StatusMastUpdateComponent } from './status-mast-update.component';
import { IStatusMast } from 'app/shared/model/status-mast.model';

@Injectable({ providedIn: 'root' })
export class StatusMastResolve implements Resolve<IStatusMast> {
  constructor(private service: StatusMastService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IStatusMast> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((statusMast: HttpResponse<StatusMast>) => statusMast.body));
    }
    return of(new StatusMast());
  }
}

export const statusMastRoute: Routes = [
  {
    path: '',
    component: StatusMastComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'patientConsentApp.statusMast.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: StatusMastDetailComponent,
    resolve: {
      statusMast: StatusMastResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'patientConsentApp.statusMast.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: StatusMastUpdateComponent,
    resolve: {
      statusMast: StatusMastResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'patientConsentApp.statusMast.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: StatusMastUpdateComponent,
    resolve: {
      statusMast: StatusMastResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'patientConsentApp.statusMast.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
