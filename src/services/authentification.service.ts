import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(public fbAuth: AngularFireAuth) { 
    
  }

  doRegister(form: FormGroup){
    return new Promise<firebase.auth.UserCredential>((resolve, reject) => {
      this.fbAuth.auth.createUserWithEmailAndPassword(form.value.email, form.value.password).then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

  doLogin(form: FormGroup){
    return new Promise<firebase.auth.UserCredential>((resolve, reject) => {
      this.fbAuth.auth.signInWithEmailAndPassword(form.value.email, form.value.password).then(res => {
        resolve(res);
      }, err => reject(err));
    })
  }
}
