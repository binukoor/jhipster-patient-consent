import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { IcdMastComponentsPage, IcdMastDeleteDialog, IcdMastUpdatePage } from './icd-mast.page-object';

const expect = chai.expect;

describe('IcdMast e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let icdMastComponentsPage: IcdMastComponentsPage;
  let icdMastUpdatePage: IcdMastUpdatePage;
  let icdMastDeleteDialog: IcdMastDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load IcdMasts', async () => {
    await navBarPage.goToEntity('icd-mast');
    icdMastComponentsPage = new IcdMastComponentsPage();
    await browser.wait(ec.visibilityOf(icdMastComponentsPage.title), 5000);
    expect(await icdMastComponentsPage.getTitle()).to.eq('patientConsentApp.icdMast.home.title');
  });

  it('should load create IcdMast page', async () => {
    await icdMastComponentsPage.clickOnCreateButton();
    icdMastUpdatePage = new IcdMastUpdatePage();
    expect(await icdMastUpdatePage.getPageTitle()).to.eq('patientConsentApp.icdMast.home.createOrEditLabel');
    await icdMastUpdatePage.cancel();
  });

  it('should create and save IcdMasts', async () => {
    const nbButtonsBeforeCreate = await icdMastComponentsPage.countDeleteButtons();

    await icdMastComponentsPage.clickOnCreateButton();
    await promise.all([icdMastUpdatePage.setIcdInput('icd'), icdMastUpdatePage.setDiseaseInput('disease')]);
    expect(await icdMastUpdatePage.getIcdInput()).to.eq('icd', 'Expected Icd value to be equals to icd');
    expect(await icdMastUpdatePage.getDiseaseInput()).to.eq('disease', 'Expected Disease value to be equals to disease');
    await icdMastUpdatePage.save();
    expect(await icdMastUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await icdMastComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last IcdMast', async () => {
    const nbButtonsBeforeDelete = await icdMastComponentsPage.countDeleteButtons();
    await icdMastComponentsPage.clickOnLastDeleteButton();

    icdMastDeleteDialog = new IcdMastDeleteDialog();
    expect(await icdMastDeleteDialog.getDialogTitle()).to.eq('patientConsentApp.icdMast.delete.question');
    await icdMastDeleteDialog.clickOnConfirmButton();

    expect(await icdMastComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
