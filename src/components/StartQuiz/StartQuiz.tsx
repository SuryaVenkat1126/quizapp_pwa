import React, { useContext } from 'react';
// Context
import { GlobalContext } from '../../context/context';
// Types
import { DataModifier, QuizData } from '../../export_types';
// Styles
import { Wrapper } from './StartQuiz.styles';
import { Button } from '../../styles/styles';

type Props = {
    quizReader: any;
    dataModifier: DataModifier;
    setAppState: React.Dispatch<React.SetStateAction<number>>;
}

const StartQuiz: React.FC<Props> = ({ quizReader, dataModifier, setAppState }) => {
    const { selectedCategory, categories, selectedType, quizType, selectedDifficulty, quizDifficulty, 
        selectedNumOfQuestions, startQuiz } = useContext(GlobalContext);
    const quizData: QuizData = quizReader(dataModifier);

    const clickHandler = () => {
        startQuiz && startQuiz(quizData);
        setAppState(2); // Show QuestionCard component on next render.
    }
    return (
        <Wrapper>
            { quizData.responseCode === 0
                ? 
                    <>
                        <div>Your following quiz is ready</div>
                        <div>
                            <span>{`Category: `}</span>
                            <span>{categories[selectedCategory]}</span>
                        </div>
                        <div>
                            <span>{`Type: `}</span>
                            <span>{quizType[selectedType]}</span>
                        </div>
                        <div>
                            <span>{`Difficulty: `}</span>
                            <span>{quizDifficulty[selectedDifficulty]}</span>
                        </div>
                        <div>
                            <span>{`Total Questions: `}</span>
                            <span>{selectedNumOfQuestions}</span>
                        </div>
                        <Button onClick={clickHandler}>
                            Start Quiz
                        </Button>
                    </>
                :
                    <>
                        <div>
                            Not enough questions against your selected options...
                        </div>
                        <Button onClick={() => setAppState(0)}>
                            Select Another Quiz
                        </Button>
                    </>
            }
        </Wrapper>
    )
}

export default StartQuiz;