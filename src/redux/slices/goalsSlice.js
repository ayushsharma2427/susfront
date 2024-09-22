import { createSlice } from '@reduxjs/toolkit';
import { Statistic } from 'antd';

const goalsSlice = createSlice(
  {
    name: 'goals',
    initialState: {
      activeTabKey: null,
      goalsData: [],
      isSaved: false,
      formData:{ },
      pillarsData:[]
    },
    reducers: {
      setPillarsData(state,action){
         state.pillarsData=action.payload;
      },
      setActiveTabKey(state, action) {
        state.activeTabKey = action.payload;
      },
      setgoalsData(state, action) {
        state.goalsData = action.payload;
        const energyTab = action.payload.find(
          (data) => data.pillarName === 'Energy'
        );
        state.activeTabKey =  energyTab.pillarName;

      },
      setIsSaved(state, action) {
        state.isSaved = action.payload;
      },
      setFormData: (state, action) => {
        const { pillarName, questionId, inputId, value } = action.payload;
        if (!state.formData[pillarName]) {
          state.formData[pillarName] = {};
        }
        if (!state.formData[pillarName][questionId]) {
          state.formData[pillarName][questionId] = {};
        }
        state.formData[pillarName][questionId][inputId] = value;
      },
      
    },
  });

export const { setActiveTabKey, setgoalsData, setIsSaved, setFormData,setPillarsData} = goalsSlice.actions;
export default goalsSlice.reducer;

// import { createSlice } from '@reduxjs/toolkit';

// const goalsSlice = createSlice({
//   name: 'goals',
//   initialState: {
//     activeTabKey: null,
//     goalsData: [],
//     isSaved: false,
//     formData: {},
//   },
//   reducers: {
//     setActiveTabKey(state, action) {
//       state.activeTabKey = action.payload;
//     },
//     setgoalsData(state, action) {
//       state.goalsData = action.payload.map(goal => ({
//         ...goal,
//         dynamicQuestions: [], // Initialize dynamic questions
//       }));
//       const energyTab = action.payload.find(data => data.pillarName === 'Energy');
//       state.activeTabKey = energyTab.pillarName;
//     },
//     setIsSaved(state, action) {
//       state.isSaved = action.payload;
//     },
//     setFormData: (state, action) => {
//       const { pillarName, questionId, inputId, value } = action.payload;
//       if (!state.formData[pillarName]) {
//         state.formData[pillarName] = {};
//       }
//       if (!state.formData[pillarName][questionId]) {
//         state.formData[pillarName][questionId] = {};
//       }
//       state.formData[pillarName][questionId][inputId] = value;
//     },
//     addDynamicQuestion(state, action) {
//       const { pillarName, question } = action.payload;
//       const goal = state.goalsData.find(g => g.pillarName === pillarName);
//       if (goal) {
//         goal.dynamicQuestions.push({ ...question, questionId: Date.now(), isDynamic: true });
//       }
//     },
//     removeDynamicQuestion(state, action) {
//       const { pillarName, questionId } = action.payload;
//       const goal = state.goalsData.find(g => g.pillarName === pillarName);
//       if (goal) {
//         goal.dynamicQuestions = goal.dynamicQuestions.filter(q => q.questionId !== questionId);
//       }
//     },
//   },
// });

// export const { setActiveTabKey, setgoalsData, setIsSaved, setFormData, addDynamicQuestion, removeDynamicQuestion } = goalsSlice.actions;
// export default goalsSlice.reducer;
