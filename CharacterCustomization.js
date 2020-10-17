class CharacterCustomization{
  constructor(){
    
    //Load Assets
    this.defaultButtonImg = loadImage('assets/buttonImg.png');  
    this.buttonFont = loadFont('assets/buttonFont.ttf');
    this.textFont = loadFont('assets/textFont.ttf');
    this.avatars = [loadImage('assets/avatars/abed_base.png'), loadImage('assets/avatars/aniya.png'),loadImage('assets/avatars/duncan.png'),
                    loadImage('assets/avatars/geneva.png'), loadImage('assets/avatars/daniel.png'), loadImage('assets/avatars/britta.png')];
    this.transparentIMG = loadImage('assets/transparent.png');
    this.selectSqaure = loadImage('assets/selectIMG.png');
    this.selectSq = loadImage('assets/selectIMG2.png');
    
    this.playerAvatar = "";
    this.playerInput = "";
    this.playerName = "";
    this.inputEnabled = true;
    
    
    //Create Buttons
    this.nextButton = new Button(width/2 + 150, 500, 200, 50, this.defaultButtonImg, 1000);
    this.nextButton.setTextSize(42);
    
    this.nextButton.setText("Next");
     this.backButton = new Button(50, 500, 200, 50, this.defaultButtonImg, 1001);
    this.backButton.setTextSize(42);
    this.backButton.setText("Back");
    this.selectButton1 = new Button((126 * 1/2), 255, 90, 90, this.transparentIMG, 1002);
    this.selectButton2 = new Button((174 * 2/2), 255, 90, 90, this.transparentIMG, 1002);
    this.selectButton3 = new Button((192 * 3/2), 255, 90, 90, this.transparentIMG, 1002);
    this.selectButton4 = new Button((202 * 4/2), 255, 90, 90, this.transparentIMG, 1002);
    this.selectButton5 = new Button((208 * 5/2), 255, 90, 90, this.transparentIMG, 1002);
    this.selectButton6 = new Button((211 * 6/2), 255, 90, 90, this.transparentIMG, 1002);
    
     //Array of all buttons
    this.buttons = [this.backButton, this.nextButton];
    this.secretButtons = [this.selectButton1, this.selectButton2, this.selectButton3, this.selectButton4, this.selectButton5, this.selectButton6];
    this.completeSecretButtons();
  }
  
  drawScreen(){
    this.drawBackground();
    this.drawButtons();
    this.drawText();
  }
  
  drawBackground(){
    background('#09707C');
    fill('#C1107C');
    if(this.playerName == ""){
      this.drawTextBox();
      this.enableInput();
    } else if(this.playerName != ""){
      this.disableInput();
      this.displayAvatars();
      this.drawSecretButtons();
    }

  }
  enableInput(){
    this.inputEnabled = true;
  }
  disableInput(){
    this.inputEnabled = false;
  }
  drawForeground(){}
  
  drawButtons(){
    for(let i = 0; i < this.buttons.length; i++){
      let button = this.buttons[i];
      button.drawButton();
    }
  }
  
  drawSecretButtons(){
    for(let i = 0; i < this.secretButtons.length; i++){
      let button = this.secretButtons[i];
      button.drawButton();
    }
  }
  
  completeSecretButtons(){
   for(let i = 0; i < this.secretButtons.length; i++){
      let button = this.secretButtons[i];
      button.setHoverImg(this.selectSqaure);
      button.setClickedButtonImg(this.selectSq);
    }
   }
  
  
  turnOffOtherButtons(num){
    for(let i = 0; i < this.secretButtons.length; i++){
      let buttonn = this.secretButtons[i];
      if(buttonn.wasClicked == true && i != num){
        buttonn.turnOffClickedImg();
      } 
    }
  }
  
  
  drawButtonText(){
    for(let i = 0; i < this.buttons.length; i++){
      let button = this.buttons[i];
      button.setTextFill('#C1107C');
    }
  }
  
  changeButtonCode(){
    if(this.nextButton.getEventCode() == 1000){
      this.nextButton.changeEventCode(8);
      this.backButton.changeEventCode(1003);
    }
      else if(this.nextButton.getEventCode() == 8){
            this.nextButton.changeEventCode(1000);
            this.backButton.changeEventCode(1001);
      }
    
  }
  
  drawText(){
    fill('#C1107C');
    this.drawPlayerInput();
    this.drawQuestion();
    this.drawButtonText();
  
  }
  
  drawTitle(){}
  
  drawQuestion(){
   if(this.playerName == ""){
    textSize(42);
    text("What's your name?", 400, 150);
   } else if (this.playerName != "") {
     textSize(42);
     text("Please select a player avatar", 400, 150);
   }
  }
  
  drawTextBox(){
    fill('#FFFFFF');
    rect(150, 250, 500, 50, 7);
  }
  
  drawPlayerInput(){
    textFont(this.textFont);
    fill('#000000');
    textSize(42);
    text(this.playerInput, 400, 268);
  }
  
  setAName(){
    if(this.playerName == ""){
     this.playerName = this.playerInput;
     this.playerInput = "";
     player.setPlayerName(this.playerName);
    }
  }
  
  getPlayerName(){
    return this.playerName;
  }
  
  drawMessage(){
      //frameRate(1);
      textSize(22);
      text("Please type a name.", 300, 50);
  }
  
  setPlayerAvatar(avatar){
    this.playerAvatar = avatar;
    player.setPlayerAvatar(avatar);
  }
  
  getPlayerAvatar(){
    return this.playerAvatar;
  }
  
  displayAvatars(){
    if(this.playerName != ""){
    for(let i = 0; i < this.avatars.length; i++){
      let avatar = this.avatars[i]; 
      imageMode(CENTER);
      image(avatar, 105 + (230 * i/2), 300, 70, 70);
    }
   }
  }
  
  keyEvent(keypressed){
    let keyz = ['Shift', 'CapsLock', 'Tab', 'Meta', 'Control', 'Alt', 'Backspace', 'Enter'];
    if(keyz.indexOf(keypressed) == -1 && this.inputEnabled){
     this.playerInput = this.playerInput + str(keypressed);
    } else if(keypressed == 'Enter'){
      this.setAName();
      console.log(this.getPlayerName());
        if(this.playerName != ""){
        this.changeButtonCode();
         console.log(this.backButton.eventCode);
         console.log(this.nextButton.eventCode);
        }
    } else if(keypressed == 'Backspace'){
      this.playerInput = this.playerInput.substring(0, this.playerInput.length - 1);
    } else if(this.playerInput =='-' && this.playerInput == ""){
      this.playerInput = "-";
    } 
  }
  
  
  
  update(){
    //this.drawSelectionCircle();
    for(var i = 0; i < this.buttons.length; i++){
      var button = this.buttons[i];
      if(button.isPressed() == true){
        if(button.eventCode < 1000){
          updateScreenNumber(button.eventCode);
          return;
        } else{
          switch(button.eventCode){
            case 1000: //next button
              this.setAName();
              console.log(this.playerName);
              if(this.playerName != ""){
                this.changeButtonCode();
              console.log(this.backButton.eventCode);
              console.log(this.nextButton.eventCode);
              }
              return;  
            case 1001: //Back Button
              updateScreenNumber(lastScreenNumber);
              return;
            case 1003:
              this.playerName = "";
              this.changeButtonCode();
               console.log(this.backButton.eventCode);
              console.log(this.nextButton.eventCode);
              return;
          }
        }
      }
    }
      for(var j = 0; j < this.secretButtons.length; j++){
        var buttonn = this.secretButtons[j];
        if(buttonn.isPressed() == true){
           if(buttonn.eventCode == 1002 && buttonn.wasClicked == true){
             this.turnOffOtherButtons(j);
             this.setPlayerAvatar(buttonn);
             return;
           }
           }
          }
        }
}
