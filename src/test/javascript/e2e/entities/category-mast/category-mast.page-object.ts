import { element, by, ElementFinder } from 'protractor';

export class CategoryMastComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-category-mast div table .btn-danger'));
  title = element.all(by.css('jhi-category-mast div h2#page-heading span')).first();

  async clickOnCreateButton() {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton() {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons() {
    return this.deleteButtons.count();
  }

  async getTitle() {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class CategoryMastUpdatePage {
  pageTitle = element(by.id('jhi-category-mast-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  catCodeInput = element(by.id('field_catCode'));
  categoryInput = element(by.id('field_category'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setCatCodeInput(catCode) {
    await this.catCodeInput.sendKeys(catCode);
  }

  async getCatCodeInput() {
    return await this.catCodeInput.getAttribute('value');
  }

  async setCategoryInput(category) {
    await this.categoryInput.sendKeys(category);
  }

  async getCategoryInput() {
    return await this.categoryInput.getAttribute('value');
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class CategoryMastDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-categoryMast-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-categoryMast'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
