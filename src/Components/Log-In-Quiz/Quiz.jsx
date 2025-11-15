import React from 'react'
import { useState } from 'react';

const quizInfo = [
    { id: 1, question: "How did you hear about us?", options: ["Google", "Instagram", "Friend", "YouTube", "Other"] },
    { id: 2, question: "What is your occupation?", options: ["Student", "Professional", "Freelancer", "Business Owner", "Other"] },
    { id: 3, question: "What brought you here today?", options: ["Learn a skill", "Complete courses", "Compare platforms", "Explore options"] },
    { id: 4, question: "Which category interests you most?", options: ["Tech", "Business", "Design", "Personal Development", "Other"] },
    { id: 5, question: "Your experience level?", options: ["Beginner", "Intermediate", "Advanced"] },
    { id: 6, question: "How much time can you dedicate per week?", options: ["<2 Hours", "2-5 Hours", "5-10 Hours", "10-15 Hours", "15+ Hours"] }
];

const Quiz = ({ isOpen, onClose, openSignup }) => {

    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({});

    if (!isOpen) return null;

    const currentQ = quizInfo[currentStep];

    const handleAnswer = (option) => {
        setAnswers(prev => ({ ...prev, [currentQ.id]: option }));

        if (currentStep < quizInfo.length - 1) {
            setCurrentStep(currentStep + 1);
        }
        else {
            console.log("Finished: ", { ...answers, [currentQ.id]: option });
            openSignup();
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-black/40 z-50">

            <div className="bg-[#121212] w-[90%] max-w-md p-6 rounded-xl shadow-[0_0_30px_rgba(255,102,0,0.3)] border border-orange-500/30">

                {/* Progress */}
                <p className="text-sm text-orange-400 mb-3">
                    Question {currentStep + 1} of {quizInfo.length}
                </p>

                {/* Question */}
                <h2 className="text-xl font-semibold mb-6 text-white">
                    {currentQ.question}
                </h2>

                {/* Options */}
                <div className="flex flex-col space-y-3">
                    {currentQ.options.map((opt, index) => (
                        <button
                            key={index}
                            onClick={() => handleAnswer(opt)}
                            className="
                                w-full py-3 rounded-lg 
                                border border-orange-500/40 
                                bg-[#1a1a1a] 
                                text-white
                                hover:bg-orange-500 hover:text-black 
                                transition-all duration-200
                                shadow-[0_0_10px_rgba(255,102,0,0.2)]
                              "
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Quiz;