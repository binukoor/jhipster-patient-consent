import { element, by, ElementFinder } from 'protractor';

export class PersonMastComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-person-mast div table .btn-danger'));
  title = element.all(by.css('jhi-person-mast div h2#page-heading span')).first();

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

export class PersonMastUpdatePage {
  pageTitle = element(by.id('jhi-person-mast-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  persCodeInput = element(by.id('field_persCode'));
  personNameInput = element(by.id('field_personName'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setPersCodeInput(persCode) {
    await this.persCodeInput.sendKeys(persCode);
  }

  async getPersCodeInput() {
    return await this.persCodeInput.getAttribute('value');
  }

  async setPersonNameInput(personName) {
    await this.personNameInput.sendKeys(personName);
  }

  async getPersonNameInput() {
    return await this.personNameInput.getAttribute('value');
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

export class PersonMastDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-personMast-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-personMast'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
