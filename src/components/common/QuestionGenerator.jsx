

import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { setFormData } from '../../redux/slices/goalsSlice';

export const QuestionGenerator = React.memo(
  ({ text, inputFields, questionId, handleInputChange, pillarName }) => {

    const dispatch = useDispatch();
    console.log("render question generator");
    const { pillarsData } = useSelector((state) => state.goals);

    const pillarData = pillarsData?.find((data) => {
      return pillarName === data.pillarName;
    });
    // console.log(pillarData);

    const goalAnswers = pillarData?.goalAnswers || [];
    // console.log(goalAnswers);

    const response = goalAnswers?.find((response) => {
      return questionId === response["questionId"];
    });
    // console.log(response?.["response"]);

    const textParts = text.split(/(<[^>]+>)/g).map((part, index) => {
      const matchedField = inputFields.find(
        (field) => `<${field.inputId}>` === part
      );
      if (matchedField) {
        const { inputId, inputType, options } = matchedField;
        const key = `${questionId}-${inputId}-${index}`;

        const o = response?.["response"].find((data) => {
          return data["fieldId"] == inputId
        })

        const value = o?.["value"] || ''
        dispatch(setFormData({ pillarName, questionId, inputId, value }));

        

        if (inputType === "number") {
          return (
            <input
              value={value}
              type="number"
              key={key}
              className="font-semibold text-center mx-1 w-[75px] text-[#014D4E] border-b-[1px] border-dashed border-[#014D4E] mb-[2px]"
              onChange={(e) =>
                handleInputChange(pillarName, questionId, inputId, e.target.value)
              }
            />
          );
        } else if (inputType === "text") {
          return (
            <input
              value={value}
              type="text"
              key={key}
              className="font-semibold text-center mx-1 w-[75px] text-[#014D4E] border-b-[1px] border-dashed border-[#014D4E] mb-[2px]"
              onChange={(e) =>
                handleInputChange(pillarName, questionId, inputId, e.target.value)
              }
            />
          );
        } else if (inputType === "dropdown") {
          return (
            <select
              value={value}
              key={key}
              className="text-center w-[150px] h-[28px] text-[#014D4E] border-b-[1px] border-dashed border-[#014D4E] mb-[2px]"
              onChange={(e) =>
                handleInputChange(pillarName, questionId, inputId, e.target.value)
              }
            >
              <option disabled selected hidden></option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          );
        }
      } else {
        return part;
      }
    });

    return <span>{textParts}</span>;
  }
);


// export const QuestionGenerator = (text, inputFields, questionId, handleInputChange, pillarName) => {
//   const textParts = text.split(/(<[^>]+>)/g).map((part, index) => {
//     const matchedField = inputFields.find(field => `<${field.inputId}>` === part);
//     if (matchedField) {
//       const { inputId, inputType, options } = matchedField;
//       const key = `${questionId}-${inputId}-${index}`;

//       return inputType === 'number' ? (
//         <input
//           type="number"
//           key={key}
//           className="font-semibold text-center mx-1 w-[75px] text-[#014D4E] border-b-[1px] border-dashed border-[#014D4E] mb-[2px]"
//           onChange={e => handleInputChange(pillarName, questionId, inputId, e.target.value)}
//         />
//       ) : inputType === "text" ? (
//         <input
//           type="text"
//           key={key}
//           className="font-semibold text-center mx-1 w-[75px] text-[#014D4E] border-b-[1px] border-dashed border-[#014D4E] mb-[2px]"
//           onChange={e => handleInputChange(pillarName, questionId, inputId, e.target.value)}
//         />
//       ) : inputType === 'dropdown' ? (
//         <select
//           key={key}
//           className="text-center w-[150px] h-[28px] text-[#014D4E] border-b-[1px] border-dashed border-[#014D4E] mb-[2px]"
//           onChange={e => handleInputChange(pillarName, questionId, inputId, e.target.value)}
//         >
//           <option disabled selected hidden></option>
//           {options.map(option => (
//             <option key={option} value={option}>
//               {option}
//             </option>
//           ))}
//         </select>
//       ) : part;
//     } else {
//       return part;
//     }
//   });

//   return <span>{textParts}</span>;
// };
