import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { User } from '../resources/data/user-object'


@inject(Router, User)
export class Users {
  constructor(router, users) {
    this.router = router;
    this.users = users;
    this.message = 'Scholarship Applications';
    this.message2 = 'List of Users - Administrator Access';
    this.showUserEditForm = false;
  }

  async activate() {
    await this.getUsers();
  }

  attached() {
    feather.replace()
  }

  async getUsers() {
    await this.users.getUsers();
  }

  newUser() {
    this.user = {
      firstName: "",
      lastName: "",
      active: true,
      role: "requester",
      email: "",
      phone: "",
      password: ""
    }
    this.openEditForm();
  }

  openEditForm() {
    this.showUserEditForm = true;
    setTimeout(() => { $("#firstName").focus(); }, 500);
  }

  editUser(user) {
    this.user = user;
    this.openEditForm();
  }

  changeActive(user) {
    this.user = user;
    this.save();
  }

  async save() {
    if (this.user.firstName && this.user.lastName
      && this.user.email && this.user.password && this.user.phone) {
      await this.users.saveUser(this.user);
      await this.users.getUsers();

      this.back();
    }
  }


  back() {
    this.showUserEditForm = false;
  }

  async delete() {
    if (this.user) {
      await this.users.delete(this.user);
      await this.getUsers();
      this.back();
    }
  }
 
}

