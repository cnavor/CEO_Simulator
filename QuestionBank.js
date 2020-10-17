class QuestionBank {
  constructor() {
    //Load Problems -- For later
    this.easyProblems = "";//loadStrings("Problems/easy.txt");
    this.mediumProblems = "";//loadStrings("Problems/medium.txt");
    this.hardProblems = "";//loadStrings("Problems/hard.txt");
    this.extremeProblems = "";//loadStrings("Problems/extreme.txt");   


    //Problem Values -- Will change as reputation increase and upgrades are bought
    this.easyWorth = 10;
    this.mediumWorth = 25;
    this.hardWorth = 50;
    this.extremeWorth = 100;
  }

  chooseProblem(difficulty) {
    switch(difficulty) {
    case 0:
      return this.chooseEasyProblem();
    case 1:
      return this.chooseMediumProblem();
    case 2:
      return this.chooseHardProblem();
    case 3:
      return this.chooseExtremeProblem();
    }
  }

  chooseEasyProblem() {
    if (this.easyProblems.length != 0) {
      problem = this.easyProblems[round(random(this.easyProblems.length))];
      return problem;
    } else {
      return this.generateEasyProblem();
    }
  }
  chooseMediumProblem() {
    if (this.mediumProblems.length != 0) {
      problem = this.mediumProblems[round(random(this.mediumProblems.length))];
      return problem;
    } else {
      return this.generateMediumProblem();
    }
  }
  chooseHardProblem() {
    if (this.easyProblems.length != 0) {
      problem = this.hardProblems[round(random(this.hardProblems.length))];
      return problem;
    } else {
      return this.generateHardProblem();
    }
  }
  chooseExtremeProblem() {
    if (this.easyProblems.length != 0) {
      problem = this.extremeProblems[round(random(this.extremeProblems.length))];
      return problem;
    } else {
      return this.generateExtremeProblem();
    }
  }

  generateEasyProblem() {
    let addend_a = round(random(100));
    let addend_b = round(random(100));
    let equation = str(addend_a) + " + " + str(addend_b);
    return new Problem(equation, addend_a + addend_b, this.easyWorth);
  }
  generateMediumProblem() {
    //For Test
    let addend_a = round(random(100));
    let addend_b = round(random(100));
    let equation = str(addend_a) + " - " + str(addend_b);
    return new Problem(equation, addend_a - addend_b, this.mediumWorth);
  }
  generateHardProblem() {
    //For Test
    let addend_a = round(random(10));
    let addend_b = round(random(10));
    let equation = str(addend_a) + " x " + str(addend_b);
    return new Problem(equation, addend_a * addend_b, this.hardWorth);
  }
  generateExtremeProblem() {
    //For Test
    let addend_a = round(random(10, 50));
    let addend_b = round(random(10, 50));
    let equation = str(addend_a) + " x " + str(addend_b);
    return new Problem(equation, addend_a * addend_b, this.extremeWorth);
  }
}
