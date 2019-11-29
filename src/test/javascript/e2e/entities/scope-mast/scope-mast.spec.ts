import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ScopeMastComponentsPage, ScopeMastDeleteDialog, ScopeMastUpdatePage } from './scope-mast.page-object';

const expect = chai.expect;

describe('ScopeMast e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let scopeMastComponentsPage: ScopeMastComponentsPage;
  let scopeMastUpdatePage: ScopeMastUpdatePage;
  let scopeMastDeleteDialog: ScopeMastDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ScopeMasts', async () => {
    await navBarPage.goToEntity('scope-mast');
    scopeMastComponentsPage = new ScopeMastComponentsPage();
    await browser.wait(ec.visibilityOf(scopeMastComponentsPage.title), 5000);
    expect(await scopeMastComponentsPage.getTitle()).to.eq('patientConsentApp.scopeMast.home.title');
  });

  it('should load create ScopeMast page', async () => {
    await scopeMastComponentsPage.clickOnCreateButton();
    scopeMastUpdatePage = new ScopeMastUpdatePage();
    expect(await scopeMastUpdatePage.getPageTitle()).to.eq('patientConsentApp.scopeMast.home.createOrEditLabel');
    await scopeMastUpdatePage.cancel();
  });

  it('should create and save ScopeMasts', async () => {
    const nbButtonsBeforeCreate = await scopeMastComponentsPage.countDeleteButtons();

    await scopeMastComponentsPage.clickOnCreateButton();
    await promise.all([scopeMastUpdatePage.setScopeCodeInput('5'), scopeMastUpdatePage.setScopeInput('scope')]);
    expect(await scopeMastUpdatePage.getScopeCodeInput()).to.eq('5', 'Expected scopeCode value to be equals to 5');
    expect(await scopeMastUpdatePage.getScopeInput()).to.eq('scope', 'Expected Scope value to be equals to scope');
    await scopeMastUpdatePage.save();
    expect(await scopeMastUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await scopeMastComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last ScopeMast', async () => {
    const nbButtonsBeforeDelete = await scopeMastComponentsPage.countDeleteButtons();
    await scopeMastComponentsPage.clickOnLastDeleteButton();

    scopeMastDeleteDialog = new ScopeMastDeleteDialog();
    expect(await scopeMastDeleteDialog.getDialogTitle()).to.eq('patientConsentApp.scopeMast.delete.question');
    await scopeMastDeleteDialog.clickOnConfirmButton();

    expect(await scopeMastComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
