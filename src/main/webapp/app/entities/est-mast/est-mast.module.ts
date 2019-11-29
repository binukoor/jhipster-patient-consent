import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PatientConsentAppSharedModule } from 'app/shared/shared.module';
import { EstMastComponent } from './est-mast.component';
import { EstMastDetailComponent } from './est-mast-detail.component';
import { EstMastUpdateComponent } from './est-mast-update.component';
import { EstMastDeleteDialogComponent } from './est-mast-delete-dialog.component';
import { estMastRoute } from './est-mast.route';

@NgModule({
  imports: [PatientConsentAppSharedModule, RouterModule.forChild(estMastRoute)],
  declarations: [EstMastComponent, EstMastDetailComponent, EstMastUpdateComponent, EstMastDeleteDialogComponent],
  entryComponents: [EstMastDeleteDialogComponent]
})
export class PatientConsentAppEstMastModule {}
