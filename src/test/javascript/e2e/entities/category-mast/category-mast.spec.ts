import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CategoryMastComponentsPage, CategoryMastDeleteDialog, CategoryMastUpdatePage } from './category-mast.page-object';

const expect = chai.expect;

describe('CategoryMast e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let categoryMastComponentsPage: CategoryMastComponentsPage;
  let categoryMastUpdatePage: CategoryMastUpdatePage;
  let categoryMastDeleteDialog: CategoryMastDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load CategoryMasts', async () => {
    await navBarPage.goToEntity('category-mast');
    categoryMastComponentsPage = new CategoryMastComponentsPage();
    await browser.wait(ec.visibilityOf(categoryMastComponentsPage.title), 5000);
    expect(await categoryMastComponentsPage.getTitle()).to.eq('patientConsentApp.categoryMast.home.title');
  });

  it('should load create CategoryMast page', async () => {
    await categoryMastComponentsPage.clickOnCreateButton();
    categoryMastUpdatePage = new CategoryMastUpdatePage();
    expect(await categoryMastUpdatePage.getPageTitle()).to.eq('patientConsentApp.categoryMast.home.createOrEditLabel');
    await categoryMastUpdatePage.cancel();
  });

  it('should create and save CategoryMasts', async () => {
    const nbButtonsBeforeCreate = await categoryMastComponentsPage.countDeleteButtons();

    await categoryMastComponentsPage.clickOnCreateButton();
    await promise.all([categoryMastUpdatePage.setCatCodeInput('5'), categoryMastUpdatePage.setCategoryInput('category')]);
    expect(await categoryMastUpdatePage.getCatCodeInput()).to.eq('5', 'Expected catCode value to be equals to 5');
    expect(await categoryMastUpdatePage.getCategoryInput()).to.eq('category', 'Expected Category value to be equals to category');
    await categoryMastUpdatePage.save();
    expect(await categoryMastUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await categoryMastComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last CategoryMast', async () => {
    const nbButtonsBeforeDelete = await categoryMastComponentsPage.countDeleteButtons();
    await categoryMastComponentsPage.clickOnLastDeleteButton();

    categoryMastDeleteDialog = new CategoryMastDeleteDialog();
    expect(await categoryMastDeleteDialog.getDialogTitle()).to.eq('patientConsentApp.categoryMast.delete.question');
    await categoryMastDeleteDialog.clickOnConfirmButton();

    expect(await categoryMastComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
