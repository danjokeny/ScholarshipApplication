import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)
export class Home {
  constructor(router) {
	this.router = router;
          this.message = 'Scholarship Application Login Page';
  }

  login(){
	  this.router.navigate('users');
  }
}