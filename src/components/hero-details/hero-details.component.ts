import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../heroes/hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AngularFirestore } from '@angular/fire/firestore';
import { MessageService } from 'src/services/message.service';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.css']
})
export class HeroDetailsComponent implements OnInit {

  @Input() hero: Hero;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private db: AngularFirestore,
    private messageService: MessageService,
    ) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.db.firestore.collection("heroes").where("id", "==", id).get().then((doc) => {
      this.hero = ({id: doc.docs[0].data().id, name: doc.docs[0].data().name} as Hero);
    })
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.db.firestore.collection("heroes").where("id", "==", this.hero.id).get().then((res)=>{
      this.db.firestore.collection("heroes").doc(res.docs[0].id).update({
        id: this.hero.id,
        name: this.hero.name.trim(),
      });
      this.messageService.add(`updated hero id=${this.hero.id}`);
    })
    /*this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());*/
  }

}
