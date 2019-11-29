import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PatientConsentAppSharedModule } from 'app/shared/shared.module';
import { ConsentProcsComponent } from './consent-procs.component';
import { ConsentProcsDetailComponent } from './consent-procs-detail.component';
import { ConsentProcsUpdateComponent } from './consent-procs-update.component';
import { ConsentProcsDeleteDialogComponent } from './consent-procs-delete-dialog.component';
import { consentProcsRoute } from './consent-procs.route';

@NgModule({
  imports: [PatientConsentAppSharedModule, RouterModule.forChild(consentProcsRoute)],
  declarations: [ConsentProcsComponent, ConsentProcsDetailComponent, ConsentProcsUpdateComponent, ConsentProcsDeleteDialogComponent],
  entryComponents: [ConsentProcsDeleteDialogComponent]
})
export class PatientConsentAppConsentProcsModule {}
