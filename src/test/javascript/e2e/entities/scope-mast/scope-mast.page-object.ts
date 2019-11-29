import { element, by, ElementFinder } from 'protractor';

export class ScopeMastComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-scope-mast div table .btn-danger'));
  title = element.all(by.css('jhi-scope-mast div h2#page-heading span')).first();

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

export class ScopeMastUpdatePage {
  pageTitle = element(by.id('jhi-scope-mast-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  scopeCodeInput = element(by.id('field_scopeCode'));
  scopeInput = element(by.id('field_scope'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setScopeCodeInput(scopeCode) {
    await this.scopeCodeInput.sendKeys(scopeCode);
  }

  async getScopeCodeInput() {
    return await this.scopeCodeInput.getAttribute('value');
  }

  async setScopeInput(scope) {
    await this.scopeInput.sendKeys(scope);
  }

  async getScopeInput() {
    return await this.scopeInput.getAttribute('value');
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

export class ScopeMastDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-scopeMast-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-scopeMast'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
