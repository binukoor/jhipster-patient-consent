import { element, by, ElementFinder } from 'protractor';

export class ConsentFromComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-consent-from div table .btn-danger'));
  title = element.all(by.css('jhi-consent-from div h2#page-heading span')).first();

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

export class ConsentFromUpdatePage {
  pageTitle = element(by.id('jhi-consent-from-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  isVerifiedInput = element(by.id('field_isVerified'));
  verifiedByInput = element(by.id('field_verifiedBy'));
  verifiedTimeInput = element(by.id('field_verifiedTime'));
  consentSelect = element(by.id('field_consent'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  getIsVerifiedInput() {
    return this.isVerifiedInput;
  }
  async setVerifiedByInput(verifiedBy) {
    await this.verifiedByInput.sendKeys(verifiedBy);
  }

  async getVerifiedByInput() {
    return await this.verifiedByInput.getAttribute('value');
  }

  async setVerifiedTimeInput(verifiedTime) {
    await this.verifiedTimeInput.sendKeys(verifiedTime);
  }

  async getVerifiedTimeInput() {
    return await this.verifiedTimeInput.getAttribute('value');
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

export class ConsentFromDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-consentFrom-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-consentFrom'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
