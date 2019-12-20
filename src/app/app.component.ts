import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthentificationService } from 'src/services/authentification.service';
import { NgbModalConfig, NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Tour of Heroes';

  registerForm: FormGroup;
  loginForm: FormGroup;
  errorMessage = "";
  successMessage = "";
  userMessage = "";

  loggedIn = false;
  doneLoading = false;

  @ViewChild('loginModal', { static: true }) loginModal: ElementRef;
  @ViewChild('signUpModal', { static: true }) signUpModal: ElementRef;
  @ViewChild('logoutModal', { static: true }) logoutModal: ElementRef;

  modalConfig: NgbModalOptions = {
    size: 'sm',
    backdrop: 'static',
    keyboard: false,
    centered: true,
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthentificationService,
    private modalService: NgbModal) {

    this.registerForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(75)]),
      password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(32)])
    })

    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(75)]),
      password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(32)])
    })
  }

  ngOnInit() {
    this.doneLoading = true;
  }

  openLogin() {
    this.loginForm.reset();
    this.modalService.open(this.loginModal, this.modalConfig);
  }

  openSignUp() {
    this.registerForm.reset();
    this.modalService.open(this.signUpModal, this.modalConfig);
  }

  openLogout() {
    this.modalService.open(this.logoutModal, this.modalConfig);
  }

  closeModals() {
    this.modalService.dismissAll();
  }

  tryRegister(form: FormGroup) {
    this.authService.doRegister(form)
      .then(res => {
        console.log(res);
        this.errorMessage = "";
        this.successMessage = "Your account has been created";
        this.closeModals();

      }, err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = "";
      })
  }

  tryLogin(form: FormGroup) {
    this.authService.doLogin(form).then(res => {
      console.log(res);
      this.errorMessage = "";
      this.successMessage = "Login Successfull";
      this.userMessage = `Welcome, ${res.user.email}, to the `
      this.closeModals();

    }, err => {
      this.errorMessage = err.message;
      this.successMessage = "";
    })
  }

  signOut() {
    this.authService.fbAuth.auth.signOut().then(() => {
      this.errorMessage = "";
      this.successMessage = "";
      this.userMessage = "";
      this.loggedIn = false;
      this.closeModals();

    });
  }
}
