class HelpScreen {
  constructor() {
    //Load Assets
    this.defaultImg = loadImage('assets/defaultPage.png'); 
    this.defaultButtonImg = loadImage('assets/buttonImg.png');

    //Create Buttons
    this.backButton = new Button(width/2, 500, 200, 50, this.defaultButtonImg, 0);

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
    text("Back", width/2, 500);
  }

  update() {
    for (var i = 0; i < this.buttons.length; i++) {
      var button = this.buttons[i];
      //button.update();
      if (button.isPressed() == true) {
        //console.log("button pressed");
        screenNumber = button.getEventCode();
        return;
      }
    }
  }
}
