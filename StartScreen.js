class StartScreen {
  constructor() {
    //Load Assets
    this.buildingImg = loadImage('assets/buildingImg.png');
    this.buttonImg = loadImage('assets/buttonImg.png');
    this.textFont = loadFont('assets/textFont.ttf');
    this.titleFont = loadFont('assets/titleFont.ttf');
    this.buttonFont = loadFont('assets/buttonFont.ttf');
    this.skyImg = loadImage('assets/ombresunrise.jpg');
    this.skytwoImg = loadImage('assets/ombredaytime.jpg');
    this.skythreeImg = loadImage('assets/ombredusk.jpg');
    this.skyfourImg = loadImage('assets/ombresunset.jpg');
    this.underlineImg = loadImage('assets/line.gif');

    //Create Buttons
    this.startButton = new Button(width/2 - 100, 300 - 25, 200, 50, this.buttonImg, 1); //old 7
    this.helpButton = new Button(width/2 - 100, 375 - 25, 200, 50, this.buttonImg, 2);
    this.statsButton = new Button(width/2 - 100, 450 - 25, 200, 50, this.buttonImg, 3);
    this.buttons = [this.startButton, this.helpButton, this.statsButton];

    //Other
    this.background = this.skyImg;
  }

  // Audio Button Features


  drawScreen() {
    this.drawBackground();
    this.drawForeground();
    this.drawButtons();
    this.drawText();
  }
  drawBackground() {
    background(this.background);
    imageMode(LEFT);
    image(this.buildingImg, width/2, 130);
  }
  drawForeground() {
  }
  drawButtons() {
    for (let i = 0; i < this.buttons.length; i++) {
      let button = this.buttons[i];
      button.drawButton();
    }
    //So Hover Text will display over other buttons
    for (let i = 0; i < this.buttons.length; i++) {
      let button = this.buttons[i];
      button.drawHoverText();
    }
  }
  drawText() {
    stroke('#000000');
    fill('#F9BF05');
    this.drawTitle();
    this.drawButtonText();
  }
  drawButtonText() {
    textFont(this.buttonFont);
    textSize(42);
    text("Play", width/2, 294);
    text("Help", width/2, 368);
    text("Stats", width/2, 444);
  }
  drawTitle() {
    textFont(this.titleFont);
    textAlign(CENTER, CENTER);
    textSize(60);
    text("CEO Simulator", width/2, height/4);
  }

  update() {
    for (var i = 0; i < this.buttons.length; i++) {
      var button = this.buttons[i];
      if (button.isPressed() == true) {
        if (button.getEventCode() < 1000) {
          updateScreenNumber(button.getEventCode());
          return;
        } else {
          switch(button.getEventCode()) {
          case 1000: //Back Button
            updateScreenNumber(lastScreenNumber);
            return;
          }
        }
      }
    }
  }
  keyEvent(keypressed) {
    switch (key) {
      //changing background color and type of font (case one)
    case 'a':
    case 'A':
      this.background = this.skytwoImg;
      break;

      //changing background color and type of font (case two)
    case 'b':
    case 'B':
      this.background = this.skythreeImg; 
      break;

      //changing background color and type of font (case three)
    case 'c':
    case 'C':
      this.background = this.skyfourImg;
      break;
    }
  }
}
