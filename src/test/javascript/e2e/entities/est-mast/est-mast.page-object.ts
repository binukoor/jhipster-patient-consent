import { element, by, ElementFinder } from 'protractor';

export class EstMastComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-est-mast div table .btn-danger'));
  title = element.all(by.css('jhi-est-mast div h2#page-heading span')).first();

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

export class EstMastUpdatePage {
  pageTitle = element(by.id('jhi-est-mast-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  estCodeInput = element(by.id('field_estCode'));
  estNameInput = element(by.id('field_estName'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setEstCodeInput(estCode) {
    await this.estCodeInput.sendKeys(estCode);
  }

  async getEstCodeInput() {
    return await this.estCodeInput.getAttribute('value');
  }

  async setEstNameInput(estName) {
    await this.estNameInput.sendKeys(estName);
  }

  async getEstNameInput() {
    return await this.estNameInput.getAttribute('value');
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

export class EstMastDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-estMast-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-estMast'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
