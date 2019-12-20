import { Component, OnInit } from '@angular/core';
import { Hero } from '../heroes/hero';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthentificationService } from 'src/services/authentification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private db: AngularFirestore, private authService: AuthentificationService) { }

  ngOnInit() {
    this.getHeroesLimited();
  }

  getHeroesLimited(): void {
    if (this.authService.fbAuth.auth.currentUser) {
      this.db.firestore.collection('heroes').limit(4).where("userId", "==", this.authService.fbAuth.auth.currentUser.uid)
        .get().then((querry) => {
          querry.forEach((doc) => {
            let current = doc.data();
            this.heroes.push({ id: current.id, name: current.name });
          })
        })
    }
  }
}