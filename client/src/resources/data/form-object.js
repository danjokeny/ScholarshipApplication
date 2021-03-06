import { inject } from 'aurelia-framework';
import { DataServices } from './data-services';

@inject(DataServices)
export class Form {
    constructor(data) {
        this.data = data;
        this.FORM_SERVICE = 'forms';
    }

    async saveForm(form) {
        let serverResponse;
        if (form) {
            if (form._id) {
                serverResponse = await this.data.put(form, this.FORM_SERVICE);
            } else {
                serverResponse = await this.data.post(form, this.FORM_SERVICE);
            }
            return serverResponse;
        }
    }


    async getForms(userObj) {
        let url = 'forms/';
        let response = await this.data.get(url);
        if (!response.error) {
            this.formsArray = response;
        } else {
            this.formsArray = [];
        }
    }

    async getFormsUser(userObj) {
        let url = '/users/email/' + userObj.email;
        let response = await this.data.get(url);
        if (!response.error) {
            this.formsArray = response;
        } else {
            this.formsArray = [];
        }
    }

    async uploadFile(files, id) {
        await this.data.uploadFiles(files, this.FORM_SERVICE + "/upload/" + id);
    }


    //deleteForm
    async deleteForm(inForm) {
        let serverResponse;
        if (inForm) {
            await this.data.delete(this.FORM_SERVICE + '/' + inForm)
        };
        return serverResponse;
    };
}
