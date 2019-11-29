import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PatientConsentAppSharedModule } from 'app/shared/shared.module';
import { VisitBarComponent } from './visit-bar.component';
import { VisitBarDetailComponent } from './visit-bar-detail.component';
import { VisitBarUpdateComponent } from './visit-bar-update.component';
import { VisitBarDeleteDialogComponent } from './visit-bar-delete-dialog.component';
import { visitBarRoute } from './visit-bar.route';

@NgModule({
  imports: [PatientConsentAppSharedModule, RouterModule.forChild(visitBarRoute)],
  declarations: [VisitBarComponent, VisitBarDetailComponent, VisitBarUpdateComponent, VisitBarDeleteDialogComponent],
  entryComponents: [VisitBarDeleteDialogComponent]
})
export class PatientConsentAppVisitBarModule {}
