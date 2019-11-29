import { element, by, ElementFinder } from 'protractor';

export class ConsentDiagComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-consent-diag div table .btn-danger'));
  title = element.all(by.css('jhi-consent-diag div h2#page-heading span')).first();

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

export class ConsentDiagUpdatePage {
  pageTitle = element(by.id('jhi-consent-diag-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  descriptionInput = element(by.id('field_description'));
  icdSelect = element(by.id('field_icd'));
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

  async icdSelectLastOption() {
    await this.icdSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async icdSelectOption(option) {
    await this.icdSelect.sendKeys(option);
  }

  getIcdSelect(): ElementFinder {
    return this.icdSelect;
  }

  async getIcdSelectedOption() {
    return await this.icdSelect.element(by.css('option:checked')).getText();
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

export class ConsentDiagDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-consentDiag-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-consentDiag'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
