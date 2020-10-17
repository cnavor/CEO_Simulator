class MusicManager {
  constructor() {
    this.loadAudio();
    this.setAudioVolume();
  }

  loadAudio() {
    this.audi = loadSound('assets/lofi.mp3');
    this.audione = loadSound('assets/lofa.mp3');
    this.auditwo = loadSound('assets/lofe.mp3');
    this.audithree  = loadSound('assets/lofo.mp3');

    this.clickaudi = loadSound('assets/click.mp3');

    this.oaudi = loadSound("assets/officeaudio/cafe.mp3"); 
    this.oaudione = loadSound("assets/officeaudio/coffee.mp3");
    this.oauditwo = loadSound("assets/officeaudio/hardshoes.mp3");
    this.oaudithree = loadSound("assets/officeaudio/keyboard.mp3");
    this.oaudifour = loadSound("assets/officeaudio/laserjet.mp3");
    this.oaudifive = loadSound("assets/officeaudio/photocopy.mp3");
    this.oaudisix = loadSound("assets/officeaudio/stapler.mp3");
    this.oaudiseven = loadSound("assets/officeaudio/typerwriter.mp3");
  }

  setAudioVolume() {
    this.audi.setVolume(0.3);
    this.audione.setVolume(0.3);
    this.auditwo.setVolume(0.3);
    this.audithree.setVolume(0.3);

    this.oaudi.setVolume(0.3);
    this.oaudione.setVolume(0.3);
    this.oauditwo.setVolume(0.3);
    this.oaudithree.setVolume(0.3);
    this.oaudifour.setVolume(0.3);
    this.oaudifive.setVolume(0.3);
    this.oaudisix.setVolume(0.3);
    this.oaudiseven.setVolume(0.3);
  }

  keyEvent(keypressed) {
    console.log("juke");
    switch(keypressed) {
    case 'm':
    case 'M':
      if (!this.audi.isPlaying()) {
        this.audi.play();
        //audi.loop();
      } else {
        this.audi.pause();
      }
      break;
    case 'u':
    case 'U':
      if (!this.audione.isPlaying()) {
        this.audione.play();
        //audione.loop();
      } else {
        this.audione.pause();
      }
      break;
    case 's':
    case 'S':
      if (!this.auditwo.isPlaying()) {
        this.auditwo.play();
        //auditwo.loop();
      } else {
        this.auditwo.pause();
      }
      break;
    case 'e':
    case 'E':
      if (!this.audithree.isPlaying()) {
        this.audithree.play();
        //audithree.loop();
      } else {
        this.audithree.pause();
      }
      break;
    case 'o':
    case 'O':
      if (!this.oaudi.isPlaying() && !this.oaudione.isPlaying()) {
        this.oaudi.play();
        this.oaudione.play();
      } else {
        this.oaudi.pause();
        this.oaudione.pause();
      }
      break;
    case 'n':
    case 'N':
      if (!this.oauditwo.isPlaying() && !this.oaudithree.isPlaying() && !this.oaudifour.isPlaying()) {
        this.oauditwo.play();
        this.oaudithree.play();
        this.oaudifour.play();
      } else {
        this.oauditwo.pause();
        this.oaudithree.pause();
        this.oaudifour.pause();
      }
      break;
    case 'p':
    case 'P':
      if (!this.oaudifive.isPlaying() && !this.oaudisix.isPlaying() && !this.oaudiseven.isPlaying()) {
        this.oaudifive.play();
        this.oaudisix.play();
        this.oaudiseven.play();
      } else {
        this.oaudifive.pause();
        this.oaudisix.pause();
        this.oaudiseven.pause();
      }
      break;
    }
  }
}
