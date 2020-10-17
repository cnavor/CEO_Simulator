class WorkScreen {
  constructor() {
    //Load Assets
    this.floorTileImg = loadImage('assets/floorTile.png'); 
    this.defaultButtonImg = loadImage('assets/buttonImg.png');
    this.workButtonImg = loadImage('assets/workButton.png');
    this.singleDeskImg = loadImage('assets/singleDesk.png');
    this.windowImg = loadImage('assets/window.png');
    this.difficulty = 0;

    //Create Buttons
    this.backButton = new Button(width/2 - 100, 275 + 64*4, 200, 50, this.defaultButtonImg, 0);
    this.workButton = new Button(64, 240 + 64*4, 96, 96, this.workButtonImg, 7);
    //this.manageButton = new Button(64 + 64*9, 240 + 64*4, 96, 96, this.workButtonImg, 1);
    this.difficultyButton = new Button(width/2 - 100, 130, 200, 50, this.defaultButtonImg, 1001);
    this.difficultyButton.setHoverText('Click to change the difficulty');

    //Array of all buttons
    this.buttons = [this.difficultyButton];

    //Create QuestionBank
    this.workPile = new QuestionBank();
    this.problem = this.workPile.chooseProblem(this.difficulty);
    this.myAnswer = "";

    //Time to live (TTL) for certain text. (ie. how long the text will be displayed for.)
    this.tryAgainTTL = 0;
    this.failedTTL = 0;
    this.passedTTL = 0;

    //other
    this.showProblem = false;
  }

  drawOverlay() {
    this.drawForeground();
    this.drawButtons();
    this.drawText();
  }
  drawBackground() {
    imageMode(CORNER);
    image(this.windowImg, 0, 0, width, 256);
    this.drawFloor();
    //image(this.defaultImg, 0, 0, width, height);
    this.drawDesks();
  }
  drawFloor() {
    let tileDimension = 32;
    for (let i = 0; i*tileDimension < width; i++) {
      for (let j = 8; j*tileDimension < height; j++) {
        image(this.floorTileImg, i*tileDimension, j*tileDimension, tileDimension, tileDimension);
      }
    }
  }
  drawDesks() {
    image(this.singleDeskImg, 64, 288, 96, 64);
    image(this.singleDeskImg, 64 + 64*3, 288, 96, 64);
    image(this.singleDeskImg, 64 + 64*6, 288, 96, 64);
    image(this.singleDeskImg, 64 + 64*9, 288, 96, 64);
    image(this.singleDeskImg, 64, 288 + 64*2, 96, 64);
    image(this.singleDeskImg, 64 + 64*3, 288 + 64*2, 96, 64);
    image(this.singleDeskImg, 64 + 64*6, 288 + 64*2, 96, 64);
    image(this.singleDeskImg, 64 + 64*9, 288 + 64*2, 96, 64);
  }
  drawForeground() {
    fill('#b6cbe0');
    strokeWeight(4);
    stroke('#81665f');
    rect(width/2 - 128, 34*3, 256, 400, 10, 10, 10, 10);
  }
  drawButtons() {
    for (let i = 0; i < this.buttons.length; i++) {
      let button = this.buttons[i];
      button.drawButton();
    }
  }
  drawText() {
    fill('#C1107C');
    this.drawProblem();
    this.drawMyAnswer();
    this.drawButtonText();
    this.drawMessage();
  }
  drawTitle() {
  }
  drawProblem() {
    textSize(42);
    strokeWeight(3);
    fill('#FFFFFF');
    stroke('#81665f');
    text(this.problem.getEquation(), width/2, 300);
    textSize(36);
    text("Worth: $" + str(this.problem.getWorth()), width/2, 225);
    textSize(30);
    text("Reputation: " + str(this.difficulty), width/2, 445);
  }
  drawMyAnswer() {
    textSize(42);
    text(this.myAnswer, width/2, 375);
  }
  drawButtonText() {
    textSize(42);
    strokeWeight(1);
    fill('#FFFFFF');
    stroke('#81665f');
    switch(this.difficulty) {
    case 0:
      text("Lazy", width/2, 150);
      break;
    case 1:
      text("Medium", width/2, 150);
      break;
    case 2:
      text("Hard", width/2, 150);
      break;
    case 3:
      text("Extreme", width/2, 150);
    }  
    fill('#C1107C');
    stroke('#000000');
    textSize(60);
    text("Menu", width/2, 549);
    textSize(24);
    strokeWeight(1);
    fill('#FFFFFF');
    stroke('#000000');
    text("Work", 64 + 48, 245 + 64*5);
    textSize(20);
    text("Manage", 640 + 48, 245 + 64*5);
  }
  drawMessage() {
    let message = "";
    if (this.failedTTL-- > 0) {
      message = "Problem Failed. Reputation damaged.";
    } else if (this.passedTTL-- > 0) {
      message = "Good Job!";
    } else if (this.tryAgainTTL-- > 0) {
      message = "Try Again, you have " + str(this.problem.attemptsRemaining + 1) + " attempts left.";
    }
    textSize(30);
    strokeWeight(3);
    fill('#FFFFFF');
    stroke('#81665f');
    text(message, width/2, 75);
  }
  updateMessagesTTL(ansCode) {
    switch(ansCode) {
    case -1:
      this.failedTTL = 100;
      this.passedTTL = 0;
      this.tryAgainTTL = 0;
      break;
    case 0:
      this.failedTTL = 0;
      this.passedTTL = 0;
      this.tryAgainTTL = 100;
      break;
    case 1:
      this.failedTTL = 0;
      this.passedTTL = 100;
      this.tryAgainTTL = 0;
      break;
    }
  }
  updateDifficulty() {
    this.problem = this.workPile.chooseProblem(this.difficulty);
  }
  update() {
    for (let i = 0; i < this.buttons.length; i++) {
      var button = this.buttons[i];
      if (this.showMenu && button.isPressed() == true) {
        switch(button.getEventCode()) {
        case 1001:
          this.difficulty = (++this.difficulty == 4) ? 0:this.difficulty;
          this.updateDifficulty(this.difficulty);
          return;
        }
      }
    }
    this.showMenu = mouseX >= width/2 - 128 && mouseX <= width/2 + 128 && mouseY >= 34*3 && mouseY <= 34*3 + 400;
  }


  getNewProblem() {
    this.problem = this.workPile.chooseProblem(this.difficulty);
  }
  checkAnswer() {
    let result = this.problem.checkAnswer(this.myAnswer);
    switch(result) {
    case -1:
      this.problemFailed();
      break;
    case 0:
      this.problemFailedAttempt();
      break;
    case 1:
      this.problemPassed();
      break;
    }
    this.updateMessagesTTL(result);
    this.myAnswer = "";
  }
  problemFailed() {
    this.getNewProblem();
    player.punishment();
  }
  problemPassed() {
    player.reward(this.problem.worth);
    player.increaseReputation(this.difficulty);
    this.getNewProblem();
  }
  problemFailedAttempt() {
  }

  keyEvent(keypressed) {
    let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    if (keypressed in numbers) {
      this.myAnswer = this.myAnswer + str(keypressed);
    } else if (keypressed == 'Enter') {
      this.checkAnswer();
    } else if (keypressed == 'Backspace') {
      this.myAnswer = this.myAnswer.substring(0, this.myAnswer.length - 1);
    } else if (keypressed =='-' && this.myAnswer == "") {
      this.myAnswer = "-";
    }
  }
}
