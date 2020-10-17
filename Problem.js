class Problem {
  constructor(equation, answer, worth) {
    this.equation = equation;
    this.answer = answer;
    this.worth = worth;
    this.attemptsRemaining = 2;
  }

  /* Answer Codes:
   -1 - Wrong, problem failed
   0 - Wrong, attempts remaining
   */
  checkAnswer(ans) {
    if (this.answer == ans) {
      return 1;
    } else {
      return this.failedAttempt();
    }
  }
  failedAttempt() {
    if (this.attemptsRemaining > 0) {
      this.attemptsRemaining--;
      return 0;
    } else {
      return -1;
    }
  }
  getRemainingAttempts() {
    return this.attemptsRemaining;
  }
  getWorth() {
    return this.worth;
  }
  getEquation() {
    return this.equation;
  }
}
