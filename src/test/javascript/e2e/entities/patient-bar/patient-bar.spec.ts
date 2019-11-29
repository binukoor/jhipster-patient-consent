import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PatientBarComponentsPage, PatientBarDeleteDialog, PatientBarUpdatePage } from './patient-bar.page-object';

const expect = chai.expect;

describe('PatientBar e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let patientBarComponentsPage: PatientBarComponentsPage;
  let patientBarUpdatePage: PatientBarUpdatePage;
  let patientBarDeleteDialog: PatientBarDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load PatientBars', async () => {
    await navBarPage.goToEntity('patient-bar');
    patientBarComponentsPage = new PatientBarComponentsPage();
    await browser.wait(ec.visibilityOf(patientBarComponentsPage.title), 5000);
    expect(await patientBarComponentsPage.getTitle()).to.eq('patientConsentApp.patientBar.home.title');
  });

  it('should load create PatientBar page', async () => {
    await patientBarComponentsPage.clickOnCreateButton();
    patientBarUpdatePage = new PatientBarUpdatePage();
    expect(await patientBarUpdatePage.getPageTitle()).to.eq('patientConsentApp.patientBar.home.createOrEditLabel');
    await patientBarUpdatePage.cancel();
  });

  it('should create and save PatientBars', async () => {
    const nbButtonsBeforeCreate = await patientBarComponentsPage.countDeleteButtons();

    await patientBarComponentsPage.clickOnCreateButton();
    await promise.all([
      patientBarUpdatePage.setPatientIdInput('5'),
      patientBarUpdatePage.setPatientNoInput('patientNo'),
      patientBarUpdatePage.setPatientNameInput('patientName'),
      patientBarUpdatePage.setAgeInput('age'),
      patientBarUpdatePage.setGenderInput('gender')
    ]);
    expect(await patientBarUpdatePage.getPatientIdInput()).to.eq('5', 'Expected patientId value to be equals to 5');
    expect(await patientBarUpdatePage.getPatientNoInput()).to.eq('patientNo', 'Expected PatientNo value to be equals to patientNo');
    expect(await patientBarUpdatePage.getPatientNameInput()).to.eq('patientName', 'Expected PatientName value to be equals to patientName');
    expect(await patientBarUpdatePage.getAgeInput()).to.eq('age', 'Expected Age value to be equals to age');
    expect(await patientBarUpdatePage.getGenderInput()).to.eq('gender', 'Expected Gender value to be equals to gender');
    await patientBarUpdatePage.save();
    expect(await patientBarUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await patientBarComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last PatientBar', async () => {
    const nbButtonsBeforeDelete = await patientBarComponentsPage.countDeleteButtons();
    await patientBarComponentsPage.clickOnLastDeleteButton();

    patientBarDeleteDialog = new PatientBarDeleteDialog();
    expect(await patientBarDeleteDialog.getDialogTitle()).to.eq('patientConsentApp.patientBar.delete.question');
    await patientBarDeleteDialog.clickOnConfirmButton();

    expect(await patientBarComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
