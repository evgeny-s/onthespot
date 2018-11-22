import React, {Component} from 'react';
import './App.css';
import Question from "./components/Question";

const initialState = {
  currentQuestion: 0,
  settings: {
    defaultScore: 1,
  },
  questions: [
    {
      key: 0,
      question: 'What is the capital of Belarus',
      answers: [
        {key: 0, value: 'Moscow'},
        {key: 1, value: 'Minsk'},
        {key: 2, value: 'Berlin'},
        {key: 3, value: 'Argentina'},
      ],
      correctAnswer: {
        value: [0]
      }
    },
    {
      key: 1,
      question: 'Question 2',
      answers: [
        {key: 0, value: 'Answer 1'},
        {key: 1, value: 'Answer 2'},
        {key: 2, value: 'Answer 3'},
        {key: 3, value: 'Answer 4'},
      ],
      correctAnswer: {
        value: [0]
      }
    }
  ],
  userAnswers: []
};

class App extends Component {
  state = initialState;

  _onNextClick = () => {
    if (this.state.currentQuestion + 1 === this.state.questions.length) {
      let result = this._calculateResult();
      alert(`Your result: ${result} scores`);

      return false;
    }

    this.setState({
      currentQuestion: this.state.currentQuestion + 1
    });
  };

  _calculateResult = () => {
    let sumScores = 0;

    for (let i = 0; i < this.state.questions.length; i++) {
      let qKey = this.state.questions[i].key;
      let userAnswers = this._findUserAnswer(qKey);

      if (this.state.questions[i].correctAnswer.value.length === userAnswers.length) {
        let isCorrect = true;
        for (let j = 0; j < userAnswers.length; j++) {
          if (!userAnswers.includes(this.state.questions[i].correctAnswer.value[j])) {
            isCorrect = false;
            break;
          }
        }

        if (isCorrect === true) {
          // Can be taken from answer weight later..
          sumScores = sumScores + this.state.settings.defaultScore;
        }
      }
    }

    return sumScores;
  };

  _findUserAnswer = (qKey) => {
    for (let i = 0; i < this.state.userAnswers.length; i++) {
      if (this.state.userAnswers[i].qKey === qKey) {
        return this.state.userAnswers[i].answers;
      }
    }

    return null;
  };

  _resetState = () => {
    this.setState(initialState);
  };

  _processAnswerClick = (questionKey, answerKey) => {
    let currentAnswers = this.state.userAnswers[questionKey] ? this.state.userAnswers[questionKey].answers : [];
    let currentUserAnswers = this.state.userAnswers;

    let questionIndex = -1;
    for (let i = 0; i < currentUserAnswers.length; i++) {
      if (currentUserAnswers[i].qKey === questionKey) {
        questionIndex = i;
      }
    }

    if (questionIndex >= 0) {
      currentUserAnswers[questionKey].answers = currentAnswers;
    } else {
      currentUserAnswers.push({
        qKey: questionKey,
        answers: currentAnswers
      });
    }

    if (!currentAnswers.includes(answerKey)) {
      currentAnswers.push(answerKey);
    }

    this.setState({
      userAnswers: currentUserAnswers
    })
  };

  render() {
    return (
      <div className="App">
        <React.Fragment>
          <button onClick={this._resetState}>Reset</button>
          {
            <Question
              question={this.state.questions[this.state.currentQuestion]}
              settings={this.state.settings}
              onNextClick={this._onNextClick}
              processAnswerClick={this._processAnswerClick}
            />
          }
        </React.Fragment>


      </div>
    );
  }
}

export default App;
