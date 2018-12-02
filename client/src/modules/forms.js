import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Form } from '../resources/data/form-object'


@inject(Router, Form)
export class Forms {
  constructor(router, forms) {
    this.router = router;
    this.forms = forms;
    this.message = 'Forms';
    this.showFormEditForm = false;
  }

  async activate() {
    await this.getForms();
  }

  attached() {
    feather.replace()
  }

  async getForms() {
    await this.forms.getforms();
  }

  newForm() {
    this.form = {
      requesterId: this.userObj._id,
      reviewerId: "a1a1a1a1a1a1a1a1a1a1a1a1",
      schoolName: "",
      courseOfStudy: "",
      schoolYear: "",
      amountRequested: "",
      applicantComments: "",
      reviewComments: "",
      status: "new",
    }
    this.openEditForm();
  }

  openEditForm() {
    this.showFormEditForm = true;
    setTimeout(() => { $("#requesterId").focus(); }, 500);
  }

  editForm(form) {
    this.form = form;
    this.openEditForm();
  }
  async save() {
    if (this.form && this.form.requestorId && this.form.reviewerId) {
      await this.forms.saveForm(this.form);
      await this.forms.getForms();
      this.back();
    }
  }

  back() {
    this.showFormEditForm = false;
  }
}

