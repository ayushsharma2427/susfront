
import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spin, Tabs } from "antd";
import GenerateTabContent from "../../../components/common/GenerateTabContent";
import SaveButton from "../../../components/common/Button/Savebutton";
import NextButton from "../../../components/common/Button/Nextbutton";
import { apiRequest } from "../../../services/apiService";
import { setActiveTabKey, setgoalsData, setIsSaved, setPillarsData } from "../../../redux/slices/goalsSlice";
import Resetbtn from "../../../components/common/Button/Resetbtn";
import "./Goals.css";

const Goals = () => {

  console.log("render goal");

  const dispatch = useDispatch();
  const { activeTabKey, goalsData, isSaved } = useSelector(
    (state) => state.goals
  );

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const result = await apiRequest("GET", "/api/goalsData");
        dispatch(setgoalsData(result));
      } catch (error) {
        console.error("Error fetching page content:", error);
      }
    };

    const fetchPillarData = async () => {
      try {
        const result = await apiRequest("GET", "/api/101/2024") || [];
        dispatch(setPillarsData(result));
      } catch (error) {
        console.error("Error fetching page content:", error);
      }
    };
    fetchPageData();
    fetchPillarData();
  }, [dispatch]);

  // Memoizing the handlers using useCallback
  const handleGoalsSave = useCallback(() => {
    dispatch(setIsSaved(true));
  }, [dispatch]);

  const handleNextClick = useCallback(() => {
    const currentIndex = goalsData.findIndex(
      (item) => item.pillarName === activeTabKey
    );
    const nextIndex = (currentIndex + 1) % goalsData.length;
    dispatch(setActiveTabKey(goalsData[nextIndex].pillarName));
    dispatch(setIsSaved(false));
  }, [dispatch, goalsData, activeTabKey]);

  const items = goalsData.map((goals) => ({
    key: goals.pillarName,
    label: goals.pillarName,
    children: <GenerateTabContent Data={goals} />,
  }));

  return (
    <div>
      <Tabs
        activeKey={activeTabKey}
        items={items}
        onChange={(key) => dispatch(setActiveTabKey(key))}
        tabBarStyle={{
          backgroundColor: "#014D4E",
          height: "45px",
          marginBottom: 0,
        }}
        className="custom-tabs ml-[10px] bg-white mb-[17px] rounded-t-[20px] rounded-b-[20px] w-auto h-auto shadow-md"
        tabBarGutter={0}
      />

      <br />
      <div className="w-auto flex justify-end  mr-[50px] gap-2.5">
        <Resetbtn />
        <SaveButton onClick={handleGoalsSave} />
        <NextButton isSaved={isSaved} onClick={handleNextClick} />
      </div>
      <br />
    </div>
  );
};

export default React.memo(Goals);



// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Spin, Tabs } from "antd";
// import GenerateTabContent from "../../../components/common/GenerateTabContent";
// import SaveButton from "../../../components/common/Button/Savebutton";
// import NextButton from "../../../components/common/Button/Nextbutton";
// import { apiRequest } from "../../../services/apiService";
// import { setActiveTabKey, setgoalsData, setIsSaved } from "../../../redux/slices/goalsSlice";
// import Resetbtn from "../../../components/common/Button/Resetbtn";
// import "./Goals.css";

// const Goals = () => {
//   const dispatch = useDispatch();
//   const { activeTabKey, goalsData, isSaved } = useSelector(state => state.goals);

//   useEffect(() => {
//     const fetchPageData = async () => {
//       try {
//         const result = await apiRequest("GET", "/api/goalsData");
//         dispatch(setgoalsData(result));
//       } catch (error) {
//         console.error("Error fetching page content:", error);
//       }
//     };
//     fetchPageData();
//   }, [dispatch]);

//   const handleGoalsSave = () => {
//     // SAVE API
//     dispatch(setIsSaved(true));
//   };

//   const handleNextClick = () => {
//     const currentIndex = goalsData.findIndex(item => item.pillarName === activeTabKey);
//     const nextIndex = (currentIndex + 1) % goalsData.length;
//     dispatch(setActiveTabKey(goalsData[nextIndex].pillarName));
//     dispatch(setIsSaved(false));
//   };

//   const items = goalsData.map(goal => ({
//     key: goal.pillarName,
//     label: goal.pillarName,
//     children: <GenerateTabContent Data={goal} />,
//   }));

//   return (
//     <div>
//       <Tabs
//         activeKey={activeTabKey}
//         items={items}
//         onChange={key => dispatch(setActiveTabKey(key))}
//         tabBarStyle={{
//           backgroundColor: "#014D4E",
//           height: "45px",
//           marginBottom: 0,
//         }}
//         className="custom-tabs ml-[10px] bg-white mb-[17px] rounded-t-[20px] rounded-b-[20px] w-auto h-auto shadow-md"
//         tabBarGutter={0}
//       />

//       <br />
//       <div className="w-auto flex justify-end mr-[50px] gap-2.5">
//         <Resetbtn />
//         <SaveButton onClick={handleGoalsSave} />
//         <NextButton isSaved={isSaved} onClick={handleNextClick} />
//       </div>
//       <br />
//     </div>
//   );
// };

// export default Goals;
