import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { VisitBar } from 'app/shared/model/visit-bar.model';
import { VisitBarService } from './visit-bar.service';
import { VisitBarComponent } from './visit-bar.component';
import { VisitBarDetailComponent } from './visit-bar-detail.component';
import { VisitBarUpdateComponent } from './visit-bar-update.component';
import { IVisitBar } from 'app/shared/model/visit-bar.model';

@Injectable({ providedIn: 'root' })
export class VisitBarResolve implements Resolve<IVisitBar> {
  constructor(private service: VisitBarService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IVisitBar> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((visitBar: HttpResponse<VisitBar>) => visitBar.body));
    }
    return of(new VisitBar());
  }
}

export const visitBarRoute: Routes = [
  {
    path: '',
    component: VisitBarComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'patientConsentApp.visitBar.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: VisitBarDetailComponent,
    resolve: {
      visitBar: VisitBarResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'patientConsentApp.visitBar.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: VisitBarUpdateComponent,
    resolve: {
      visitBar: VisitBarResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'patientConsentApp.visitBar.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: VisitBarUpdateComponent,
    resolve: {
      visitBar: VisitBarResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'patientConsentApp.visitBar.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
