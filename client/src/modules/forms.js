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
    console.log('this.userObj.role = ' + this.userObj.role);
    if (this.userObj.role = "admin") {
        await this.forms.getForms(this.userObj);
    } else {
        await this.forms.getFormsUser(this.userObj);
    }
    
  }

  newForm() {
    this.form = {
      requesterId: this.userObj._id,
      reviewerId: "a1a1a1a1a1a1a1a1a1a1a1a1",
      schoolName: "",
      courseOfStudy: "",
      schoolYear: "",
      amountRequested: 0,
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

  
  back() {
    this.showFormEditForm = false;
    this.filesToUpload = new Array();
    this.files = new Array();
  }

  async save() {
    if (this.form && this.form.requesterId && this.form.reviewerId) {
      let serverResponse = await this.forms.saveForm(this.form);
      if (this.filesToUpload && this.filesToUpload.length > 0) this.forms.uploadFile(this.filesToUpload, serverResponse.contentID);
      await this.forms.getForms(this.userObj);
      this.back();
    }
  }

  

  changeFiles() {
    this.filesToUpload = this.filesToUpload ? this.filesToUpload : new Array();
    for (var i = 0; i < this.files.length; i++) {
      let addFile = true;
      this.filesToUpload.forEach(item => {
        if (item.name === this.files[i].name) addFile = false;
      })
      if (addFile) this.filesToUpload.push(this.files[i]);
    }
  }

  delete(form) {
    this.form = form;
    this.forms.deleteForm(this.form._id);
    this.forms.getForms(this.userObj);
    this.back();
  }

}