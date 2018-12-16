define('app',["exports", "aurelia-auth"], function (_exports, _aureliaAuth) {
  "use strict";

  _exports.__esModule = true;
  _exports.App = void 0;

  var App =
  /*#__PURE__*/
  function () {
    function App() {}

    var _proto = App.prototype;

    _proto.configureRouter = function configureRouter(config, router) {
      this.router = router;
      config.addPipelineStep('authorize', _aureliaAuth.AuthorizeStep);
      config.map([{
        route: ['', 'landing'],
        moduleId: './modules/landing',
        name: 'Landing',
        auth: false
      }, {
        route: 'users',
        moduleId: './modules/users',
        name: 'Users',
        auth: true
      }, {
        route: 'forms',
        moduleId: './modules/forms',
        name: 'Forms',
        auth: true
      }]);
    };

    return App;
  }();

  _exports.App = App;
});
define('text!app.html',[],function(){return "<template>\n  <nav-bar></nav-bar>\n  <router-view></router-view>\n</template>\n";});
define('auth-config',["exports"], function (_exports) {
  "use strict";

  _exports.__esModule = true;
  _exports.default = void 0;
  var authConfig = {
    baseUrl: "http://localhost:3300/api",
    loginUrl: '/users/login',
    tokenName: 'token',
    authHeader: 'Authorization',
    authToken: '',
    logoutRedirect: '#/landing'
  };
  var _default = authConfig;
  _exports.default = _default;
});
define('environment',["exports"], function (_exports) {
  "use strict";

  _exports.__esModule = true;
  _exports.default = void 0;
  var _default = {
    debug: true,
    testing: true
  };
  _exports.default = _default;
});
define('main',["exports", "./environment", "regenerator-runtime", "./auth-config"], function (_exports, _environment, _regeneratorRuntime, _authConfig) {
  "use strict";

  _exports.__esModule = true;
  _exports.configure = configure;
  _environment = _interopRequireDefault(_environment);
  _regeneratorRuntime = _interopRequireDefault(_regeneratorRuntime);
  _authConfig = _interopRequireDefault(_authConfig);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  // supports async-await
  window.regeneratorRuntime = _regeneratorRuntime.default; // supports async-await

  function configure(aurelia) {
    aurelia.use.standardConfiguration().plugin('aurelia-auth', function (baseConfig) {
      baseConfig.configure(_authConfig.default);
    }).feature('resources');
    aurelia.use.developmentLogging(_environment.default.debug ? 'debug' : 'warn');

    if (_environment.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    return aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('text!modules/components/editForm.html',[],function(){return "<template>\r\n    <!-- set to 8 columns of 12 to not use the whole page -->\r\n    <div class=\"container\">\r\n        <div class=\"row justify-content-center\">\r\n            <div class=\"col-8\">\r\n                <!-- toolbar at the top of the form -->\r\n                <div class=\"list-group-item\">\r\n                    <span click.trigger=\"back()\"><i data-feather=\"arrow-left-circle\"></i></span>\r\n                    <span click.trigger=\"save()\" style=\"margin-left:5px;\"><i data-feather=\"save\"></i></span>\r\n                    <span show.bind=\"form._id\" click.trigger=\"delete(form)\"><i data-feather=\"trash\"></i></span>\r\n                </div>\r\n                <!-- edit application form -->\r\n\r\n                <div class=\"form-group\" show.bind=\"showStatusInForm\" style=\"margin-top:20px;\">\r\n                    <label for=\"Status\">Status</label>\r\n                    <select value.bind=\"form.status\" class=\"form-control\" id=\"Status\">\r\n                        <option value=\"new\">New</option>\r\n                        <option value=\"approved\">Approved</option>\r\n                        <option value=\"denied\">Denied</option>\r\n                    </select>\r\n                </div>\r\n                <div class=\"form-group\" style=\"margin-top:20px;\">\r\n                    <label for=\"schoolName\">School name</label>\r\n                    <input type=\"email\" class=\"form-control\" value.bind=\"form.schoolName\">\r\n                </div>\r\n                <div class=\"form-group\">\r\n                    <label for=\"courseOfStudy\">Course of Study</label>\r\n                    <input type=\"email\" class=\"form-control\" value.bind=\"form.courseOfStudy\">\r\n                </div>\r\n                <div class=\"form-group\">\r\n                    <label for=\"schoolYear\">School Year</label>\r\n                    <!-- <label class=\"warn\" for=\"schoolYearWarn\">*must be a numeric year</label> -->\r\n                    <input type=\"number\" class=\"form-control\" value.bind=\"form.schoolYear\">\r\n                </div>\r\n                <div class=\"form-group\">\r\n                    <label for=\"amountRequested\">Amount Requested</label>\r\n                    <!-- <label class=\"warn\" for=\"amountWarn\">*must be a numeric dollar amount</label> -->\r\n                    <input type=\"number\" class=\"form-control\" value.bind=\"form.amountRequested\" >\r\n                </div>\r\n                <div class=\"row\">\r\n                    <div class=\"col-2\">\r\n                        <label class=\"btn btn-primary\">\r\n                            Browse for files&hellip; <input type=\"file\" style=\"display: none;\" change.delegate=\"changeFiles()\"\r\n                                files.bind=\"files\">\r\n                        </label>\r\n                    </div>\r\n                    <div class=\"col-10\">\r\n                        <ul>\r\n                            <li repeat.for=\"file of filesToUpload\" class=\"list-group-item\">${file.name}<span\r\n                                    click.delegate=\"removeFile($index)\" class=\"pull-right\"></li>\r\n                        </ul>\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"form-group\">\r\n                    <label for=\"applicantComment\">Your Application (please upload your formal application as a PDF file and add additional comments in the box below)</label>\r\n                    <textarea class=\"form-control\" rows=\"3\" value.bind=\"form.applicantComments\" placeholder=\"Additional comments here.\"></textarea>\r\n                </div>\r\n                <div>\r\n                    <a href=\"http://localhost:3300/uploadedFiles/forms/${form.file.fileName}\" target=\"_blank\">${form.file.originalFileName}</a>\r\n                </div>\r\n\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>";});
define('text!modules/components/editUser.html',[],function(){return "<template>\r\n    <div class=\"container\">\r\n        <div class=\"row justify-content-center\">\r\n            <div class=\"col-8\">\r\n                <div class=\"list-group-item\">\r\n                    <span click.trigger=\"back()\"><i data-feather=\"arrow-left-circle\"></i></span>\r\n                    <span click.trigger=\"save()\" style=\"margin-left:5px;\"><i data-feather=\"save\"></i></span>\r\n                    <span show.bind=\"user._id\" click.trigger=\"delete()\"><i data-feather=\"trash-2\"></i></span>\r\n                </div>\r\n\r\n                <div class=\"form-group\" style=\"margin-top:20px;\">\r\n                    <label for=\"firstName\">First name</label>\r\n                    <input type=\"email\" class=\"form-control\" value.bind=\"user.firstName\" id=\"firstName\" placeholder=\"First name\">\r\n                </div>\r\n                <div class=\"form-group\" style=\"margin-top:20px;\">\r\n                    <label for=\"lastName\">Last name</label>\r\n                    <input type=\"email\" class=\"form-control\" value.bind=\"user.lastName\" id=\"lastName\" placeholder=\"Last name\">\r\n                </div>\r\n                <div class=\"form-group\" style=\"margin-top:20px;\">\r\n                        <label for=\"email\">Email</label>\r\n                        <input type=\"email\" class=\"form-control\" value.bind=\"user.email\" id=\"email\" placeholder=\"Email\">\r\n                </div>\r\n                <div class=\"form-group\">\r\n                        <label for=\"phone\">Phone</label>\r\n                        <input type=\"email\" class=\"form-control\" value.bind=\"user.phone\" id=\"phone\" placeholder=\"xxx-xxx-xxxx\">\r\n                </div>\r\n                <div class=\"form-group\" style=\"margin-top:20px;\">\r\n                    <label for=\"inputPassword\">Password</label>\r\n                    <input type=\"password\" class=\"form-control\" value.bind=\"user.password\" id=\"password\" placeholder=\"Password\">\r\n                </div>\r\n                <div class=\"form-group\">\r\n                    <label for=\"role\">Role</label>\r\n                    <select value.bind=\"user.role\" class=\"form-control\" id=\"role\">\r\n                        <option value=\"requester\">Requester</option>\r\n                        <option value=\"reviewer\">Reviewer</option>\r\n                        <option value=\"admin\">Administrator</option>\r\n                    </select>\r\n                </div>\r\n                <div class=\"form-check\">\r\n                    <input class=\"form-check-input\" checked.bind=\"user.active\" type=\"checkbox\" value=\"\" id=\"defaultCheck1\">\r\n                    <label class=\"form-check-label\" for=\"defaultCheck1\">\r\n                        Active\r\n                    </label>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n</template>";});
define('text!modules/components/tableForms.html',[],function(){return "<template>\r\n    <div class=\"container\">\r\n        <div class=\"row justify-content-center\">\r\n            <div class=\"col-10\">\r\n                <table class=\"table\">\r\n                    <thead>\r\n                        <tr>\r\n                            <th colspan=\"4\">\r\n                                <span click.trigger=\"newForm()\"><i data-feather=\"plus\"></i></span>\r\n                                <span click.trigger=\"getForms()\" style=\"margin-left:5px;\"><i data-feather=\"refresh-cw\"></i></span>\r\n                            </th>\r\n                        </tr>\r\n\r\n                        <tr >\r\n                                <th scope=\"col\" show.bind=\"showNameInTable\">Requestor</th>\r\n                                <th scope=\"col\">Date Created</th>\r\n                                <th scope=\"col\">Status</th>\r\n                                <th scope=\"col\">School Name</th>\r\n                                <th scope=\"col\">Course of Study</th>\r\n                                <th scope=\"col\">School Year</th>\r\n                                <th scope=\"col\">Amount requested</th>\r\n                                <th scope=\"col\" show.bind=\"showNameInTable\">Reviewer</th>\r\n                            </tr>\r\n\r\n                    </thead>\r\n\r\n                    <tbody>\r\n                        <tr click.trigger=\"editForm(form)\" repeat.for=\"form of forms.formsArray\">\r\n                            <td show.bind=\"showNameInTable\">\r\n                                ${form.requesterId.firstName}\r\n\r\n                                ${form.requesterId.lastName}\r\n                            </td>\r\n                            <td innerhtml.bind=\"form.dateCreated | formatDate\"></td>\r\n                            <td>${form.status}</td>\r\n                            <td>${form.schoolName}</td>\r\n                            <td>${form.courseOfStudy}</td>\r\n                            <td>${form.schoolYear}</td>\r\n                            <td>${form.amountRequested}</td>\r\n                            <td show.bind=\"showNameInTable\">\r\n                                ${form.reviewerId.firstName}\r\n\r\n                                ${form.reviewerId.lastName}\r\n                            </td>\r\n                        </tr>\r\n                    </tbody>\r\n                </table>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>";});
define('text!modules/components/tableUsers.html',[],function(){return "<template>\r\n        <!-- set to 8 columns of 12 to not use the whole page -->\r\n        <div class=\"container\">\r\n            <div class=\"row justify-content-left\">\r\n                <div class=\"col-8\">\r\n    \r\n                    <table class=\"table\">\r\n                        <thead>\r\n                            <!-- toolbar at the top of the table -->\r\n                            <tr>\r\n                                <th colspan=\"4\">\r\n                                   <span click.trigger=\"newUser()\"><i data-feather=\"plus\"></i></span>\r\n                                    <span click.trigger=\"getUsers()\" style=\"margin-left:5px;\"><i data-feather=\"refresh-cw\"></i></span>\r\n                                </th>\r\n                            </tr>\r\n    \r\n                            <!-- table headings -->\r\n                            <tr>\r\n                                <th scope=\"col\">First</th>\r\n                                <th scope=\"col\">Last</th>\r\n                                <th scope=\"col\">Email</th>\r\n                                <th scope=\"col\">Phone</th>\r\n                                <th scope=\"col\">Role</th>\r\n                                <th scope=\"col\">Active</th>\r\n                            </tr>\r\n                        </thead>\r\n    \r\n                        <!-- table content -->\r\n                        <tbody>\r\n                            <tr repeat.for=\"user of users.usersArray\">\r\n                                <td click.trigger=\"editUser(user)\">${user.firstName}</td> \r\n                                <td click.trigger=\"editUser(user)\">${user.lastName}</td>\r\n                                <td click.trigger=\"editUser(user)\">${user.email}</td>\r\n                                <td click.trigger=\"editUser(user)\">${user.phone}</td>\r\n                                <td click.trigger=\"editUser(user)\">${user.role}</td>\r\n                                <td>\r\n                                    <div class=\"form-check\">\r\n                                        <input class=\"form-check-input\" change.delegate=\"changeActive(user)\" checked.bind=\"user.active\"\r\n                                        type=\"checkbox\" value=\"\" id=\"defaultCheck1\">\r\n                                    </div>\r\n                                </td>\r\n                            </tr>\r\n                        </tbody>\r\n                    </table>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </template>";});
define('modules/forms',["exports", "aurelia-framework", "aurelia-router", "../resources/data/form-object"], function (_exports, _aureliaFramework, _aureliaRouter, _formObject) {
  "use strict";

  _exports.__esModule = true;
  _exports.Forms = void 0;

  var _dec, _class;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  var Forms = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _formObject.Form), _dec(_class =
  /*#__PURE__*/
  function () {
    function Forms(router, forms) {
      this.router = router;
      this.userObj = JSON.parse(sessionStorage.getItem('userObj'));
      this.forms = forms;
      this.message = 'Scholarship Applications';
      this.message2 = 'For ' + this.userObj.firstName + ' ' + this.userObj.lastName;
      this.showNameInTable = false;
      this.showStatusInForm = false;
      this.showFormEditForm = false;
    }

    var _proto = Forms.prototype;

    _proto.activate =
    /*#__PURE__*/
    function () {
      var _activate = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.getForms();

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function activate() {
        return _activate.apply(this, arguments);
      };
    }();

    _proto.attached = function attached() {
      feather.replace();
    };

    _proto.getForms =
    /*#__PURE__*/
    function () {
      var _getForms = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                console.log('this.userObj.role = ' + this.userObj.role);

                if (!this.userObj) {
                  _context2.next = 20;
                  break;
                }

                if (!(this.userObj.role == "admin")) {
                  _context2.next = 9;
                  break;
                }

                this.showNameInTable = true;
                this.showStatusInForm = true;
                _context2.next = 7;
                return this.forms.getForms(this.userObj);

              case 7:
                _context2.next = 20;
                break;

              case 9:
                if (!(this.userObj.role == "reviewer")) {
                  _context2.next = 16;
                  break;
                }

                this.showNameInTable = true;
                this.showStatusInForm = true;
                _context2.next = 14;
                return this.forms.getForms(this.userObj);

              case 14:
                _context2.next = 20;
                break;

              case 16:
                this.showNameInTable = false;
                this.showStatusInForm = false;
                _context2.next = 20;
                return this.forms.getFormsUser(this.userObj);

              case 20:
                console.log('this.userObj.role = ' + this.userObj.role);

              case 21:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function getForms() {
        return _getForms.apply(this, arguments);
      };
    }();

    _proto.newForm = function newForm() {
      this.form = {
        requesterId: this.userObj._id,
        reviewerId: this.userObj._id,
        schoolName: "",
        courseOfStudy: "",
        schoolYear: "",
        amountRequested: 2500,
        applicantComments: "",
        reviewComments: "",
        status: "new"
      };
      this.openEditForm();
    };

    _proto.openEditForm = function openEditForm() {
      this.showFormEditForm = true;
      setTimeout(function () {
        $("#requesterId").focus();
      }, 500);
    };

    _proto.editForm = function editForm(form) {
      this.form = form;
      this.openEditForm();
    };

    _proto.back = function back() {
      this.showFormEditForm = false;
      this.filesToUpload = new Array();
      this.files = new Array();
    };

    _proto.save =
    /*#__PURE__*/
    function () {
      var _save = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        var serverResponse;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(this.form && this.form.requesterId)) {
                  _context3.next = 9;
                  break;
                }

                //check if person editing is admin/staff, if so, set owner id
                if (this.userObj.role !== 'requester') {
                  console.log('set reviewerId id');
                  this.form.reviewerId = this.userObj._id;
                }

                ; //save data from the form

                _context3.next = 5;
                return this.forms.saveForm(this.form);

              case 5:
                serverResponse = _context3.sent;

                if (this.filesToUpload && this.filesToUpload.length > 0) {
                  this.forms.uploadFile(this.filesToUpload, serverResponse.contentID);
                }

                this.getForms(this.userObj);
                this.back();

              case 9:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function save() {
        return _save.apply(this, arguments);
      };
    }();

    _proto.changeFiles = function changeFiles() {
      var _this = this;

      this.filesToUpload = this.filesToUpload ? this.filesToUpload : new Array();

      for (var i = 0; i < this.files.length; i++) {
        var addFile = true;
        this.filesToUpload.forEach(function (item) {
          if (item.name === _this.files[i].name) addFile = false;
        });
        if (addFile) this.filesToUpload.push(this.files[i]);
      }
    };

    _proto.delete = function _delete(form) {
      this.form = form;
      this.forms.deleteForm(this.form._id);
      this.forms.getForms(this.userObj);
      this.back();
    };

    return Forms;
  }()) || _class);
  _exports.Forms = Forms;
});
define('text!modules/forms.html',[],function(){return "<template>\r\n    <require from=\"./home.css\"></require>\r\n\r\n    <h1>${message}</h1>\r\n    <h3  >${message2}</h3>\r\n\r\n    <div class=\"container\"></div>\r\n        <div class=\"row\">\r\n            <div class=\"col-9\" >\r\n                <compose show.bind=\"showFormEditForm\" view=\"./components/editForm.html\"></compose>\r\n                <compose show.bind=\"!showFormEditForm\" view=\"./components/tableForms.html\"></compose>\r\n            </div>\r\n            <div class=\"col-3\" >\r\n                <img src=\"../images/graduate_with_diploma.png\" class=\"img-fluid\" alt=\"Responsive image\" >\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n</template>";});
define('text!modules/home.css',[],function(){return "* {     font-family:  Helvetica;\r\n}\r\n\r\n.warn {\r\n  font-size: 12px;\r\n}\r\n\r\nh1 {\r\n    color: black;\r\n    text-align: center;\r\n  }\r\n\r\nh3 {\r\n    color: black;\r\n    text-align: center;\r\n }\r\n\r\n body {\r\n    background-color: lightblue;\r\n  }\r\n\r\n  small_img {\r\n    height:\"50px\"; width:\"50px\"; \r\n\r\n    margin-left: auto;\r\n    margin-right: auto;\r\n  }\r\n\r\n  img {\r\n    height:\"50%\"; width:\"50%\"; \r\n    display: block;\r\n    margin-left: auto;\r\n    margin-right: auto;\r\n  }\r\n";});
define('modules/landing',["exports", "aurelia-framework", "aurelia-router"], function (_exports, _aureliaFramework, _aureliaRouter) {
  "use strict";

  _exports.__esModule = true;
  _exports.Home = void 0;

  var _dec, _class;

  var Home = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router), _dec(_class =
  /*#__PURE__*/
  function () {
    function Home(router) {
      this.router = router;
      this.message = 'Scholarship Application Login Page';
    }

    var _proto = Home.prototype;

    _proto.login = function login() {
      this.router.navigate('users');
    };

    return Home;
  }()) || _class);
  _exports.Home = Home;
});
define('text!modules/landing.html',[],function(){return "<template>\r\n    <require from = \"./home.css\"></require>\r\n    <h1>${message}</h1>\r\n    <br><Br>\r\n    <img src=\"./images/scholarship.jpg\">\r\n</template>";});
define('modules/users',["exports", "aurelia-framework", "aurelia-router", "../resources/data/user-object"], function (_exports, _aureliaFramework, _aureliaRouter, _userObject) {
  "use strict";

  _exports.__esModule = true;
  _exports.Users = void 0;

  var _dec, _class;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  var Users = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _userObject.User), _dec(_class =
  /*#__PURE__*/
  function () {
    function Users(router, users) {
      this.router = router;
      this.users = users;
      this.message = 'Scholarship Applications';
      this.message2 = 'List of Users - Administrator Access';
      this.showUserEditForm = false;
    }

    var _proto = Users.prototype;

    _proto.activate =
    /*#__PURE__*/
    function () {
      var _activate = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.getUsers();

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function activate() {
        return _activate.apply(this, arguments);
      };
    }();

    _proto.attached = function attached() {
      feather.replace();
    };

    _proto.getUsers =
    /*#__PURE__*/
    function () {
      var _getUsers = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.users.getUsers();

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function getUsers() {
        return _getUsers.apply(this, arguments);
      };
    }();

    _proto.newUser = function newUser() {
      this.user = {
        firstName: "",
        lastName: "",
        active: true,
        role: "requester",
        email: "",
        phone: "",
        password: ""
      };
      this.openEditForm();
    };

    _proto.openEditForm = function openEditForm() {
      this.showUserEditForm = true;
      setTimeout(function () {
        $("#firstName").focus();
      }, 500);
    };

    _proto.editUser = function editUser(user) {
      this.user = user;
      this.openEditForm();
    };

    _proto.changeActive = function changeActive(user) {
      this.user = user;
      this.save();
    };

    _proto.save =
    /*#__PURE__*/
    function () {
      var _save = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(this.user.firstName && this.user.lastName && this.user.email && this.user.password && this.user.phone)) {
                  _context3.next = 6;
                  break;
                }

                _context3.next = 3;
                return this.users.saveUser(this.user);

              case 3:
                _context3.next = 5;
                return this.users.getUsers();

              case 5:
                this.back();

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function save() {
        return _save.apply(this, arguments);
      };
    }();

    _proto.back = function back() {
      this.showUserEditForm = false;
    };

    _proto.delete =
    /*#__PURE__*/
    function () {
      var _delete2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!this.user) {
                  _context4.next = 6;
                  break;
                }

                _context4.next = 3;
                return this.users.delete(this.user);

              case 3:
                _context4.next = 5;
                return this.getUsers();

              case 5:
                this.back();

              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function _delete() {
        return _delete2.apply(this, arguments);
      };
    }();

    return Users;
  }()) || _class);
  _exports.Users = Users;
});
define('text!modules/users.html',[],function(){return "<template>\r\n\t<require from=\"./home.css\"></require>\r\n\r\n\t<h1>${message}</h1>\r\n\t<h3>${message2}</h3>\r\n\t<div class=\"row\">\r\n\t\t<div class=\"col-3\">\r\n\t\t\t<img src=\"../images/man_with_award.png\" class=\"img-fluid\" alt=\"Responsive image\">\r\n\t\t</div>\r\n\t\t<div class=\"col-9\">\r\n\t\t\t<!--     <button click.trigger=\"newUser()\">New User</button> -->\r\n\t\t\t    <compose show.bind=\"showUserEditForm\" view=\"./components/editUser.html\"></compose>\r\n\t\t\t\t<compose show.bind=\"!showUserEditForm\" view=\"./components/tableUsers.html\"></compose>\r\n\t\t</div>\r\n\t</div>\r\n\r\n</template>";});
define('resources/data/data-services',["exports", "aurelia-framework", "aurelia-fetch-client"], function (_exports, _aureliaFramework, _aureliaFetchClient) {
  "use strict";

  _exports.__esModule = true;
  _exports.DataServices = void 0;

  var _dec, _class;

  var DataServices = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class =
  /*#__PURE__*/
  function () {
    function DataServices(http) {
      var _this = this;

      this.httpClient = http;
      this.BASE_URL = "http://localhost:3300/api/";
      this.httpClient.configure(function (config) {
        config.withBaseUrl(_this.BASE_URL).withDefaults({
          credentials: 'same-origin',
          headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'Fetch'
          }
        }).withInterceptor({
          request: function request(_request) {
            var authHeader = 'Bearer ' + localStorage.getItem('aurelia_token');

            _request.headers.append('Authorization', authHeader);

            console.log('Requesting ${request.method} ${request.url}');
            return _request;
          },
          response: function response(_response) {
            console.log('Received ${response.status} ${response.url}');
            return _response;
          }
        });
      });
    }

    var _proto = DataServices.prototype;

    _proto.get = function get(url) {
      return this.httpClient.fetch(url).then(function (response) {
        return response.json();
      }).then(function (data) {
        return data;
      }).catch(function (error) {
        return error;
      });
    };

    _proto.post = function post(content, url) {
      return this.httpClient.fetch(url, {
        method: 'post',
        body: (0, _aureliaFetchClient.json)(content)
      }).then(function (response) {
        return response.json();
      }).then(function (object) {
        return object;
      }).catch(function (error) {
        return error;
      });
    };

    _proto.put = function put(content, url) {
      return this.httpClient.fetch(url, {
        method: 'put',
        body: (0, _aureliaFetchClient.json)(content)
      }).then(function (response) {
        return response.json();
      }).then(function (object) {
        return object;
      }).catch(function (error) {
        return error;
      });
    };

    _proto.delete = function _delete(url) {
      return this.httpClient.fetch(url, {
        method: 'delete'
      }).then(function (response) {
        return response.json();
      }).then(function (object) {
        return object;
      }).catch(function (error) {
        return error;
      });
    };

    _proto.uploadFiles = function uploadFiles(files, url) {
      var formData = new FormData();
      files.forEach(function (item, index) {
        formData.append("file" + index, item);
      });
      return this.httpClient.fetch(url, {
        method: 'post',
        body: formData
      }).then(function (response) {
        return response.json();
      }).then(function (object) {
        return object;
      }).catch(function (error) {
        return error;
      });
    };

    return DataServices;
  }()) || _class);
  _exports.DataServices = DataServices;
});
define('resources/data/form-object',["exports", "aurelia-framework", "./data-services"], function (_exports, _aureliaFramework, _dataServices) {
  "use strict";

  _exports.__esModule = true;
  _exports.Form = void 0;

  var _dec, _class;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  var Form = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class =
  /*#__PURE__*/
  function () {
    function Form(data) {
      this.data = data;
      this.FORM_SERVICE = 'forms';
    }

    var _proto = Form.prototype;

    _proto.saveForm =
    /*#__PURE__*/
    function () {
      var _saveForm = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(form) {
        var serverResponse;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!form) {
                  _context.next = 11;
                  break;
                }

                if (!form._id) {
                  _context.next = 7;
                  break;
                }

                _context.next = 4;
                return this.data.put(form, this.FORM_SERVICE);

              case 4:
                serverResponse = _context.sent;
                _context.next = 10;
                break;

              case 7:
                _context.next = 9;
                return this.data.post(form, this.FORM_SERVICE);

              case 9:
                serverResponse = _context.sent;

              case 10:
                return _context.abrupt("return", serverResponse);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function saveForm(_x) {
        return _saveForm.apply(this, arguments);
      };
    }();

    _proto.getForms =
    /*#__PURE__*/
    function () {
      var _getForms = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(userObj) {
        var url, response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                url = 'forms/';
                _context2.next = 3;
                return this.data.get(url);

              case 3:
                response = _context2.sent;

                if (!response.error) {
                  this.formsArray = response;
                } else {
                  this.formsArray = [];
                }

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function getForms(_x2) {
        return _getForms.apply(this, arguments);
      };
    }();

    _proto.getFormsUser =
    /*#__PURE__*/
    function () {
      var _getFormsUser = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(userObj) {
        var url, response;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                url = '/users/email/' + userObj.email;
                _context3.next = 3;
                return this.data.get(url);

              case 3:
                response = _context3.sent;

                if (!response.error) {
                  this.formsArray = response;
                } else {
                  this.formsArray = [];
                }

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function getFormsUser(_x3) {
        return _getFormsUser.apply(this, arguments);
      };
    }();

    _proto.uploadFile =
    /*#__PURE__*/
    function () {
      var _uploadFile = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(files, id) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.data.uploadFiles(files, this.FORM_SERVICE + "/upload/" + id);

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function uploadFile(_x4, _x5) {
        return _uploadFile.apply(this, arguments);
      };
    }(); //deleteForm


    _proto.deleteForm =
    /*#__PURE__*/
    function () {
      var _deleteForm = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(inForm) {
        var serverResponse;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!inForm) {
                  _context5.next = 3;
                  break;
                }

                _context5.next = 3;
                return this.data.delete(this.FORM_SERVICE + '/' + inForm);

              case 3:
                ;
                return _context5.abrupt("return", serverResponse);

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function deleteForm(_x6) {
        return _deleteForm.apply(this, arguments);
      };
    }();

    return Form;
  }()) || _class);
  _exports.Form = Form;
});
define('resources/data/user-object',["exports", "aurelia-framework", "./data-services"], function (_exports, _aureliaFramework, _dataServices) {
  "use strict";

  _exports.__esModule = true;
  _exports.User = void 0;

  var _dec, _class;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  var User = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class =
  /*#__PURE__*/
  function () {
    function User(data) {
      this.data = data;
      this.USER_SERVICE = 'users';
    }

    var _proto = User.prototype;

    _proto.saveUser =
    /*#__PURE__*/
    function () {
      var _saveUser = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(user) {
        var serverResponse;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!user) {
                  _context.next = 11;
                  break;
                }

                if (!user._id) {
                  _context.next = 7;
                  break;
                }

                _context.next = 4;
                return this.data.put(user, this.USER_SERVICE);

              case 4:
                serverResponse = _context.sent;
                _context.next = 10;
                break;

              case 7:
                _context.next = 9;
                return this.data.post(user, this.USER_SERVICE);

              case 9:
                serverResponse = _context.sent;

              case 10:
                return _context.abrupt("return", serverResponse);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function saveUser(_x) {
        return _saveUser.apply(this, arguments);
      };
    }();

    _proto.getUsers =
    /*#__PURE__*/
    function () {
      var _getUsers = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.data.get(this.USER_SERVICE);

              case 2:
                response = _context2.sent;

                if (!response.error) {
                  this.usersArray = response;
                } else {
                  this.usersArray = [];
                }

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function getUsers() {
        return _getUsers.apply(this, arguments);
      };
    }();

    _proto.delete =
    /*#__PURE__*/
    function () {
      var _delete2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(user) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(user && user._id)) {
                  _context3.next = 3;
                  break;
                }

                _context3.next = 3;
                return this.data.delete(this.USER_SERVICE + '/' + user._id);

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function _delete(_x2) {
        return _delete2.apply(this, arguments);
      };
    }();

    return User;
  }()) || _class);
  _exports.User = User;
});
define('resources/elements/nav-bar',["exports", "aurelia-framework", "aurelia-router", "aurelia-auth"], function (_exports, _aureliaFramework, _aureliaRouter, _aureliaAuth) {
  "use strict";

  _exports.__esModule = true;
  _exports.NavBar = void 0;

  var _dec, _class;

  var NavBar = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _aureliaAuth.AuthService), _dec(_class =
  /*#__PURE__*/
  function () {
    function NavBar(router, auth) {
      this.router = router;
      this.auth = auth;
      this.loginMessage = '';
      this.authenticated = false;
      this.email = "";
      this.password = "";
    } //jQuery lifecycle method for highlighting selected menu option


    var _proto = NavBar.prototype;

    _proto.attached = function attached() {
      $('.navbar-nav a').on('click', function () {
        $('.navbar-nav').find('li.active').removeClass('active');
        $(this).parent('li').addClass('active');
      });
    };

    _proto.login = function login() {
      var _this = this;

      return this.auth.login(this.email, this.password).then(function (response) {
        _this.userObj = response.user;
        sessionStorage.setItem("userObj", JSON.stringify(_this.userObj));
        _this.loginError = "";
        _this.isAuthenticated = _this.auth.isAuthenticated();
        _this.loginMessage = "Welcome " + _this.userObj.firstName + "!";

        _this.router.navigate('forms');
      }).catch(function (error) {
        console.log(error);
        _this.authenticated = false;
        _this.loginMessage = "Invalid credentials.";
      });
    };

    _proto.logout = function logout() {
      sessionStorage.removeItem('userObj');
      this.auth.logout();
      this.isAuthenticated = this.auth.isAuthenticated();
    };

    _proto.bind = function bind() {
      this.isAuthenticated = this.auth.isAuthenticated();
    };

    return NavBar;
  }()) || _class);
  _exports.NavBar = NavBar;
});
define('text!resources/elements/nav-bar.html',[],function(){return "<template>\r\n    <nav class=\"navbar navbar-expand-lg navbar-dark bg-primary\">\r\n        <a class=\"navbar-brand\" href=\"#\">MyScholarship!</a>\r\n        <button class=\"navbar-toggler\" type=\"button\" \r\n            data-toggle=\"collapse\" data-target=\"#navbarNav\" aria-controls=\"navbarNav\"\r\n            aria-expanded=\"false\" aria-label=\"Toggle navigation\">\r\n            <span class=\"navbar-toggler-icon\"></span>\r\n        </button>\r\n        <span show.bind=\"loginMessage\" style=\"color:white;margin-left:10px;\">\r\n            ${loginMessage}\r\n        </span>\r\n\r\n        <div class=\"collapse navbar-collapse\" id=\"navbarNav\">\r\n            <form show.bind=\"!isAuthenticated\" class=\"form-inline\">\r\n                <div class=\"form-group mb-2\">\r\n                    <label for=\"staticEmail2\" class=\"sr-only\">Email</label>\r\n                    <input type=\"text\" class=\"form-control\" id=\"staticEmail2\" value.bind=\"email\" placeholder=\"email@example.com\">\r\n                </div>\r\n                <div class=\"form-group mx-sm-3 mb-2\">\r\n                    <label for=\"inputPassword2\" class=\"sr-only\">Password</label>\r\n                    <input type=\"password\" class=\"form-control\" id=\"inputPassword2\" value.bind=\"password\" placeholder=\"Password\">\r\n                </div>\r\n                <button click.trigger=\"login()\" class=\"btn btn-primary mb-2\">Login</button>\r\n                <span show.bind=\"!loginMessage\" style=\"color:white;margin-left:10px;\">${loginMessage}</span>\r\n            </form>\r\n        </div>\r\n\r\n        <div class=\"collapse navbar-collapse\" id=\"navbarNav\">\r\n            <ul class=\"navbar-nav\" show.bind=\"isAuthenticated\">\r\n\r\n                    <li class=\"nav-item active\">\r\n                        <a class=\"nav-link\" href=\"#forms\">Applications <span class=\"sr-only\">(current)</span></a>\r\n                    </li>\r\n                    <li class=\"nav-item\">\r\n                        <a class=\"nav-link\" show.bind=\"userObj.role ==='admin'\" href=\"#users\">Users</a>\r\n                    </li>\r\n\r\n                    <li class=\"nav-item\">\r\n                        <a class=\"nav-link\" href=\"#Logout\" click.trigger=\"logout()\">Logout</a>\r\n                    </li>\r\n  \r\n            </ul>\r\n        </div>\r\n    </nav>\r\n</template>\r\n";});
define('resources/index',["exports"], function (_exports) {
  "use strict";

  _exports.__esModule = true;
  _exports.configure = configure;

  function configure(config) {
    //global references
    config.globalResources(['./elements/nav-bar']);
    config.globalResources(['./value-converters/format-date']);
  }
});
define('resources/value-converters/format-date',["exports"], function (_exports) {
  "use strict";

  _exports.__esModule = true;
  _exports.FormatDateValueConverter = void 0;

  var FormatDateValueConverter =
  /*#__PURE__*/
  function () {
    function FormatDateValueConverter() {}

    var _proto = FormatDateValueConverter.prototype;

    _proto.toView = function toView(value) {
      var myDate = new Date(value);
      return myDate.toLocaleDateString() + "<br/>" + myDate.toLocaleTimeString();
    };

    return FormatDateValueConverter;
  }();

  _exports.FormatDateValueConverter = FormatDateValueConverter;
});
define('resources',['resources/index'],function(m){return m;});
//# sourceMappingURL=app-bundle.js.map