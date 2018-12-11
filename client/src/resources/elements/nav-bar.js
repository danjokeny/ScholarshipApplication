import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { AuthService } from 'aurelia-auth';


@inject(Router, AuthService)
export class NavBar {
    constructor(router, auth) {
        this.router = router;
        this.auth = auth;
        this.loginMessage = '';
        this.authenticated = false;
        this.email = "";
        this.password = "";
    }
    // runs after the browser builds the html
    // uses jQuery from bootstrap.  Makes menu items respond to clicks
    attached() {
        $('.navbar-nav a').on('click', function () {
            $('.navbar-nav').find('li.active').removeClass('active');
            $(this).parent('li').addClass('active');
        });
    }

    login() {
        return this.auth.login(this.email, this.password)
            .then(response => {
                this.userObj = response.user;
                sessionStorage.setItem("userObj", JSON.stringify(this.userObj));
                this.loginError = "";
                this.isAuthenticated = this.auth.isAuthenticated();
                this.loginMessage = "Welcome " + this.userObj.firstName + "!";
                this.router.navigate('forms');
            })
            .catch(error => {
                console.log(error);
                this.authenticated = false;
                this.loginMessage = "Invalid credentials.";
            });
    };

    logout() {
        sessionStorage.removeItem('user');
        this.auth.logout();
        this.isAuthenticated = this.auth.isAuthenticated();
    };

    bind() {
        this.isAuthenticated = this.auth.isAuthenticated();
    }
    
}
