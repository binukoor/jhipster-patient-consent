import { element, by, ElementFinder } from 'protractor';

export class ConsentProcsComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-consent-procs div table .btn-danger'));
  title = element.all(by.css('jhi-consent-procs div h2#page-heading span')).first();

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

export class ConsentProcsUpdatePage {
  pageTitle = element(by.id('jhi-consent-procs-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  descriptionInput = element(by.id('field_description'));
  procCodeSelect = element(by.id('field_procCode'));
  consentSelect = element(by.id('field_consent'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return await this.descriptionInput.getAttribute('value');
  }

  async procCodeSelectLastOption() {
    await this.procCodeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async procCodeSelectOption(option) {
    await this.procCodeSelect.sendKeys(option);
  }

  getProcCodeSelect(): ElementFinder {
    return this.procCodeSelect;
  }

  async getProcCodeSelectedOption() {
    return await this.procCodeSelect.element(by.css('option:checked')).getText();
  }

  async consentSelectLastOption() {
    await this.consentSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async consentSelectOption(option) {
    await this.consentSelect.sendKeys(option);
  }

  getConsentSelect(): ElementFinder {
    return this.consentSelect;
  }

  async getConsentSelectedOption() {
    return await this.consentSelect.element(by.css('option:checked')).getText();
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

export class ConsentProcsDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-consentProcs-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-consentProcs'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
