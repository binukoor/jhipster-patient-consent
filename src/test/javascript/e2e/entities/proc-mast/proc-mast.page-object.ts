import { element, by, ElementFinder } from 'protractor';

export class ProcMastComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-proc-mast div table .btn-danger'));
  title = element.all(by.css('jhi-proc-mast div h2#page-heading span')).first();

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

export class ProcMastUpdatePage {
  pageTitle = element(by.id('jhi-proc-mast-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  procCodeInput = element(by.id('field_procCode'));
  procNameInput = element(by.id('field_procName'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setProcCodeInput(procCode) {
    await this.procCodeInput.sendKeys(procCode);
  }

  async getProcCodeInput() {
    return await this.procCodeInput.getAttribute('value');
  }

  async setProcNameInput(procName) {
    await this.procNameInput.sendKeys(procName);
  }

  async getProcNameInput() {
    return await this.procNameInput.getAttribute('value');
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

export class ProcMastDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-procMast-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-procMast'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
