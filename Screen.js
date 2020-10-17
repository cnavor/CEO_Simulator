class Screen {
  constructor() {
    //Load Assets
    this.defaultImg = loadImage('assets/defaultPage.png'); 
    this.defaultButtonImg = loadImage('assets/buttonImg.png');

    //Create Buttons
    this.backButton = new Button(width/2 - 100, 485, 200, 50, this.defaultButtonImg, 1000);

    //Array of all buttons
    this.buttons = [this.backButton];
  }

  drawScreen() {
    this.drawBackground();
    this.drawForeground();
    this.drawButtons();
    this.drawText();
  }
  drawBackground() {
    imageMode(CORNER);
    image(this.defaultImg, 0, 0, width, height);
  }
  drawForeground() {
  }
  drawButtons() {
    this.backButton.drawButton();
  }
  drawText() {
    fill('#C1107C');
    this.drawButtonText();
  }
  drawTitle() {
  }
  drawButtonText() {
    textSize(60);
    text("Back", width/2, 500);
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
  }
}
