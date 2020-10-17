class StatScreen {
  constructor() {
    //Load Assets
    this.defaultButtonImg = loadImage('assets/buttonImg.png');    
    this.statTextFont = loadFont('assets/textFont.ttf');
    this.buttonFont = loadFont('assets/buttonFont.ttf');
    this.skyImg = loadImage('assets/ombresunrise.jpg');
    this.skytwoImg = loadImage('assets/ombredaytime.jpg');
    this.skythreeImg = loadImage('assets/ombredusk.jpg');
    this.skyfourImg = loadImage('assets/ombresunset.jpg');

    //Create Buttons
    this.backButton = new Button(width/2 - 100, 485, 200, 50, this.defaultButtonImg, 1000);

    //Array of all buttons
    this.buttons = [this.backButton];

    //Other
    this.background = this.skyImg;
  }

  drawScreen() {
    this.drawBackground();
    this.drawButtons();
    this.drawText();
    this.drawStatPage();
    this.drawTitle();
  }
  drawBackground() {
    background (this.background);
    fill('#C1107C');
  }
  drawButtons() {
    for (let i = 0; i < this.buttons.length; i++) {
      let button = this.buttons[i];
      button.drawButton();
    }
  }
  drawText() {
    fill('#F9BF05');
    this.drawTitle();
    this.drawStatPage();
    this.drawButtonText();
  }
  drawTitle() {
    //fill('#C1107C');
    textFont(this.statTextFont);
    textAlign(CENTER, CENTER);
    textSize(50);
    text('STATS', width/2, 50);
  }
  drawStatPage() {
    //fill('#C1107C');
    textFont(this.statTextFont);
    textSize(32);
    textAlign(LEFT);
    this.drawStatOutline();
  }
  drawStatOutline() {
    textAlign(LEFT);
    text("Money Earned Per Second: ", 20, 150);
    text("Total Money Earned: ", 20, 200);
    text("Total Money Spent: ", 20, 250);
    text("Total Problems Solved: ", 20, 300);
    text("Highest Reputation: ", 20, 350);
    text("Total # of Employees: ", 20, 400);
    textAlign(RIGHT);
    text("$" + player.getMoneyPerSec(), 700, 150);
    text("$" + player.getTotalMoneyEarned(), 700, 200);
    text("$" + player.getTotalMoneySpent(), 700, 250);
    text(player.getTotalProblemsSolved(), 700, 300);
    text(player.getHighestReputation(), 700, 350);
    text(player.getTotalEmployees(), 700, 400);
  }

  drawButtonText() {
    textSize(40);
    textAlign(CENTER);
    text("Back", width/2, 503);
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
