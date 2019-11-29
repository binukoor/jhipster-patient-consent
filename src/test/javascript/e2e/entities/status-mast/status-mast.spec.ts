import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { StatusMastComponentsPage, StatusMastDeleteDialog, StatusMastUpdatePage } from './status-mast.page-object';

const expect = chai.expect;

describe('StatusMast e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let statusMastComponentsPage: StatusMastComponentsPage;
  let statusMastUpdatePage: StatusMastUpdatePage;
  let statusMastDeleteDialog: StatusMastDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load StatusMasts', async () => {
    await navBarPage.goToEntity('status-mast');
    statusMastComponentsPage = new StatusMastComponentsPage();
    await browser.wait(ec.visibilityOf(statusMastComponentsPage.title), 5000);
    expect(await statusMastComponentsPage.getTitle()).to.eq('patientConsentApp.statusMast.home.title');
  });

  it('should load create StatusMast page', async () => {
    await statusMastComponentsPage.clickOnCreateButton();
    statusMastUpdatePage = new StatusMastUpdatePage();
    expect(await statusMastUpdatePage.getPageTitle()).to.eq('patientConsentApp.statusMast.home.createOrEditLabel');
    await statusMastUpdatePage.cancel();
  });

  it('should create and save StatusMasts', async () => {
    const nbButtonsBeforeCreate = await statusMastComponentsPage.countDeleteButtons();

    await statusMastComponentsPage.clickOnCreateButton();
    await promise.all([statusMastUpdatePage.setStatusCodeInput('5'), statusMastUpdatePage.setStatusInput('status')]);
    expect(await statusMastUpdatePage.getStatusCodeInput()).to.eq('5', 'Expected statusCode value to be equals to 5');
    expect(await statusMastUpdatePage.getStatusInput()).to.eq('status', 'Expected Status value to be equals to status');
    await statusMastUpdatePage.save();
    expect(await statusMastUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await statusMastComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last StatusMast', async () => {
    const nbButtonsBeforeDelete = await statusMastComponentsPage.countDeleteButtons();
    await statusMastComponentsPage.clickOnLastDeleteButton();

    statusMastDeleteDialog = new StatusMastDeleteDialog();
    expect(await statusMastDeleteDialog.getDialogTitle()).to.eq('patientConsentApp.statusMast.delete.question');
    await statusMastDeleteDialog.clickOnConfirmButton();

    expect(await statusMastComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
