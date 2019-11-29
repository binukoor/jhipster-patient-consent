import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { VisitBarComponentsPage, VisitBarDeleteDialog, VisitBarUpdatePage } from './visit-bar.page-object';

const expect = chai.expect;

describe('VisitBar e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let visitBarComponentsPage: VisitBarComponentsPage;
  let visitBarUpdatePage: VisitBarUpdatePage;
  let visitBarDeleteDialog: VisitBarDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load VisitBars', async () => {
    await navBarPage.goToEntity('visit-bar');
    visitBarComponentsPage = new VisitBarComponentsPage();
    await browser.wait(ec.visibilityOf(visitBarComponentsPage.title), 5000);
    expect(await visitBarComponentsPage.getTitle()).to.eq('patientConsentApp.visitBar.home.title');
  });

  it('should load create VisitBar page', async () => {
    await visitBarComponentsPage.clickOnCreateButton();
    visitBarUpdatePage = new VisitBarUpdatePage();
    expect(await visitBarUpdatePage.getPageTitle()).to.eq('patientConsentApp.visitBar.home.createOrEditLabel');
    await visitBarUpdatePage.cancel();
  });

  it('should create and save VisitBars', async () => {
    const nbButtonsBeforeCreate = await visitBarComponentsPage.countDeleteButtons();

    await visitBarComponentsPage.clickOnCreateButton();
    await promise.all([
      visitBarUpdatePage.setVisitIdInput('5'),
      visitBarUpdatePage.setVisitTypeInput('visitType'),
      visitBarUpdatePage.setVisitTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      visitBarUpdatePage.setSeenTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      visitBarUpdatePage.setDeptCodeInput('5'),
      visitBarUpdatePage.setDeptNameInput('deptName'),
      visitBarUpdatePage.setClinicCodeInput('5'),
      visitBarUpdatePage.setClinicNameInput('clinicName'),
      visitBarUpdatePage.setConsultantCodeInput('5'),
      visitBarUpdatePage.setConsultantNameInput('consultantName')
    ]);
    expect(await visitBarUpdatePage.getVisitIdInput()).to.eq('5', 'Expected visitId value to be equals to 5');
    expect(await visitBarUpdatePage.getVisitTypeInput()).to.eq('visitType', 'Expected VisitType value to be equals to visitType');
    expect(await visitBarUpdatePage.getVisitTimeInput()).to.contain(
      '2001-01-01T02:30',
      'Expected visitTime value to be equals to 2000-12-31'
    );
    expect(await visitBarUpdatePage.getSeenTimeInput()).to.contain(
      '2001-01-01T02:30',
      'Expected seenTime value to be equals to 2000-12-31'
    );
    expect(await visitBarUpdatePage.getDeptCodeInput()).to.eq('5', 'Expected deptCode value to be equals to 5');
    expect(await visitBarUpdatePage.getDeptNameInput()).to.eq('deptName', 'Expected DeptName value to be equals to deptName');
    expect(await visitBarUpdatePage.getClinicCodeInput()).to.eq('5', 'Expected clinicCode value to be equals to 5');
    expect(await visitBarUpdatePage.getClinicNameInput()).to.eq('clinicName', 'Expected ClinicName value to be equals to clinicName');
    expect(await visitBarUpdatePage.getConsultantCodeInput()).to.eq('5', 'Expected consultantCode value to be equals to 5');
    expect(await visitBarUpdatePage.getConsultantNameInput()).to.eq(
      'consultantName',
      'Expected ConsultantName value to be equals to consultantName'
    );
    await visitBarUpdatePage.save();
    expect(await visitBarUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await visitBarComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last VisitBar', async () => {
    const nbButtonsBeforeDelete = await visitBarComponentsPage.countDeleteButtons();
    await visitBarComponentsPage.clickOnLastDeleteButton();

    visitBarDeleteDialog = new VisitBarDeleteDialog();
    expect(await visitBarDeleteDialog.getDialogTitle()).to.eq('patientConsentApp.visitBar.delete.question');
    await visitBarDeleteDialog.clickOnConfirmButton();

    expect(await visitBarComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
