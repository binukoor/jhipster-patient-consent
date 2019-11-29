import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PatientConsentAppSharedModule } from 'app/shared/shared.module';
import { StatusMastComponent } from './status-mast.component';
import { StatusMastDetailComponent } from './status-mast-detail.component';
import { StatusMastUpdateComponent } from './status-mast-update.component';
import { StatusMastDeleteDialogComponent } from './status-mast-delete-dialog.component';
import { statusMastRoute } from './status-mast.route';

@NgModule({
  imports: [PatientConsentAppSharedModule, RouterModule.forChild(statusMastRoute)],
  declarations: [StatusMastComponent, StatusMastDetailComponent, StatusMastUpdateComponent, StatusMastDeleteDialogComponent],
  entryComponents: [StatusMastDeleteDialogComponent]
})
export class PatientConsentAppStatusMastModule {}
