import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
import { AngularFirestore } from '@angular/fire/firestore';
import { MessageService } from 'src/services/message.service';
import { AuthentificationService } from 'src/services/authentification.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  currentHero: Hero;
  selected = false;
  heroToSave = '';
  heroes: Hero[] = [];
  loading = false;

  constructor(
    private db: AngularFirestore,
    private messageService: MessageService,
    private authService: AuthentificationService) {

  }

  ngOnInit() {
    this.db.firestore.collection("heroes").onSnapshot(() => {
      this.getHeroes();
    });
  }

  getHeroes(): void {
    if (this.authService.fbAuth.auth.currentUser) {
      this.db.firestore.collection('heroes').where("userId", "==", this.authService.fbAuth.auth.currentUser.uid).get().then((querry) => {
        this.heroes.length = 0;
        querry.forEach((doc) => {
          let current = doc.data();
          this.heroes.push({ id: current.id, name: current.name });
        })
      })
    }
  }

  saveHero(): void {
    this.loading = true;
    this.db.firestore.collection('heroes').doc(this.db.createId()).set({
      id: this.heroes.length + 1,
      name: this.heroToSave.trim(),
      userId: this.authService.fbAuth.auth.currentUser.uid,
    })
    this.getHeroes();
    this.loading = false;
  }

  deleteHero(hero: Hero, event: MouseEvent): void {
    this.loading = true;
    event.preventDefault();
    this.db.firestore.collection("heroes").where("id", "==", hero.id).get().then((doc) => {
      this.db.firestore.collection('heroes').doc(doc.docs[0].id).delete().then(() => {
        this.messageService.add(`deleted hero with id=${hero.id}`);
        this.getHeroes();
        this.loading = false;
      });
    });
  }
}
