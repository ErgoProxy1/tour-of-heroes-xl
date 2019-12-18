import { Component, OnInit } from '@angular/core';
import { Hero } from '../heroes/hero';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    this.db.firestore.collection('heroes').limit(4).get().then((querry)=>{
      querry.forEach((doc) => {
        let current = doc.data();
        this.heroes.push({id: current.id, name: current.name});
      })
    })
  }
}