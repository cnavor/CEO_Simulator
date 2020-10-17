class CompanyCustomization {
  constructor() {

    //Load Assets
    this.defaultButtonImg = loadImage('assets/buttonImg.png');  
    this.buttonFont = loadFont('assets/buttonFont.ttf');
    this.textFont = loadFont('assets/textFont.ttf');


    this.playerInp = "";
    this.companyName = "";
    this.typeOfBuisiness = "";

    //create buttons
    this.nextButton = new Button(width/2 + 150, 500, 200, 50, this.defaultButtonImg, 1000);    
    this.nextButton.setTextSize(42);
    this.nextButton.setText("Next");
    this.backButton = new Button(50, 500, 200, 50, this.defaultButtonImg, 1001);
    this.backButton.setTextSize(42);
    this.backButton.setText("Back");

    //array of buttons
    this.buttons = [this.nextButton, this.backButton];
  }

  drawScreen() {
    this.drawBackground();
    this.drawButtons();
    this.drawText();
  }

  drawBackground() {
    background('#09707C');
    fill('#C1107C');
    this.drawTextBox();
  }

  drawForeground() {
  }

  drawButtons() {
    for (let i = 0; i < this.buttons.length; i++) {
      let button = this.buttons[i];
      button.drawButton();
    }
  }



  drawButtonText() {
    for (let i = 0; i < this.buttons.length; i++) {
      let button = this.buttons[i];
      button.setTextFill('#C1107C');
    }
  }

  changeButtonCode() {
    if (this.nextButton.getEventCode() == 1000) {
      this.nextButton.changeEventCode(7);
      this.backButton.changeEventCode(1003);
      screens[0].buttons[0].changeEventCode(7);
    } else if (this.nextButton.getEventCode() == 7) {
      this.nextButton.changeEventCode(1000);
      this.backButton.changeEventCode(1001);
    }
  }

  drawText() {
    fill('#C1107C');
    this.drawPlayerInput();
    this.drawQuestion();
    this.drawButtonText();
  }

  drawTitle() {
  }

  drawQuestion() {
    if (this.companyName == "") {
      textSize(42);
      text("What's your company name?", 400, 150);
    } else if (this.companyName != "") {
      textSize(42);
      text("What type of business is it?", 400, 150);
    }
  }

  drawTextBox() {
    fill('#FFFFFF');
    rect(150, 250, 500, 50, 7);
  }

  drawPlayerInput() {
    textFont(this.textFont);
    fill('#000000');
    textSize(42);
    text(this.playerInp, 400, 268);
  }

  setCompanyName() {
    if (this.companyName == "") {
      this.companyName = this.playerInp;
      this.playerInp = "";
      player.setCompanyName(this.companyName);
    }
  }

  getCompanyName() {
    return this.companyName;
  }

  setTypeOfBuisiness() {
    this.typeOfBuisiness = this.playerInp;
    this.playerInp = "";
    player.setCompanyType(this.typeOfBuisiness);
  }

  getTypeOfBuis() {
    return this.typeOfBuisiness;
  }

  drawMessage() {
    //frameRate(1);
    textSize(22);
    text("Please type a name.", 300, 50);
  }


  keyEvent(keypressed) {
    let keyz = ['Shift', 'CapsLock', 'Tab', 'Meta', 'Control', 'Alt', 'Backspace', 'Enter'];
    if (keyz.indexOf(keypressed) == -1) {
      this.playerInp = this.playerInp + str(keypressed);
    } else if (keypressed == 'Enter') {
      if (this.companyName == "" && this.playerInp != "") {
        this.setCompanyName();
        this.changeButtonCode();
        //updateScreenNumber(this.nextButton.getEventCode());
        console.log(this.getCompanyName());
      } else if (this.typeOfBuisiness == "" && this.playerInp != "") {
        this.setTypeOfBuisiness();
        updateScreenNumber(this.nextButton.getEventCode());
        console.log(this.getTypeOfBuis());
      }
    } else if (keypressed == 'Backspace') {
      this.playerInp = this.playerInp.substring(0, this.playerInp.length - 1);
    } else if (this.playerInp =='-' && this.playerInp == "") {
      this.playerInp = "-";
    }
  }



  update() {
    for (var i = 0; i < this.buttons.length; i++) {
      var button = this.buttons[i];
      if (button.isPressed() == true) {
        if (button.eventCode < 1000) {
          updateScreenNumber(button.getEventCode());
          if (this.typeOfBuisiness == "" && this.playerInp != "") {
            this.setTypeOfBuisiness();
            console.log(this.getTypeOfBuis());
          }
          return;
        } else {
          switch(button.eventCode) {
          case 1000: //next button
            if (this.companyName == "" && this.playerInp != "") {
              this.setCompanyName();
              this.changeButtonCode();
              console.log(this.getCompanyName());
            }
            return;  
          case 1001: //Back Button
            updateScreenNumber(lastScreenNumber);
            return;
          case 1003:
            this.companyName = "";
            this.typeOfBuisiness  = "";
            this.changeButtonCode();
            //console.log(this.backButton.eventCode);
            //console.log(this.nextButton.eventCode);
            return;
          }
        }
      }
    }
  }
}
