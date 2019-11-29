import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PatientConsentAppSharedModule } from 'app/shared/shared.module';
import { ConsentFromComponent } from './consent-from.component';
import { ConsentFromDetailComponent } from './consent-from-detail.component';
import { ConsentFromUpdateComponent } from './consent-from-update.component';
import { ConsentFromDeleteDialogComponent } from './consent-from-delete-dialog.component';
import { consentFromRoute } from './consent-from.route';

@NgModule({
  imports: [PatientConsentAppSharedModule, RouterModule.forChild(consentFromRoute)],
  declarations: [ConsentFromComponent, ConsentFromDetailComponent, ConsentFromUpdateComponent, ConsentFromDeleteDialogComponent],
  entryComponents: [ConsentFromDeleteDialogComponent]
})
export class PatientConsentAppConsentFromModule {}
