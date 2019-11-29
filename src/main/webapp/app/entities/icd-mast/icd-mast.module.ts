import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PatientConsentAppSharedModule } from 'app/shared/shared.module';
import { IcdMastComponent } from './icd-mast.component';
import { IcdMastDetailComponent } from './icd-mast-detail.component';
import { IcdMastUpdateComponent } from './icd-mast-update.component';
import { IcdMastDeleteDialogComponent } from './icd-mast-delete-dialog.component';
import { icdMastRoute } from './icd-mast.route';

@NgModule({
  imports: [PatientConsentAppSharedModule, RouterModule.forChild(icdMastRoute)],
  declarations: [IcdMastComponent, IcdMastDetailComponent, IcdMastUpdateComponent, IcdMastDeleteDialogComponent],
  entryComponents: [IcdMastDeleteDialogComponent]
})
export class PatientConsentAppIcdMastModule {}
