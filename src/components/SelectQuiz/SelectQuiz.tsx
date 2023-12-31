import React, { useContext, useState } from 'react';
import { resourceCache } from 'use-async-resource';
// Context
import { GlobalContext } from '../../context/context';
// API function
import { fetchQuestions } from '../../API/API';
// Styles
import { StyledWrapper } from './SelectQuiz.styles';
import { Button } from '../../styles/styles';
// Types
import { FormData } from '../../export_types';
// Firebase notifications
import { requestFcmPermission } from '../../firebase';
// Icons
import { IconContext } from 'react-icons';
import { FaBell } from 'react-icons/fa';

type Props = {
    fetchNewQuiz: any;
    setAppState: React.Dispatch<React.SetStateAction<number>>;
}

const SelectQuiz: React.FC<Props> = ({ fetchNewQuiz, setAppState }) => {
    const { categories, quizType, quizDifficulty, numQuestionsAvailable, submitForm } = useContext(GlobalContext);
    const [ categorySelection, setCategorySelection ] = useState<number>(0);
    const [ typeSelection, setTypeSelection ] = useState<string>('');
    const [ difficultySelection, setDifficultySelection ] = useState<string>('');
    const [ numQuestionsSelection, setNumQuestionsSelection ] = useState<number>(numQuestionsAvailable[0]);
    const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const formData: FormData = {
            category: categorySelection,
            type: typeSelection,
            difficulty: difficultySelection,
            numQuestions: numQuestionsSelection,
        };
        submitForm && submitForm(formData);
        resourceCache(fetchQuestions).clear();
        fetchNewQuiz(categorySelection, typeSelection, difficultySelection, numQuestionsSelection);
        setAppState(1); // Show StartQuiz component on next render.
    }
    const allowNotifications = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        requestFcmPermission();
    }
    return (
        <StyledWrapper>
            <form>
                <label htmlFor="category">Select category</label>
                <select id="category" defaultValue={0} onChange={(e) => setCategorySelection(+e.target.value)}>
                    {Object.keys(categories).map( (key: string) => (
                        <option key={categories[parseInt(key)]} value={key}>{categories[parseInt(key)]}</option>
                    ))}
                </select>

                <label htmlFor="quizType">Select Type</label>
                <select id="quizType" defaultValue={''} onChange={(e) => setTypeSelection(e.target.value)}>
                    {Object.keys(quizType).map( (key: string) => (
                        <option key={quizType[key]} value={key}>{quizType[key]}</option>
                    ))}
                </select>

                <label htmlFor="difficulty">Select Difficulty</label>
                <select id="difficulty" defaultValue={''} onChange={(e) => setDifficultySelection(e.target.value)}>
                    {Object.keys(quizDifficulty).map( (key: string) => (
                        <option key={quizDifficulty[key]} value={key}>{quizDifficulty[key]}</option>
                    ))}
                </select>

                <label htmlFor="numQuestions">Number of questions</label>
                <select id="numQuestions" defaultValue={5} onChange={(e) => setNumQuestionsSelection(+e.target.value)}>
                    {numQuestionsAvailable.map( (num: number) => (
                        <option key={num} value={num}>{num}</option>
                    ))}
                </select>

                <div className="buttons">
                    <Button type='submit' onClick={clickHandler}>
                        Start Quiz
                    </Button>
                    <Button onClick={allowNotifications}>
                        <IconContext.Provider value={{ size: "18px", color: "black" }}>
                            <FaBell title="Allow Notifiactions"/>
                        </IconContext.Provider>
                    </Button>
                </div>
            </form>
        </StyledWrapper>
    )
}

export default SelectQuiz;