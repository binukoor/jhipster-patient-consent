import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ProcMastComponentsPage, ProcMastDeleteDialog, ProcMastUpdatePage } from './proc-mast.page-object';

const expect = chai.expect;

describe('ProcMast e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let procMastComponentsPage: ProcMastComponentsPage;
  let procMastUpdatePage: ProcMastUpdatePage;
  let procMastDeleteDialog: ProcMastDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ProcMasts', async () => {
    await navBarPage.goToEntity('proc-mast');
    procMastComponentsPage = new ProcMastComponentsPage();
    await browser.wait(ec.visibilityOf(procMastComponentsPage.title), 5000);
    expect(await procMastComponentsPage.getTitle()).to.eq('patientConsentApp.procMast.home.title');
  });

  it('should load create ProcMast page', async () => {
    await procMastComponentsPage.clickOnCreateButton();
    procMastUpdatePage = new ProcMastUpdatePage();
    expect(await procMastUpdatePage.getPageTitle()).to.eq('patientConsentApp.procMast.home.createOrEditLabel');
    await procMastUpdatePage.cancel();
  });

  it('should create and save ProcMasts', async () => {
    const nbButtonsBeforeCreate = await procMastComponentsPage.countDeleteButtons();

    await procMastComponentsPage.clickOnCreateButton();
    await promise.all([procMastUpdatePage.setProcCodeInput('5'), procMastUpdatePage.setProcNameInput('procName')]);
    expect(await procMastUpdatePage.getProcCodeInput()).to.eq('5', 'Expected procCode value to be equals to 5');
    expect(await procMastUpdatePage.getProcNameInput()).to.eq('procName', 'Expected ProcName value to be equals to procName');
    await procMastUpdatePage.save();
    expect(await procMastUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await procMastComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last ProcMast', async () => {
    const nbButtonsBeforeDelete = await procMastComponentsPage.countDeleteButtons();
    await procMastComponentsPage.clickOnLastDeleteButton();

    procMastDeleteDialog = new ProcMastDeleteDialog();
    expect(await procMastDeleteDialog.getDialogTitle()).to.eq('patientConsentApp.procMast.delete.question');
    await procMastDeleteDialog.clickOnConfirmButton();

    expect(await procMastComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
