

import React, { useState, useEffect,useCallback } from "react";
import Addbtn from "./Button/Addbtn";
import Deletebtn from "./Button/Deletebtn";

import { QuestionGenerator } from "./QuestionGenerator";

import { useDispatch, useSelector } from 'react-redux';
import { setFormData } from '../../redux/slices/goalsSlice';


const GenerateTabContent = ({ Data }) => {
  console.log("render generator");
  const dispatch = useDispatch();
  const { formData } = useSelector((state) => state.goals);

  // Memoizing handleInputChange using useCallback
  const handleInputChange = useCallback(
    (pillarName, questionId, inputId, value) => {
      dispatch(setFormData({ pillarName, questionId, inputId, value }));
    },
    [dispatch]
  );

  const QuestionContent = (Data) => {
    return Data?.questions?.map((question, index) => (
      <div key={index} className="w-auto mb-3 mt-3 flex p-4">
        <div className="flex-1 ml-5 mr-15 flex justify-between items-start">
          <div>
            <QuestionGenerator
              text={question.text}
              inputFields={question.inputFields}
              questionId={question.questionId}
              handleInputChange={handleInputChange}
              pillarName={Data.pillarName}
            />
          </div>
        </div>
      </div>
    ));
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return <>{QuestionContent(Data)}</>;
};

export default React.memo(GenerateTabContent);




// import React, { useEffect } from "react";
// import Addbtn from "./Button/Addbtn";
// import Deletebtn from "./Button/Deletebtn";
// import { QuestionGenerator } from "./QuestionGenerator";
// import { useDispatch, useSelector } from 'react-redux';
// import { setFormData, addDynamicQuestion, removeDynamicQuestion } from '../../redux/slices/goalsSlice';

// const GenerateTabContent = ({ Data }) => {
//   const dispatch = useDispatch();
//   const { formData } = useSelector(state => state.goals);

//   const handleInputChange = (pillarName, questionId, inputId, value) => {
//     dispatch(setFormData({ pillarName, questionId, inputId, value }));
//   };

//   const handleAddQuestion = (pillarName, question) => {
//     dispatch(addDynamicQuestion({ pillarName, question }));
//   };

//   const handleDeleteQuestion = (pillarName, questionId) => {
//     dispatch(removeDynamicQuestion({ pillarName, questionId }));
//   };

//   const QuestionContent = (Data) => {
//     const allQuestions = [...Data.questions, ...Data.dynamicQuestions];
//     return allQuestions.map((question, index) => (
//       <div key={index} className="w-auto mb-3 mt-3 flex p-4">
//         <div className="flex-1 ml-5 mr-15 flex justify-between items-start">
//           <div>
//             {QuestionGenerator(
//               question.text,
//               question.inputFields,
//               question.questionId,
//               handleInputChange,
//               Data.pillarName
//             )}
//           </div>
//           <div className="ml-[10px] flex flex-col gap-1 justify-center">
//             <Addbtn onClick={() => handleAddQuestion(Data.pillarName, question)} />
//             <Deletebtn onClick={() => handleDeleteQuestion(Data.pillarName, question.questionId)} 
//                        disabled={!question.isDynamic} />
//           </div>
//         </div>
//       </div>
//     ));
//   };
//   useEffect(() => {
//         const fields = formData
    
//         console.log(fields)
//       }, [formData]);
//   return (
//     <>
//       {QuestionContent(Data)}
//     </>
//   );
// };

// export default GenerateTabContent;
