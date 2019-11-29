import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PatientConsentAppSharedModule } from 'app/shared/shared.module';
import { ConsentComponent } from './consent.component';
import { ConsentDetailComponent } from './consent-detail.component';
import { ConsentUpdateComponent } from './consent-update.component';
import { ConsentDeleteDialogComponent } from './consent-delete-dialog.component';
import { consentRoute } from './consent.route';

@NgModule({
  imports: [PatientConsentAppSharedModule, RouterModule.forChild(consentRoute)],
  declarations: [ConsentComponent, ConsentDetailComponent, ConsentUpdateComponent, ConsentDeleteDialogComponent],
  entryComponents: [ConsentDeleteDialogComponent]
})
export class PatientConsentAppConsentModule {}
