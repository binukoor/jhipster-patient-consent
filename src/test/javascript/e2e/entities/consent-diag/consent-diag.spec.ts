import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ConsentDiagComponentsPage, ConsentDiagDeleteDialog, ConsentDiagUpdatePage } from './consent-diag.page-object';

const expect = chai.expect;

describe('ConsentDiag e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let consentDiagComponentsPage: ConsentDiagComponentsPage;
  let consentDiagUpdatePage: ConsentDiagUpdatePage;
  let consentDiagDeleteDialog: ConsentDiagDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ConsentDiags', async () => {
    await navBarPage.goToEntity('consent-diag');
    consentDiagComponentsPage = new ConsentDiagComponentsPage();
    await browser.wait(ec.visibilityOf(consentDiagComponentsPage.title), 5000);
    expect(await consentDiagComponentsPage.getTitle()).to.eq('patientConsentApp.consentDiag.home.title');
  });

  it('should load create ConsentDiag page', async () => {
    await consentDiagComponentsPage.clickOnCreateButton();
    consentDiagUpdatePage = new ConsentDiagUpdatePage();
    expect(await consentDiagUpdatePage.getPageTitle()).to.eq('patientConsentApp.consentDiag.home.createOrEditLabel');
    await consentDiagUpdatePage.cancel();
  });

  it('should create and save ConsentDiags', async () => {
    const nbButtonsBeforeCreate = await consentDiagComponentsPage.countDeleteButtons();

    await consentDiagComponentsPage.clickOnCreateButton();
    await promise.all([
      consentDiagUpdatePage.setDescriptionInput('description'),
      consentDiagUpdatePage.icdSelectLastOption(),
      consentDiagUpdatePage.consentSelectLastOption()
    ]);
    expect(await consentDiagUpdatePage.getDescriptionInput()).to.eq(
      'description',
      'Expected Description value to be equals to description'
    );
    await consentDiagUpdatePage.save();
    expect(await consentDiagUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await consentDiagComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last ConsentDiag', async () => {
    const nbButtonsBeforeDelete = await consentDiagComponentsPage.countDeleteButtons();
    await consentDiagComponentsPage.clickOnLastDeleteButton();

    consentDiagDeleteDialog = new ConsentDiagDeleteDialog();
    expect(await consentDiagDeleteDialog.getDialogTitle()).to.eq('patientConsentApp.consentDiag.delete.question');
    await consentDiagDeleteDialog.clickOnConfirmButton();

    expect(await consentDiagComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
