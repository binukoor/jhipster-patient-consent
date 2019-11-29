import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PersonMast } from 'app/shared/model/person-mast.model';
import { PersonMastService } from './person-mast.service';
import { PersonMastComponent } from './person-mast.component';
import { PersonMastDetailComponent } from './person-mast-detail.component';
import { PersonMastUpdateComponent } from './person-mast-update.component';
import { IPersonMast } from 'app/shared/model/person-mast.model';

@Injectable({ providedIn: 'root' })
export class PersonMastResolve implements Resolve<IPersonMast> {
  constructor(private service: PersonMastService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPersonMast> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((personMast: HttpResponse<PersonMast>) => personMast.body));
    }
    return of(new PersonMast());
  }
}

export const personMastRoute: Routes = [
  {
    path: '',
    component: PersonMastComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'patientConsentApp.personMast.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PersonMastDetailComponent,
    resolve: {
      personMast: PersonMastResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'patientConsentApp.personMast.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PersonMastUpdateComponent,
    resolve: {
      personMast: PersonMastResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'patientConsentApp.personMast.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PersonMastUpdateComponent,
    resolve: {
      personMast: PersonMastResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'patientConsentApp.personMast.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
