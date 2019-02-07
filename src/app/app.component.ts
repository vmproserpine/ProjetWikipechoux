import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListeAnnexe } from '../pages/listeAnnexe/listeAnnexe';
import { ListeMadeleine } from '../pages/listeMadeleine/listeMadeleine';
import { ListeMot } from '../pages/listeMot/listeMot';
import { ListePhoto } from '../pages/listePhoto/listePhoto';
import { ListeThemes } from '../pages/listeThemes/listeThemes';
import { ListeVideo } from '../pages/listeVideo/listeVideo';
import { ListeUser } from '../pages/listeUser/listeUser';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Accueil', component: HomePage },
      { title: 'Annexes', component: ListeAnnexe },
      { title: 'Madeleines', component: ListeMadeleine },
      { title: 'Mots', component: ListeMot },
      { title: 'Photos', component: ListePhoto },
      { title: 'Themes', component: ListeThemes },
      { title: 'Utilisateurs', component: ListeUser },
      { title: 'Videos', component: ListeVideo }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
