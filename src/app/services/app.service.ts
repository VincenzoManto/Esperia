import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Store } from '../templates/course-rive/models/course';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private apiUrl = 'https://api.example.com'; // Replace with your API URL
  public stores: Store[] = [];
  public openStoreSubject = new BehaviorSubject<Store | null>(null);
  public onOpenStore = this.openStoreSubject.asObservable();
  public storesSubject = new BehaviorSubject<Store[]>([]);

  constructor() { }


}
