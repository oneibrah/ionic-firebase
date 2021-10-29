import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { IonicAuthService } from '../ionic-auth.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dash.page.html',
  styleUrls: ['./dash.page.scss'],
})

export class DashboardPage implements OnInit {
  itemsCollect: AngularFirestoreCollection;
  items: Observable<any[]>;
  userDetail: string;

  constructor(
    private router: Router,
    private ionicAuthService: IonicAuthService,
    public fire: AngularFirestore
  ) { }

  ngOnInit() {
    this.getData();
    this.ionicAuthService.userDetails().subscribe(response => {
      if (response !== null) {
        this.userDetail = response.email;
      } else {
        this.router.navigateByUrl('');
      }
    }, error => {
      console.log(error);
    })
  }
     async getData(){
         this.itemsCollect = this.fire.collection('profile');
         this.items = this.itemsCollect.valueChanges();
         
        }

  signOut() {
    this.ionicAuthService.signoutUser()
      .then(res => {
        this.router.navigateByUrl('login');
      })
      .catch(error => {
        console.log(error);
      })
  }
}