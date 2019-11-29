import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ConsentComponentsPage, ConsentDeleteDialog, ConsentUpdatePage } from './consent.page-object';

const expect = chai.expect;

describe('Consent e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let consentComponentsPage: ConsentComponentsPage;
  let consentUpdatePage: ConsentUpdatePage;
  let consentDeleteDialog: ConsentDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Consents', async () => {
    await navBarPage.goToEntity('consent');
    consentComponentsPage = new ConsentComponentsPage();
    await browser.wait(ec.visibilityOf(consentComponentsPage.title), 5000);
    expect(await consentComponentsPage.getTitle()).to.eq('patientConsentApp.consent.home.title');
  });

  it('should load create Consent page', async () => {
    await consentComponentsPage.clickOnCreateButton();
    consentUpdatePage = new ConsentUpdatePage();
    expect(await consentUpdatePage.getPageTitle()).to.eq('patientConsentApp.consent.home.createOrEditLabel');
    await consentUpdatePage.cancel();
  });

  it('should create and save Consents', async () => {
    const nbButtonsBeforeCreate = await consentComponentsPage.countDeleteButtons();

    await consentComponentsPage.clickOnCreateButton();
    await promise.all([
      consentUpdatePage.setConsentIdInput('5'),
      consentUpdatePage.setDescriptionInput('description'),
      consentUpdatePage.setIndicationBenefitsInput('indicationBenefits'),
      consentUpdatePage.setComplicationsInput('complications'),
      consentUpdatePage.setAlternativesInput('alternatives'),
      consentUpdatePage.patientSelectLastOption(),
      consentUpdatePage.visitSelectLastOption(),
      consentUpdatePage.instituteSelectLastOption(),
      consentUpdatePage.statusSelectLastOption(),
      consentUpdatePage.categorySelectLastOption(),
      consentUpdatePage.scopeSelectLastOption(),
      consentUpdatePage.createdBySelectLastOption()
    ]);
    expect(await consentUpdatePage.getConsentIdInput()).to.eq('5', 'Expected consentId value to be equals to 5');
    expect(await consentUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
    expect(await consentUpdatePage.getIndicationBenefitsInput()).to.eq(
      'indicationBenefits',
      'Expected IndicationBenefits value to be equals to indicationBenefits'
    );
    expect(await consentUpdatePage.getComplicationsInput()).to.eq(
      'complications',
      'Expected Complications value to be equals to complications'
    );
    expect(await consentUpdatePage.getAlternativesInput()).to.eq(
      'alternatives',
      'Expected Alternatives value to be equals to alternatives'
    );
    await consentUpdatePage.save();
    expect(await consentUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await consentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Consent', async () => {
    const nbButtonsBeforeDelete = await consentComponentsPage.countDeleteButtons();
    await consentComponentsPage.clickOnLastDeleteButton();

    consentDeleteDialog = new ConsentDeleteDialog();
    expect(await consentDeleteDialog.getDialogTitle()).to.eq('patientConsentApp.consent.delete.question');
    await consentDeleteDialog.clickOnConfirmButton();

    expect(await consentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
