import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PatientConsentAppSharedModule } from 'app/shared/shared.module';
import { ConsentDiagComponent } from './consent-diag.component';
import { ConsentDiagDetailComponent } from './consent-diag-detail.component';
import { ConsentDiagUpdateComponent } from './consent-diag-update.component';
import { ConsentDiagDeleteDialogComponent } from './consent-diag-delete-dialog.component';
import { consentDiagRoute } from './consent-diag.route';

@NgModule({
  imports: [PatientConsentAppSharedModule, RouterModule.forChild(consentDiagRoute)],
  declarations: [ConsentDiagComponent, ConsentDiagDetailComponent, ConsentDiagUpdateComponent, ConsentDiagDeleteDialogComponent],
  entryComponents: [ConsentDiagDeleteDialogComponent]
})
export class PatientConsentAppConsentDiagModule {}
