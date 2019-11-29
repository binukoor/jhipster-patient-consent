import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PersonMastComponentsPage, PersonMastDeleteDialog, PersonMastUpdatePage } from './person-mast.page-object';

const expect = chai.expect;

describe('PersonMast e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let personMastComponentsPage: PersonMastComponentsPage;
  let personMastUpdatePage: PersonMastUpdatePage;
  let personMastDeleteDialog: PersonMastDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load PersonMasts', async () => {
    await navBarPage.goToEntity('person-mast');
    personMastComponentsPage = new PersonMastComponentsPage();
    await browser.wait(ec.visibilityOf(personMastComponentsPage.title), 5000);
    expect(await personMastComponentsPage.getTitle()).to.eq('patientConsentApp.personMast.home.title');
  });

  it('should load create PersonMast page', async () => {
    await personMastComponentsPage.clickOnCreateButton();
    personMastUpdatePage = new PersonMastUpdatePage();
    expect(await personMastUpdatePage.getPageTitle()).to.eq('patientConsentApp.personMast.home.createOrEditLabel');
    await personMastUpdatePage.cancel();
  });

  it('should create and save PersonMasts', async () => {
    const nbButtonsBeforeCreate = await personMastComponentsPage.countDeleteButtons();

    await personMastComponentsPage.clickOnCreateButton();
    await promise.all([personMastUpdatePage.setPersCodeInput('5'), personMastUpdatePage.setPersonNameInput('personName')]);
    expect(await personMastUpdatePage.getPersCodeInput()).to.eq('5', 'Expected persCode value to be equals to 5');
    expect(await personMastUpdatePage.getPersonNameInput()).to.eq('personName', 'Expected PersonName value to be equals to personName');
    await personMastUpdatePage.save();
    expect(await personMastUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await personMastComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last PersonMast', async () => {
    const nbButtonsBeforeDelete = await personMastComponentsPage.countDeleteButtons();
    await personMastComponentsPage.clickOnLastDeleteButton();

    personMastDeleteDialog = new PersonMastDeleteDialog();
    expect(await personMastDeleteDialog.getDialogTitle()).to.eq('patientConsentApp.personMast.delete.question');
    await personMastDeleteDialog.clickOnConfirmButton();

    expect(await personMastComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
