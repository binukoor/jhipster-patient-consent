import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ConsentProcsComponentsPage, ConsentProcsDeleteDialog, ConsentProcsUpdatePage } from './consent-procs.page-object';

const expect = chai.expect;

describe('ConsentProcs e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let consentProcsComponentsPage: ConsentProcsComponentsPage;
  let consentProcsUpdatePage: ConsentProcsUpdatePage;
  let consentProcsDeleteDialog: ConsentProcsDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ConsentProcs', async () => {
    await navBarPage.goToEntity('consent-procs');
    consentProcsComponentsPage = new ConsentProcsComponentsPage();
    await browser.wait(ec.visibilityOf(consentProcsComponentsPage.title), 5000);
    expect(await consentProcsComponentsPage.getTitle()).to.eq('patientConsentApp.consentProcs.home.title');
  });

  it('should load create ConsentProcs page', async () => {
    await consentProcsComponentsPage.clickOnCreateButton();
    consentProcsUpdatePage = new ConsentProcsUpdatePage();
    expect(await consentProcsUpdatePage.getPageTitle()).to.eq('patientConsentApp.consentProcs.home.createOrEditLabel');
    await consentProcsUpdatePage.cancel();
  });

  it('should create and save ConsentProcs', async () => {
    const nbButtonsBeforeCreate = await consentProcsComponentsPage.countDeleteButtons();

    await consentProcsComponentsPage.clickOnCreateButton();
    await promise.all([
      consentProcsUpdatePage.setDescriptionInput('description'),
      consentProcsUpdatePage.procCodeSelectLastOption(),
      consentProcsUpdatePage.consentSelectLastOption()
    ]);
    expect(await consentProcsUpdatePage.getDescriptionInput()).to.eq(
      'description',
      'Expected Description value to be equals to description'
    );
    await consentProcsUpdatePage.save();
    expect(await consentProcsUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await consentProcsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last ConsentProcs', async () => {
    const nbButtonsBeforeDelete = await consentProcsComponentsPage.countDeleteButtons();
    await consentProcsComponentsPage.clickOnLastDeleteButton();

    consentProcsDeleteDialog = new ConsentProcsDeleteDialog();
    expect(await consentProcsDeleteDialog.getDialogTitle()).to.eq('patientConsentApp.consentProcs.delete.question');
    await consentProcsDeleteDialog.clickOnConfirmButton();

    expect(await consentProcsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
