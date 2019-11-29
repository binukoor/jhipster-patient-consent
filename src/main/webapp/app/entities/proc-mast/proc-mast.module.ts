import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PatientConsentAppSharedModule } from 'app/shared/shared.module';
import { ProcMastComponent } from './proc-mast.component';
import { ProcMastDetailComponent } from './proc-mast-detail.component';
import { ProcMastUpdateComponent } from './proc-mast-update.component';
import { ProcMastDeleteDialogComponent } from './proc-mast-delete-dialog.component';
import { procMastRoute } from './proc-mast.route';

@NgModule({
  imports: [PatientConsentAppSharedModule, RouterModule.forChild(procMastRoute)],
  declarations: [ProcMastComponent, ProcMastDetailComponent, ProcMastUpdateComponent, ProcMastDeleteDialogComponent],
  entryComponents: [ProcMastDeleteDialogComponent]
})
export class PatientConsentAppProcMastModule {}
