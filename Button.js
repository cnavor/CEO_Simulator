class Button {
  constructor(xpos, ypos, w, h, buttonImg, eventCode) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.buttonImg = buttonImg;
    this.hoverImg = null;
    this.w = w;
    this.h = h;
    //this.buttonImg.resize(this.w, this.h);
    this.eventCode = eventCode;
    this.pressed = false;
    this.clickedButtonImg = null;
    this.wasClicked = false;
    this.xCenter = this.xpos + (this.w/2);
    this.yCenter = this.ypos + (this.h/2);
    this.text = "";
    this.textSize = 50;
    this.fill = "";
    this.stroke = "";
    this.strokeWeight = null;
    this.textOffsetX = 0;
    this.textOffsetY = 0;

    this.timeTillHoverTextShown = 60;
    this.hoverText = "";
    this.hoverTextSize = 12;
    this.hoverFill = "";
    this.hoverStroke = "";
    this.hoverStrokeWeight = 1;
    this.hoverTextOffsetX = 10;
    this.hoverTextOffsetY = 10;
    this.hoverTextWidth = 0;
    this.hoverTextHeight = 0;
  }

  drawButton() {
    imageMode(CORNERS);
    let chosenButtonImg = (this.wasClicked == true && this.clickedButtonImg != null) ? this.clickedButtonImg: this.buttonImg;
    chosenButtonImg = (this.underMouse() && this.hoverImg != null) ? this.hoverImg: chosenButtonImg;
    image(chosenButtonImg, this.xpos, this.ypos, this.xpos + this.w, this.ypos + this.h);
    this.drawText();
  }
  underMouse() {
    return mouseX >= this.xpos && mouseX <= this.xpos + this.w && mouseY >= this.ypos && mouseY <= this.ypos + this.h;
  }
  isPressed() {
    this.update();
    if (this.pressed) {
      this.pressed = false;
      return true;
    } 
    return false;
  }
  setImg(img) {
    this.buttonImg = img;
  }
  setClickedButtonImg(img) {
    this.clickedButtonImg = img;
  }
  turnOffClickedImg() {
    this.wasClicked = false;
  }
  //Button Text Methods
  setText(text) {
    this.text = text;
    if (this.textSize != 50) {
      textSize(this.textSize);
      while (this.textSize >= 8 && (textAscent() > this.h + 20)) {
        this.textSize--;
      }
      this.textSize -= 4;
    }
  }
  setTextSize(textSize) {
    this.textSize = textSize;
  }
  setTextFill(fillColor) {
    this.fill = fillColor;
  }
  setStrokeFill(strokeColor) {
    this.stroke = strokeColor;
  }
  setStrokeWeight(strokeWeight) {
    this.strokeWeight = strokeWeight;
  }
  setTextOffsetX(offset) {
    this.textOffsetX = offset;
  }
  setTextOffsetY(offset) {
    this.textOffsetY = offset;
  }
  shrinkText(amount) {
    this.textSize = max(8, this.textSize - amount);
  }
  drawText() {
    if (this.fill != "") {
      fill(this.fill);
    }
    if (this.stroke != "") {
      stroke(this.stroke);
    }
    if (this.strokeWeight != null) {
      strokeWeight(this.strokeWeight);
    }
    if (this.text != "") {
      textSize(this.textSize);
      textAlign(CENTER, CENTER);
      text(this.text, this.xCenter + this.textOffsetX, this.yCenter - 5 + this.textOffsetY);
    }
  }
  //Hover Text Methods
  setHoverImg(img) {
    this.hoverImg = img;
  }
  setHoverText(text) {
    this.hoverText = text;
    this.setHoverTextBoxDimensions();
  }
  setHoverTextBoxDimensions() {
    textSize(this.hoverTextSize);
    let hoverTextWidth = min(175, textWidth(this.hoverText));
    let linesNeeded = ceil(textWidth(this.hoverText)/hoverTextWidth) + 1;
    let hoverTextHeight = linesNeeded * (textAscent(this.hoverText) + textDescent(this.hoverText));
    this.hoverTextWidth = hoverTextWidth;
    this.hoverTextHeight = hoverTextHeight;
  }
  setHoverTextSize(textSize) {
    this.hoverTextSize = textSize;
  }
  setHoverFillColor(fillColor) {
    this.hoverFill = fillColor;
  }
  setHoverStrokeColor(strokeColor) {
    this.hoverStroke = strokeColor;
  }
  setHoverStrokeWeight(strokeWeight) {
    this.hoverStrokeWeight = strokeWeight;
  }
  setHoverTextOffsetX(offset) {
    this.hoverTextOffsetX = offset;
  }
  setHoverTextOffsetY(offset) {
    this.hoverTextOffsetY = offset;
  }
  shrinkHoverText(amount) {
    this.hoverTextSize = max(8, this.hoverTextSize - amount);
  }
  drawHoverText() {
    if (this.shouldDisplayHoverText() && this.hoverText != "") {
      if (this.hoverFill != "") {
        fill(this.hoverFill);
      }
      if (this.hoverStroke != "") {
        stroke(this.hoverStroke);
      }
      if (this.hoverStrokeWeight != null) {
        strokeWeight(this.hoverStrokeWeight);
      }
      if (this.hoverText != "") {
        textSize(this.hoverTextSize);
        textAlign(LEFT, TOP);
        if (mouseY - this.hoverTextHeight - 5 > 0) {
          if (mouseX + this.hoverTextWidth + 20 < width) {
            rect(mouseX + 15, mouseY - 1, this.hoverTextWidth + 5, -(this.hoverTextHeight + 8), 8, 8, 8, 8);
            text(this.hoverText, mouseX + 25, mouseY - this.hoverTextHeight - 5, this.hoverTextWidth, this.hoverTextHeight);
          } else {
            rect(mouseX - 10, mouseY - 1, -(this.hoverTextWidth + 5), -(this.hoverTextHeight + 8), 8, 8, 8, 8);
            text(this.hoverText, mouseX - 5 - this.hoverTextWidth, mouseY - this.hoverTextHeight - 5, this.hoverTextWidth, this.hoverTextHeight);
          }
        } else {
          if (mouseX + this.hoverTextWidth + 20 < width) {
            rect(mouseX + 15, mouseY + (this.hoverTextHeight - 8) - 0.5*this.hoverTextHeight, this.hoverTextWidth + 5, (this.hoverTextHeight + 8), 8, 8, 8, 8);
            text(this.hoverText, mouseX + 25, mouseY + this.hoverTextHeight - 0.5*this.hoverTextHeight, this.hoverTextWidth, this.hoverTextHeight);
          } else {
            rect(mouseX - 10, mouseY + (this.hoverTextHeight - 8)  - 0.5*this.hoverTextHeight, -(this.hoverTextWidth + 5), (this.hoverTextHeight + 8), 8, 8, 8, 8);
            text(this.hoverText, mouseX - 5 - this.hoverTextWidth, mouseY + this.hoverTextHeight - 0.5*this.hoverTextHeight, this.hoverTextWidth, this.hoverTextHeight);
          }
        }
      }
    }
  }
  getEventCode() {
    return this.eventCode;
  }
  changeEventCode(newCode) {
    this.eventCode = newCode;
  }
  shouldDisplayHoverText() {
    if (this.underMouse()) {
      if (this.timeTillHoverTextShown-- <= 0) {
        return true;
      }
    } else {
      this.timeTillHoverTextShown = 60;
    }
    return false;
  }
  update() {
    this.pressed = mouseX >= this.xpos && mouseX <= this.xpos + this.w && mouseY >= this.ypos && mouseY <= this.ypos + this.h;
    if (this.pressed) {
      this.wasClicked = !this.wasClicked;
    }
  }
}
