import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PatientConsentAppSharedModule } from 'app/shared/shared.module';
import { ScopeMastComponent } from './scope-mast.component';
import { ScopeMastDetailComponent } from './scope-mast-detail.component';
import { ScopeMastUpdateComponent } from './scope-mast-update.component';
import { ScopeMastDeleteDialogComponent } from './scope-mast-delete-dialog.component';
import { scopeMastRoute } from './scope-mast.route';

@NgModule({
  imports: [PatientConsentAppSharedModule, RouterModule.forChild(scopeMastRoute)],
  declarations: [ScopeMastComponent, ScopeMastDetailComponent, ScopeMastUpdateComponent, ScopeMastDeleteDialogComponent],
  entryComponents: [ScopeMastDeleteDialogComponent]
})
export class PatientConsentAppScopeMastModule {}
