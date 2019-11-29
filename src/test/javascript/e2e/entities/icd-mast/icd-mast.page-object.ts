import { element, by, ElementFinder } from 'protractor';

export class IcdMastComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-icd-mast div table .btn-danger'));
  title = element.all(by.css('jhi-icd-mast div h2#page-heading span')).first();

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

export class IcdMastUpdatePage {
  pageTitle = element(by.id('jhi-icd-mast-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  icdInput = element(by.id('field_icd'));
  diseaseInput = element(by.id('field_disease'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIcdInput(icd) {
    await this.icdInput.sendKeys(icd);
  }

  async getIcdInput() {
    return await this.icdInput.getAttribute('value');
  }

  async setDiseaseInput(disease) {
    await this.diseaseInput.sendKeys(disease);
  }

  async getDiseaseInput() {
    return await this.diseaseInput.getAttribute('value');
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

export class IcdMastDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-icdMast-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-icdMast'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
