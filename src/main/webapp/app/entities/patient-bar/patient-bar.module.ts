import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PatientConsentAppSharedModule } from 'app/shared/shared.module';
import { PatientBarComponent } from './patient-bar.component';
import { PatientBarDetailComponent } from './patient-bar-detail.component';
import { PatientBarUpdateComponent } from './patient-bar-update.component';
import { PatientBarDeleteDialogComponent } from './patient-bar-delete-dialog.component';
import { patientBarRoute } from './patient-bar.route';

@NgModule({
  imports: [PatientConsentAppSharedModule, RouterModule.forChild(patientBarRoute)],
  declarations: [PatientBarComponent, PatientBarDetailComponent, PatientBarUpdateComponent, PatientBarDeleteDialogComponent],
  entryComponents: [PatientBarDeleteDialogComponent]
})
export class PatientConsentAppPatientBarModule {}
