import { element, by, ElementFinder } from 'protractor';

export class PatientBarComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-patient-bar div table .btn-danger'));
  title = element.all(by.css('jhi-patient-bar div h2#page-heading span')).first();

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

export class PatientBarUpdatePage {
  pageTitle = element(by.id('jhi-patient-bar-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  patientIdInput = element(by.id('field_patientId'));
  patientNoInput = element(by.id('field_patientNo'));
  patientNameInput = element(by.id('field_patientName'));
  ageInput = element(by.id('field_age'));
  genderInput = element(by.id('field_gender'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setPatientIdInput(patientId) {
    await this.patientIdInput.sendKeys(patientId);
  }

  async getPatientIdInput() {
    return await this.patientIdInput.getAttribute('value');
  }

  async setPatientNoInput(patientNo) {
    await this.patientNoInput.sendKeys(patientNo);
  }

  async getPatientNoInput() {
    return await this.patientNoInput.getAttribute('value');
  }

  async setPatientNameInput(patientName) {
    await this.patientNameInput.sendKeys(patientName);
  }

  async getPatientNameInput() {
    return await this.patientNameInput.getAttribute('value');
  }

  async setAgeInput(age) {
    await this.ageInput.sendKeys(age);
  }

  async getAgeInput() {
    return await this.ageInput.getAttribute('value');
  }

  async setGenderInput(gender) {
    await this.genderInput.sendKeys(gender);
  }

  async getGenderInput() {
    return await this.genderInput.getAttribute('value');
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

export class PatientBarDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-patientBar-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-patientBar'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
