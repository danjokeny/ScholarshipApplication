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


    async getUsers() {
        let response = await this.data.get(this.USER_SERVICE);
        if (!response.error) {
            this.usersArray = response;
        } else {
            this.usersArray = [];
        }
    }

    async delete(user) {
        if (user && user._id) {
            await this.data.delete(this.USER_SERVICE + '/' + user._id)
        }
    }

}
