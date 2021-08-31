import React, { useState, useEffect } from "react";
import { apiRequest } from "../utils/apiUtils";

// Events (Kanban)
// const eventData = [
//   {
//     swim_id: 1,
//     swim_title: "Open",
//     items: [
//       {
//         item_id: 1,
//         item_title: "flowers",
//         item_content:
//           "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae pariatur ex dicta adipisci illo.",
//       },
//       {
//         item_id: 2,
//         item_title: "dress",
//         item_content:
//           "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae pariatur ex dicta adipisci illo.",
//       },
//     ],
//   },

//   {
//     swim_id: 2,
//     swim_title: "in-progress",
//     items: [
//       {
//         item_id: 3,
//         item_title: "cake tasting",
//         item_content:
//           "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae pariatur ex dicta adipisci illo.",
//       },
//     ],
//   },

//   {
//     swim_id: 3,
//     swim_title: "feedback",
//     items: [
//       {
//         item_id: 4,
//         item_title: "seating chart",
//         item_content:
//           "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae pariatur ex dicta adipisci illo.",
//       },
//       {
//         item_id: 5,
//         item_title: "invitations",
//         item_content:
//           "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae pariatur ex dicta adipisci illo.",
//       },
//     ],
//   },

//   {
//     swim_id: 4,
//     swim_title: "complete",
//     items: [
//       {
//         item_id: 6,
//         item_title: "venue",
//         item_content:
//           "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae pariatur ex dicta adipisci illo.",
//       },
//     ],
//   },
// ];

export const EventBoardContext = React.createContext();

const EventBoardContextProvider = ({ children }) => {
  const [data, setEventBoardData] = useState([]);
  // const { location } = useLocation();

  useEffect(() => {
    // TODO: uncomment once API supports event board data retrieval
    console.log('document.location: ', document.location)
    console.log('document.location: ', document.location)
    let params = new URLSearchParams(document.location.search.substring(1));
    console.log('params: ', params)
    // 
    // let eventId = params.get("eventId");
    // console.log('eventId: ', eventId)

    let eventId = '1'
    console.log('eventId: ', eventId)
    apiRequest(`${process.env.REACT_APP_API_URL}/board/${eventId}`,{ method: "GET" })
      .then((res) => res.json())
      .then((eventData) => {
        console.log('eventData: ', eventData)
        setEventBoardData(eventData);
      })
      .catch(e => console.log('EventBoardContextProvider error in fetching board data'))
  }, []);

  console.log('data in EventBoardContext: ', data)

  return <EventBoardContext.Provider value={{ data, setEventBoardData }}>{children}</EventBoardContext.Provider>;
};

export const withEventBoard = (Component) => (props) => (
  <EventBoardContextProvider>
    <Component {...props} />
  </EventBoardContextProvider>
);

export const useEventBoard = () => {
  const context = React.useContext(EventBoardContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};
