import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ScopeMast } from 'app/shared/model/scope-mast.model';
import { ScopeMastService } from './scope-mast.service';
import { ScopeMastComponent } from './scope-mast.component';
import { ScopeMastDetailComponent } from './scope-mast-detail.component';
import { ScopeMastUpdateComponent } from './scope-mast-update.component';
import { IScopeMast } from 'app/shared/model/scope-mast.model';

@Injectable({ providedIn: 'root' })
export class ScopeMastResolve implements Resolve<IScopeMast> {
  constructor(private service: ScopeMastService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IScopeMast> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((scopeMast: HttpResponse<ScopeMast>) => scopeMast.body));
    }
    return of(new ScopeMast());
  }
}

export const scopeMastRoute: Routes = [
  {
    path: '',
    component: ScopeMastComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'patientConsentApp.scopeMast.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ScopeMastDetailComponent,
    resolve: {
      scopeMast: ScopeMastResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'patientConsentApp.scopeMast.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ScopeMastUpdateComponent,
    resolve: {
      scopeMast: ScopeMastResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'patientConsentApp.scopeMast.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ScopeMastUpdateComponent,
    resolve: {
      scopeMast: ScopeMastResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'patientConsentApp.scopeMast.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
