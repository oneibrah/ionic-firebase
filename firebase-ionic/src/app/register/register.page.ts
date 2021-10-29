import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class SignupPage implements OnInit {

  email: string;
  password: string;
  nom: string;
  prenom: string;
  profile: any;

  constructor(
    private angularfireauth: AngularFireAuth,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private firestore: AngularFirestore
  ) { }

  ngOnInit() {
  }

  async signup(){
    const loading = await this.loadingCtrl.create({
      message: 'loading ...',
      duration:5000,
      showBackdrop:false,
      spinner: 'bubbles'
    });

    loading.present();

      setTimeout(() => {
        loading.dismiss();
      },1000);

    this.angularfireauth.createUserWithEmailAndPassword(this.email,this.password)
    .then((userData) => {
      this.profile = this.firestore.collection('profile').doc(userData.user.uid).set({
        name: this.nom,
        prenom: this.prenom
      });
      //console.log(userData);
      this.navCtrl.navigateForward(['/login']);
    }).catch((err) => {
      this.toastCtrl.create({
        message: err.message,
        duration: 3000
      }).then((toast) => {
        toast.present();
      });
    });
  }

  goToLogin(){
    this.navCtrl.navigateForward(['/login']);
  }

}