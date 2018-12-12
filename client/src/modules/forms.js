import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Form } from '../resources/data/form-object'


@inject(Router, Form)
export class Forms {
  constructor(router, forms) {
    this.router = router;
    this.userObj = JSON.parse(sessionStorage.getItem('userObj'));
    this.forms = forms;
    this.message = 'Scholarship Applications';
    this.message2 = 'For ' + this.userObj.firstName + ' ' + this.userObj.lastName;
    this.showNameInTable = false;
    this.showStatusInForm = false;
    this.showFormEditForm = false;
  }

  async activate() {

    await this.getForms();
  }

  attached() {
    feather.replace()
  }


  async getForms() {
    console.log('this.userObj.role = ' + this.userObj.role);

    if (this.userObj) {
      if (this.userObj.role == "admin") {
        this.showNameInTable = true;
        this.showStatusInForm = true;
        await this.forms.getForms(this.userObj);
      } else if (this.userObj.role == "reviewer") {
        this.showNameInTable = true;
        this.showStatusInForm = true;
        await this.forms.getForms(this.userObj);
      }
      else {
        this.showNameInTable = false;
        this.showStatusInForm = false;
        await this.forms.getFormsUser(this.userObj);
      }
    }
    console.log('this.userObj.role = ' + this.userObj.role);
  }

  newForm() {
    this.form = {
      requesterId: this.userObj._id,
      reviewerId: this.userObj._id,
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
    if (this.form && this.form.requesterId) {
      //check if person editing is admin/staff, if so, set owner id
      if (this.userObj.role !== 'requester') {
        console.log('set reviewerId id')
        this.form.reviewerId = this.userObj._id;
      };
      //save data from the form
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