import { element, by, ElementFinder } from 'protractor';

export class StatusMastComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-status-mast div table .btn-danger'));
  title = element.all(by.css('jhi-status-mast div h2#page-heading span')).first();

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

export class StatusMastUpdatePage {
  pageTitle = element(by.id('jhi-status-mast-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  statusCodeInput = element(by.id('field_statusCode'));
  statusInput = element(by.id('field_status'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setStatusCodeInput(statusCode) {
    await this.statusCodeInput.sendKeys(statusCode);
  }

  async getStatusCodeInput() {
    return await this.statusCodeInput.getAttribute('value');
  }

  async setStatusInput(status) {
    await this.statusInput.sendKeys(status);
  }

  async getStatusInput() {
    return await this.statusInput.getAttribute('value');
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

export class StatusMastDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-statusMast-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-statusMast'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
