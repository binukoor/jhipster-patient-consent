import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ConsentFromComponentsPage, ConsentFromDeleteDialog, ConsentFromUpdatePage } from './consent-from.page-object';

const expect = chai.expect;

describe('ConsentFrom e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let consentFromComponentsPage: ConsentFromComponentsPage;
  let consentFromUpdatePage: ConsentFromUpdatePage;
  let consentFromDeleteDialog: ConsentFromDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ConsentFroms', async () => {
    await navBarPage.goToEntity('consent-from');
    consentFromComponentsPage = new ConsentFromComponentsPage();
    await browser.wait(ec.visibilityOf(consentFromComponentsPage.title), 5000);
    expect(await consentFromComponentsPage.getTitle()).to.eq('patientConsentApp.consentFrom.home.title');
  });

  it('should load create ConsentFrom page', async () => {
    await consentFromComponentsPage.clickOnCreateButton();
    consentFromUpdatePage = new ConsentFromUpdatePage();
    expect(await consentFromUpdatePage.getPageTitle()).to.eq('patientConsentApp.consentFrom.home.createOrEditLabel');
    await consentFromUpdatePage.cancel();
  });

  it('should create and save ConsentFroms', async () => {
    const nbButtonsBeforeCreate = await consentFromComponentsPage.countDeleteButtons();

    await consentFromComponentsPage.clickOnCreateButton();
    await promise.all([
      consentFromUpdatePage.setVerifiedByInput('verifiedBy'),
      consentFromUpdatePage.setVerifiedTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      consentFromUpdatePage.consentSelectLastOption()
    ]);
    const selectedIsVerified = consentFromUpdatePage.getIsVerifiedInput();
    if (await selectedIsVerified.isSelected()) {
      await consentFromUpdatePage.getIsVerifiedInput().click();
      expect(await consentFromUpdatePage.getIsVerifiedInput().isSelected(), 'Expected isVerified not to be selected').to.be.false;
    } else {
      await consentFromUpdatePage.getIsVerifiedInput().click();
      expect(await consentFromUpdatePage.getIsVerifiedInput().isSelected(), 'Expected isVerified to be selected').to.be.true;
    }
    expect(await consentFromUpdatePage.getVerifiedByInput()).to.eq('verifiedBy', 'Expected VerifiedBy value to be equals to verifiedBy');
    expect(await consentFromUpdatePage.getVerifiedTimeInput()).to.contain(
      '2001-01-01T02:30',
      'Expected verifiedTime value to be equals to 2000-12-31'
    );
    await consentFromUpdatePage.save();
    expect(await consentFromUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await consentFromComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last ConsentFrom', async () => {
    const nbButtonsBeforeDelete = await consentFromComponentsPage.countDeleteButtons();
    await consentFromComponentsPage.clickOnLastDeleteButton();

    consentFromDeleteDialog = new ConsentFromDeleteDialog();
    expect(await consentFromDeleteDialog.getDialogTitle()).to.eq('patientConsentApp.consentFrom.delete.question');
    await consentFromDeleteDialog.clickOnConfirmButton();

    expect(await consentFromComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
