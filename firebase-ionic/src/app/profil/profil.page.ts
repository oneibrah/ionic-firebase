import { Component, OnInit } from '@angular/core';
import { IonicAuthService } from '../ionic-auth.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {

  profile: any;

  constructor(
    public authservice: IonicAuthService
  ) { }

  ngOnInit() {
    this.authservice.profil.subscribe(profile =>
      {
        this.profile = profile;
        console.log(this.profile);
      })
  }

}
