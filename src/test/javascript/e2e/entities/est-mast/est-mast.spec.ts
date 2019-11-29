import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { EstMastComponentsPage, EstMastDeleteDialog, EstMastUpdatePage } from './est-mast.page-object';

const expect = chai.expect;

describe('EstMast e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let estMastComponentsPage: EstMastComponentsPage;
  let estMastUpdatePage: EstMastUpdatePage;
  let estMastDeleteDialog: EstMastDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load EstMasts', async () => {
    await navBarPage.goToEntity('est-mast');
    estMastComponentsPage = new EstMastComponentsPage();
    await browser.wait(ec.visibilityOf(estMastComponentsPage.title), 5000);
    expect(await estMastComponentsPage.getTitle()).to.eq('patientConsentApp.estMast.home.title');
  });

  it('should load create EstMast page', async () => {
    await estMastComponentsPage.clickOnCreateButton();
    estMastUpdatePage = new EstMastUpdatePage();
    expect(await estMastUpdatePage.getPageTitle()).to.eq('patientConsentApp.estMast.home.createOrEditLabel');
    await estMastUpdatePage.cancel();
  });

  it('should create and save EstMasts', async () => {
    const nbButtonsBeforeCreate = await estMastComponentsPage.countDeleteButtons();

    await estMastComponentsPage.clickOnCreateButton();
    await promise.all([estMastUpdatePage.setEstCodeInput('5'), estMastUpdatePage.setEstNameInput('estName')]);
    expect(await estMastUpdatePage.getEstCodeInput()).to.eq('5', 'Expected estCode value to be equals to 5');
    expect(await estMastUpdatePage.getEstNameInput()).to.eq('estName', 'Expected EstName value to be equals to estName');
    await estMastUpdatePage.save();
    expect(await estMastUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await estMastComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last EstMast', async () => {
    const nbButtonsBeforeDelete = await estMastComponentsPage.countDeleteButtons();
    await estMastComponentsPage.clickOnLastDeleteButton();

    estMastDeleteDialog = new EstMastDeleteDialog();
    expect(await estMastDeleteDialog.getDialogTitle()).to.eq('patientConsentApp.estMast.delete.question');
    await estMastDeleteDialog.clickOnConfirmButton();

    expect(await estMastComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
