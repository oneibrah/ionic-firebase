import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { IonicAuthService } from '../ionic-auth.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
profile: any;
itemsCollect: AngularFirestoreCollection;
items: Observable<any[]>;

userList: any[];
userSave: any[];

  constructor(
    private authservice: IonicAuthService,
    private fire: AngularFirestore,
  ) { }

  ngOnInit() {
    this.fire.collection('profile').valueChanges().subscribe(getList =>{
      this.userList = getList;
      this.userSave = getList;
    })
    
  }


  async getData(){
    this.itemsCollect = this.fire.collection('profile');
    this.items = this.itemsCollect.valueChanges();
    
   }


   async initUser(): Promise<any> {
    this.userList= this.userSave;
  }

  async filterList(evt) {
    this.initUser();
    const searchTerm = evt.srcElement.value;

    if (!searchTerm) {
      return;
    }

    this.userList = this.userList.filter(search => {
      if (search.name && searchTerm) {
        if(search.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1){
          return true;
        }
        return false;
      }
    });
  }


}
