import { element, by, ElementFinder } from 'protractor';

export class VisitBarComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-visit-bar div table .btn-danger'));
  title = element.all(by.css('jhi-visit-bar div h2#page-heading span')).first();

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

export class VisitBarUpdatePage {
  pageTitle = element(by.id('jhi-visit-bar-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  visitIdInput = element(by.id('field_visitId'));
  visitTypeInput = element(by.id('field_visitType'));
  visitTimeInput = element(by.id('field_visitTime'));
  seenTimeInput = element(by.id('field_seenTime'));
  deptCodeInput = element(by.id('field_deptCode'));
  deptNameInput = element(by.id('field_deptName'));
  clinicCodeInput = element(by.id('field_clinicCode'));
  clinicNameInput = element(by.id('field_clinicName'));
  consultantCodeInput = element(by.id('field_consultantCode'));
  consultantNameInput = element(by.id('field_consultantName'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setVisitIdInput(visitId) {
    await this.visitIdInput.sendKeys(visitId);
  }

  async getVisitIdInput() {
    return await this.visitIdInput.getAttribute('value');
  }

  async setVisitTypeInput(visitType) {
    await this.visitTypeInput.sendKeys(visitType);
  }

  async getVisitTypeInput() {
    return await this.visitTypeInput.getAttribute('value');
  }

  async setVisitTimeInput(visitTime) {
    await this.visitTimeInput.sendKeys(visitTime);
  }

  async getVisitTimeInput() {
    return await this.visitTimeInput.getAttribute('value');
  }

  async setSeenTimeInput(seenTime) {
    await this.seenTimeInput.sendKeys(seenTime);
  }

  async getSeenTimeInput() {
    return await this.seenTimeInput.getAttribute('value');
  }

  async setDeptCodeInput(deptCode) {
    await this.deptCodeInput.sendKeys(deptCode);
  }

  async getDeptCodeInput() {
    return await this.deptCodeInput.getAttribute('value');
  }

  async setDeptNameInput(deptName) {
    await this.deptNameInput.sendKeys(deptName);
  }

  async getDeptNameInput() {
    return await this.deptNameInput.getAttribute('value');
  }

  async setClinicCodeInput(clinicCode) {
    await this.clinicCodeInput.sendKeys(clinicCode);
  }

  async getClinicCodeInput() {
    return await this.clinicCodeInput.getAttribute('value');
  }

  async setClinicNameInput(clinicName) {
    await this.clinicNameInput.sendKeys(clinicName);
  }

  async getClinicNameInput() {
    return await this.clinicNameInput.getAttribute('value');
  }

  async setConsultantCodeInput(consultantCode) {
    await this.consultantCodeInput.sendKeys(consultantCode);
  }

  async getConsultantCodeInput() {
    return await this.consultantCodeInput.getAttribute('value');
  }

  async setConsultantNameInput(consultantName) {
    await this.consultantNameInput.sendKeys(consultantName);
  }

  async getConsultantNameInput() {
    return await this.consultantNameInput.getAttribute('value');
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

export class VisitBarDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-visitBar-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-visitBar'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
