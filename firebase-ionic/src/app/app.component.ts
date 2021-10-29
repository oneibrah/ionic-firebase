import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { IonicAuthService } from './ionic-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  navigate: any
  constructor(
    public router: Router,
    private fireAuth: AngularFireAuth,
    private navCtrl: NavController,
    private service: IonicAuthService
  ) {
   
      this.sideMenu();
    
    
  }

  sideMenu(){
    if(this.service.profil){
    this.navigate = [
      {
        title : "dash",
        icon: "Home",
        url : "/dashboard"
      },
      {
        title : "profil",
        icon:  "people-circle-outline",
        url : "/profil"
      },

      {
        title : "search",
        icon:  "people-circle-outline",
        url : "/search"
      },
      {
        title : "Deconnexion",
        icon: "log-out-outline",
        url : "/login"
      },
    
    ]
  }
  }

  async deconnexion() {
   // console.log(this.username);
    if(this.fireAuth.currentUser){
      this.fireAuth.signOut().then(()=>{
        this.navCtrl.navigateForward(['login'])
      });
    }



  }

  async accueil() {
       this.router.navigate(['/dash']);
 
   }


}