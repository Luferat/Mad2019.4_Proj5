(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-contacts-contacts-module"],{

/***/ "EWb5":
/*!***************************************************!*\
  !*** ./src/app/pages/contacts/contacts.module.ts ***!
  \***************************************************/
/*! exports provided: ContactsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactsPageModule", function() { return ContactsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _contacts_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./contacts-routing.module */ "rUYa");
/* harmony import */ var _contacts_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./contacts.page */ "Tett");







// 1. Importa formulários do Angular

let ContactsPageModule = class ContactsPageModule {
};
ContactsPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _contacts_routing_module__WEBPACK_IMPORTED_MODULE_5__["ContactsPageRoutingModule"],
            // 2. Importa ReactiveFormsModule
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"]
        ],
        declarations: [_contacts_page__WEBPACK_IMPORTED_MODULE_6__["ContactsPage"]]
    })
], ContactsPageModule);



/***/ }),

/***/ "O6Z6":
/*!***************************************************!*\
  !*** ./src/app/pages/contacts/contacts.page.scss ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjb250YWN0cy5wYWdlLnNjc3MifQ== */");

/***/ }),

/***/ "Tett":
/*!*************************************************!*\
  !*** ./src/app/pages/contacts/contacts.page.ts ***!
  \*************************************************/
/*! exports provided: removeSpaces, ContactsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeSpaces", function() { return removeSpaces; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactsPage", function() { return ContactsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_contacts_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./contacts.page.html */ "vIa4");
/* harmony import */ var _contacts_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./contacts.page.scss */ "O6Z6");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/fire/firestore */ "I/3d");
/* harmony import */ var _angular_fire_auth__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/fire/auth */ "UbJi");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _services_app_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../services/app.service */ "OaWH");




// 1. Importa dependências





// 6. Não permite somente espaços nos campos
function removeSpaces(control) {
    if (control && control.value && !control.value.replace(/\s/g, '').length) {
        control.setValue('');
    }
    return null;
}
let ContactsPage = class ContactsPage {
    constructor(
    // 2. Injeta dependências
    form, afs, auth, app) {
        this.form = form;
        this.afs = afs;
        this.auth = auth;
        this.app = app;
        this.pipe = new _angular_common__WEBPACK_IMPORTED_MODULE_7__["DatePipe"]('en_US'); // Formatador de datas
    }
    ngOnInit() {
        // 4. Cria o formulário de contatos
        this.contactFormCreate();
        // 8.  Preenche os campos se usuário está logado
        if (this.contactForm) {
            this.auth.onAuthStateChanged((userData) => {
                if (userData) {
                    this.contactForm.controls.name.setValue(userData.displayName.trim());
                    this.contactForm.controls.email.setValue(userData.email.trim());
                }
            });
        }
    }
    // 5. Cria o formulário de contatos
    contactFormCreate() {
        this.contactForm = this.form.group({
            date: [''],
            name: [
                '',
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].compose([
                    _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required,
                    _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].minLength(3),
                    removeSpaces
                ])
            ],
            email: [
                '',
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].compose([
                    _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required,
                    _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].email,
                    removeSpaces
                ])
            ],
            subject: [
                '',
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].compose([
                    _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required,
                    _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].minLength(5),
                    removeSpaces
                ])
            ],
            message: [
                '',
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].compose([
                    _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required,
                    _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].minLength(5),
                    removeSpaces
                ])
            ]
        });
    }
    // 7. Envia o formulário
    contactSend() {
        // Formata data
        this.contactForm.controls.date.setValue(this.pipe.transform(Date.now(), 'yyyy-MM-dd HH:mm:ss').trim());
        // Salva documento no Firestore
        this.afs.collection('contacts').add(this.contactForm.value)
            .then(() => {
            // Exibe o feedback
            this.app.myAlert('Contato Enviado', 'Seu contato foi enviado com sucesso!<br><br>Obrigado...', () => {
                // Reiniciar o formulário
                this.contactForm.reset({
                    date: '',
                    name: this.contactForm.value.name.trim(),
                    email: this.contactForm.value.email.trim(),
                    subject: '',
                    message: ''
                });
            });
        })
            .catch((error) => { console.error(error); });
    }
};
ContactsPage.ctorParameters = () => [
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"] },
    { type: _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_5__["AngularFirestore"] },
    { type: _angular_fire_auth__WEBPACK_IMPORTED_MODULE_6__["AngularFireAuth"] },
    { type: _services_app_service__WEBPACK_IMPORTED_MODULE_8__["AppService"] }
];
ContactsPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-contacts',
        template: _raw_loader_contacts_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_contacts_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], ContactsPage);



/***/ }),

/***/ "rUYa":
/*!***********************************************************!*\
  !*** ./src/app/pages/contacts/contacts-routing.module.ts ***!
  \***********************************************************/
