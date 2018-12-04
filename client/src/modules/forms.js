import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Form } from '../resources/data/form-object'


@inject(Router, Form)
export class Forms {
  constructor(router, forms) {
    this.router = router;
    this.forms = forms;
    this.message = 'My Applications';
    this.showFormEditForm = false;
    this.userObj = JSON.parse(sessionStorage.getItem('userObj'));
  }

  async activate() {
    await this.getForms();
  }

  attached() {
    feather.replace()
  }

  async getForms(userObj) {
    await this.forms.getForms(this.userObj);
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
    if (this.form && this.form.requesterId && this.form.reviewerId) {
      await this.forms.saveForm(this.form);
      await this.forms.getForms(this.userObj);
      this.back();
    }
  }

  back() {
    this.showFormEditForm = false;
  }
}

