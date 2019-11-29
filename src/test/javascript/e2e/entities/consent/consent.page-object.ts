import { element, by, ElementFinder } from 'protractor';

export class ConsentComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-consent div table .btn-danger'));
  title = element.all(by.css('jhi-consent div h2#page-heading span')).first();

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

export class ConsentUpdatePage {
  pageTitle = element(by.id('jhi-consent-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  consentIdInput = element(by.id('field_consentId'));
  descriptionInput = element(by.id('field_description'));
  indicationBenefitsInput = element(by.id('field_indicationBenefits'));
  complicationsInput = element(by.id('field_complications'));
  alternativesInput = element(by.id('field_alternatives'));
  patientSelect = element(by.id('field_patient'));
  visitSelect = element(by.id('field_visit'));
  instituteSelect = element(by.id('field_institute'));
  statusSelect = element(by.id('field_status'));
  categorySelect = element(by.id('field_category'));
  scopeSelect = element(by.id('field_scope'));
  createdBySelect = element(by.id('field_createdBy'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setConsentIdInput(consentId) {
    await this.consentIdInput.sendKeys(consentId);
  }

  async getConsentIdInput() {
    return await this.consentIdInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return await this.descriptionInput.getAttribute('value');
  }

  async setIndicationBenefitsInput(indicationBenefits) {
    await this.indicationBenefitsInput.sendKeys(indicationBenefits);
  }

  async getIndicationBenefitsInput() {
    return await this.indicationBenefitsInput.getAttribute('value');
  }

  async setComplicationsInput(complications) {
    await this.complicationsInput.sendKeys(complications);
  }

  async getComplicationsInput() {
    return await this.complicationsInput.getAttribute('value');
  }

  async setAlternativesInput(alternatives) {
    await this.alternativesInput.sendKeys(alternatives);
  }

  async getAlternativesInput() {
    return await this.alternativesInput.getAttribute('value');
  }

  async patientSelectLastOption() {
    await this.patientSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async patientSelectOption(option) {
    await this.patientSelect.sendKeys(option);
  }

  getPatientSelect(): ElementFinder {
    return this.patientSelect;
  }

  async getPatientSelectedOption() {
    return await this.patientSelect.element(by.css('option:checked')).getText();
  }

  async visitSelectLastOption() {
    await this.visitSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async visitSelectOption(option) {
    await this.visitSelect.sendKeys(option);
  }

  getVisitSelect(): ElementFinder {
    return this.visitSelect;
  }

  async getVisitSelectedOption() {
    return await this.visitSelect.element(by.css('option:checked')).getText();
  }

  async instituteSelectLastOption() {
    await this.instituteSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async instituteSelectOption(option) {
    await this.instituteSelect.sendKeys(option);
  }

  getInstituteSelect(): ElementFinder {
    return this.instituteSelect;
  }

  async getInstituteSelectedOption() {
    return await this.instituteSelect.element(by.css('option:checked')).getText();
  }

  async statusSelectLastOption() {
    await this.statusSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async statusSelectOption(option) {
    await this.statusSelect.sendKeys(option);
  }

  getStatusSelect(): ElementFinder {
    return this.statusSelect;
  }

  async getStatusSelectedOption() {
    return await this.statusSelect.element(by.css('option:checked')).getText();
  }

  async categorySelectLastOption() {
    await this.categorySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async categorySelectOption(option) {
    await this.categorySelect.sendKeys(option);
  }

  getCategorySelect(): ElementFinder {
    return this.categorySelect;
  }

  async getCategorySelectedOption() {
    return await this.categorySelect.element(by.css('option:checked')).getText();
  }

  async scopeSelectLastOption() {
    await this.scopeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async scopeSelectOption(option) {
    await this.scopeSelect.sendKeys(option);
  }

  getScopeSelect(): ElementFinder {
    return this.scopeSelect;
  }

  async getScopeSelectedOption() {
    return await this.scopeSelect.element(by.css('option:checked')).getText();
  }

  async createdBySelectLastOption() {
    await this.createdBySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async createdBySelectOption(option) {
    await this.createdBySelect.sendKeys(option);
  }

  getCreatedBySelect(): ElementFinder {
    return this.createdBySelect;
  }

  async getCreatedBySelectedOption() {
    return await this.createdBySelect.element(by.css('option:checked')).getText();
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

export class ConsentDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-consent-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-consent'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
