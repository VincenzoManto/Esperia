import { Component, OnInit } from '@angular/core';
import { SearchbarCustomEvent } from '@ionic/angular';
import { News, Store, typesIcons } from '../../models/course';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import Fuse from 'fuse.js';
import { AppService } from '../../../../services/app.service';
declare var L: any;

@Component({
  selector: 'cr-topics',
  templateUrl: './topics.page.html',
  styleUrls: ['./topics.page.scss'],
})
export class TopicsPage {

  news: News[] = [];
  icons = typesIcons as any;
  selectedTopic: string | undefined;

  topics = {
    food: 'Food is trendy and delicious: look how to cook and eat healthy',
    sport: 'Sport is life: keep your body in shape',
    travel: 'Travel around the world: discover new places and cultures',
    music: 'Music is the best way to relax: listen to the best songs',
    fashion: 'Fashion is a way of life: dress to impress',
    entertainment: 'Entertainment is fun: watch movies and TV shows',
    education: 'Education is the key to success: learn and grow',
    games: 'Games are fun: play and enjoy',
    tech: 'Tech is the future: learn how to code and create',
    love: 'Love is in the air: find your soulmate and be happy',
    job: 'Business is the key to success: learn how to make money',
    health: 'Health is wealth: take care of your body and mind',
    xmas: 'Christmas is the best time of the year: enjoy the holidays',

  }

  constructor(private db: AngularFireDatabase) {

  }

  clickForSearch(topic: string) {
    this.selectedTopic = topic;
    this.db
      .list('/news', (ref) => ref.orderByChild('topics').equalTo(topic))
      .valueChanges()
      .subscribe((data: any[]) => {
        this.news = data;
      });
  }
}