/*! exports provided: ContactsPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactsPageRoutingModule", function() { return ContactsPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _contacts_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./contacts.page */ "Tett");




const routes = [
    {
        path: '',
        component: _contacts_page__WEBPACK_IMPORTED_MODULE_3__["ContactsPage"]
    }
];
let ContactsPageRoutingModule = class ContactsPageRoutingModule {
};
ContactsPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], ContactsPageRoutingModule);



/***/ }),

/***/ "vIa4":
/*!*****************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/contacts/contacts.page.html ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\r\n  <ion-toolbar>\r\n    <ion-buttons slot=\"start\">\r\n      <ion-menu-button></ion-menu-button>\r\n    </ion-buttons>\r\n    <ion-title>Faça Contato</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content class=\"ion-padding\">\r\n\r\n  <p class=\"ion-no-margin\">Preencha o formulário abaixo para entrar em contato com a equipe do\r\n    <strong>Marfagafos</strong>.\r\n  </p>\r\n  <p class=\"ion-text-center\"><small>\r\n      <ion-text color=\"danger\">Preencha todos os campos.</ion-text>\r\n    </small></p>\r\n\r\n  <form [formGroup]=\"contactForm\" (ngSubmit)=\"contactSend()\">\r\n\r\n    <ion-list lines=\"full\" class=\"ion-no-padding\">\r\n\r\n      <ion-item>\r\n        <ion-label for=\"name\" position=\"floating\" color=\"primary\">\r\n          Nome:\r\n          <ion-text color=\"danger\" *ngIf=\"contactForm.controls.name.errors\">\r\n\r\n            <small *ngIf=\"contactForm.controls.name.errors.required\">\r\n              * Obrigatório\r\n            </small>\r\n\r\n            <small *ngIf=\"contactForm.controls.name.errors.minlength\">\r\n              * Inválido\r\n            </small>\r\n\r\n          </ion-text>\r\n        </ion-label>\r\n        <ion-input type=\"text\" id=\"name\" name=\"name\" formControlName=\"name\"></ion-input>\r\n      </ion-item>\r\n\r\n      <ion-item>\r\n        <ion-label for=\"email\" position=\"floating\" color=\"primary\">\r\n          E-mail:\r\n          <ion-text color=\"danger\" *ngIf=\"contactForm.controls.email.errors\">\r\n\r\n            <small *ngIf=\"contactForm.controls.email.errors.required\">\r\n              * Obrigatório\r\n            </small>\r\n\r\n            <small *ngIf=\"contactForm.controls.email.errors.email\">\r\n              * Inválido\r\n            </small>\r\n\r\n          </ion-text>\r\n        </ion-label>\r\n        <ion-input type=\"text\" id=\"email\" name=\"email\" formControlName=\"email\"></ion-input>\r\n      </ion-item>\r\n\r\n      <ion-item>\r\n        <ion-label for=\"subject\" position=\"floating\" color=\"primary\">\r\n          Assunto:\r\n          <ion-text color=\"danger\" *ngIf=\"contactForm.controls.subject.errors\">\r\n\r\n            <small *ngIf=\"contactForm.controls.subject.errors.required\">\r\n              * Obrigatório\r\n            </small>\r\n\r\n            <small *ngIf=\"contactForm.controls.subject.errors.minlength\">\r\n              * Inválido\r\n            </small>\r\n\r\n          </ion-text>\r\n        </ion-label>\r\n        <ion-input type=\"text\" id=\"subject\" name=\"subject\" formControlName=\"subject\"></ion-input>\r\n      </ion-item>\r\n\r\n      <ion-item>\r\n        <ion-label for=\"message\" position=\"floating\" color=\"primary\">\r\n          Mensagem:\r\n          <ion-text color=\"danger\" *ngIf=\"contactForm.controls.message.errors\">\r\n\r\n            <small *ngIf=\"contactForm.controls.message.errors.required\">\r\n              * Obrigatório\r\n            </small>\r\n\r\n            <small *ngIf=\"contactForm.controls.message.errors.minlength\">\r\n              * Inválido\r\n            </small>\r\n\r\n          </ion-text>\r\n        </ion-label>\r\n        <ion-textarea type=\"text\" id=\"message\" name=\"message\" formControlName=\"message\" autoGrow=\"true\"></ion-textarea>\r\n      </ion-item>\r\n\r\n    </ion-list>\r\n\r\n    <ion-button type=\"submit\" expand=\"block\" class=\"ion-margin-vertical\" [disabled]=\"contactForm.invalid\">Enviar\r\n    </ion-button>\r\n\r\n  </form>\r\n\r\n</ion-content>");

/***/ })

}]);
//# sourceMappingURL=pages-contacts-contacts-module.js.map