import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PatientConsentAppSharedModule } from 'app/shared/shared.module';
import { CategoryMastComponent } from './category-mast.component';
import { CategoryMastDetailComponent } from './category-mast-detail.component';
import { CategoryMastUpdateComponent } from './category-mast-update.component';
import { CategoryMastDeleteDialogComponent } from './category-mast-delete-dialog.component';
import { categoryMastRoute } from './category-mast.route';

@NgModule({
  imports: [PatientConsentAppSharedModule, RouterModule.forChild(categoryMastRoute)],
  declarations: [CategoryMastComponent, CategoryMastDetailComponent, CategoryMastUpdateComponent, CategoryMastDeleteDialogComponent],
  entryComponents: [CategoryMastDeleteDialogComponent]
})
export class PatientConsentAppCategoryMastModule {}
