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

  doRegister(email: string, password: string){
    return new Promise<firebase.auth.UserCredential>((resolve, reject) => {
      this.fbAuth.auth.createUserWithEmailAndPassword(email, password).then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

  doLogin(email: string, password: string){
    return new Promise<firebase.auth.UserCredential>((resolve, reject) => {
      this.fbAuth.auth.signInWithEmailAndPassword(email, password).then(res => {
        resolve(res);
      }, err => reject(err));
    })
  }
}
