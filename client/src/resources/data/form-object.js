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
        let url = '/users/email/' + userObj.email;
        let response = await this.data.get(url);
        if (!response.error) {
            this.formsArray = response;
        } else {
            this.formsArray = [];
        }
    }
}
