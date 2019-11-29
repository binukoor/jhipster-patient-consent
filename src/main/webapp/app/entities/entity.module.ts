import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'status-mast',
        loadChildren: () => import('./status-mast/status-mast.module').then(m => m.PatientConsentAppStatusMastModule)
      },
      {
        path: 'scope-mast',
        loadChildren: () => import('./scope-mast/scope-mast.module').then(m => m.PatientConsentAppScopeMastModule)
      },
      {
        path: 'category-mast',
        loadChildren: () => import('./category-mast/category-mast.module').then(m => m.PatientConsentAppCategoryMastModule)
      },
      {
        path: 'proc-mast',
        loadChildren: () => import('./proc-mast/proc-mast.module').then(m => m.PatientConsentAppProcMastModule)
      },
      {
        path: 'icd-mast',
        loadChildren: () => import('./icd-mast/icd-mast.module').then(m => m.PatientConsentAppIcdMastModule)
      },
      {
        path: 'person-mast',
        loadChildren: () => import('./person-mast/person-mast.module').then(m => m.PatientConsentAppPersonMastModule)
      },
      {
        path: 'est-mast',
        loadChildren: () => import('./est-mast/est-mast.module').then(m => m.PatientConsentAppEstMastModule)
      },
      {
        path: 'patient-bar',
        loadChildren: () => import('./patient-bar/patient-bar.module').then(m => m.PatientConsentAppPatientBarModule)
      },
      {
        path: 'visit-bar',
        loadChildren: () => import('./visit-bar/visit-bar.module').then(m => m.PatientConsentAppVisitBarModule)
      },
      {
        path: 'consent',
        loadChildren: () => import('./consent/consent.module').then(m => m.PatientConsentAppConsentModule)
      },
      {
        path: 'consent-procs',
        loadChildren: () => import('./consent-procs/consent-procs.module').then(m => m.PatientConsentAppConsentProcsModule)
      },
      {
        path: 'consent-diag',
        loadChildren: () => import('./consent-diag/consent-diag.module').then(m => m.PatientConsentAppConsentDiagModule)
      },
      {
        path: 'consent-from',
        loadChildren: () => import('./consent-from/consent-from.module').then(m => m.PatientConsentAppConsentFromModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class PatientConsentAppEntityModule {}
