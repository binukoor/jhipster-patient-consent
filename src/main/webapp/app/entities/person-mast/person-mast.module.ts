import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PatientConsentAppSharedModule } from 'app/shared/shared.module';
import { PersonMastComponent } from './person-mast.component';
import { PersonMastDetailComponent } from './person-mast-detail.component';
import { PersonMastUpdateComponent } from './person-mast-update.component';
import { PersonMastDeleteDialogComponent } from './person-mast-delete-dialog.component';
import { personMastRoute } from './person-mast.route';

@NgModule({
  imports: [PatientConsentAppSharedModule, RouterModule.forChild(personMastRoute)],
  declarations: [PersonMastComponent, PersonMastDetailComponent, PersonMastUpdateComponent, PersonMastDeleteDialogComponent],
  entryComponents: [PersonMastDeleteDialogComponent]
})
export class PatientConsentAppPersonMastModule {}
