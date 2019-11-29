import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoryMast } from 'app/shared/model/category-mast.model';
import { CategoryMastService } from './category-mast.service';
import { CategoryMastComponent } from './category-mast.component';
import { CategoryMastDetailComponent } from './category-mast-detail.component';
import { CategoryMastUpdateComponent } from './category-mast-update.component';
import { ICategoryMast } from 'app/shared/model/category-mast.model';

@Injectable({ providedIn: 'root' })
export class CategoryMastResolve implements Resolve<ICategoryMast> {
  constructor(private service: CategoryMastService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICategoryMast> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((categoryMast: HttpResponse<CategoryMast>) => categoryMast.body));
    }
    return of(new CategoryMast());
  }
}

export const categoryMastRoute: Routes = [
  {
    path: '',
    component: CategoryMastComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'patientConsentApp.categoryMast.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CategoryMastDetailComponent,
    resolve: {
      categoryMast: CategoryMastResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'patientConsentApp.categoryMast.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CategoryMastUpdateComponent,
    resolve: {
      categoryMast: CategoryMastResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'patientConsentApp.categoryMast.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CategoryMastUpdateComponent,
    resolve: {
      categoryMast: CategoryMastResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'patientConsentApp.categoryMast.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
