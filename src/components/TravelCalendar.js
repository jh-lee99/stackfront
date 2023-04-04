import { useState, useEffect } from "react";
import { Calendar } from "react-calendar";
import moment from "moment";

import "react-calendar/dist/Calendar.css";

// const TravelCalendar = () => {
//   const [date, setDate] = useState(new Date());
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [datelength, setDatelength] = useState();

//   useEffect(() => {
//     setDatelength(date.length);
//   }, [date]);
//   return (
//     <div>
//       <Calendar
//         onChange={setSelectedDate}
//         formatDay={(locale, date) =>
//           date.toLocaleDateString("ko", { day: "numeric" })
//         } // 날'일' 제외하고 숫자만 보이도록 설정
//         value={selectedDate}
//         selectRange={true}
//         minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
//         maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
//         navigationLabel={null}
//         showNeighboringMonth={false} //  이전, 이후 달의 날짜는 보이지 않도록 설정
//         prev2Label={null}
//         next2Label={null}
//         className="mx-auto w-full text-sm border-b"
//         activeStartDate={null}
//       />
//       {date.length > 0 ? (
//         <p className="text-center">
//           <span className="bold">Start:</span> {date[0].toDateString()}
//           &nbsp;|&nbsp;
//           <span className="bold">End:</span> {date[1].toDateString()}
//           <div className="center">여행기간: {setDatelength(date.length)}일</div>
//         </p>
//       ) : (
//         <p className="text-center">
//           <span className="bold">Today: {date.toDateString()}</span>{" "}
//         </p>
//       )}
//     </div>
//   );
// };
function TravelCalendar() {
  const [selectedDates, setSelectedDates] = useState([]);
  
  const dateDiff = () => {
    if (selectedDates.length === 2) {
      const start = moment(selectedDates[0]);
      const end = moment(selectedDates[1]);
      const diff = end.diff(start, "days");
      return `Selected dates are ${diff} days apart`;
    } else {
      return "Please select two dates";
    }
  };

  useEffect(() => {
    console.log(dateDiff());
  }, [selectedDates]);

  const handleSelect = (momentRange) => {
    const newSelectedDates = [moment(momentRange[0]), moment(momentRange[1])];
    setSelectedDates(newSelectedDates);  
  };

  return (
    <div>
      <Calendar
        value={selectedDates}
        onChange={handleSelect}
        formatDay={(locale, date) =>
          date.toLocaleDateString("ko", { day: "numeric" })
        } // 날'일' 제외하고 숫자만 보이도록 설정
        selectRange={true}
        minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
        maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
        navigationLabel={null}
        showNeighboringMonth={false} //  이전, 이후 달의 날짜는 보이지 않도록 설정
        prev2Label={null}
        next2Label={null}
        className="mx-auto w-full text-sm border-b"
        activeStartDate={null}
      />
      {selectedDates.length === 2 ? (
        <div>
          {/* {moment(selectedDates[0]).format("YYYY-MM-DD")} ~ {moment(selectedDates[1]).format("YYYY-MM-DD")} */}
          {dateDiff()}
        </div>
        ) : null}
    </div>
  );
}

export default TravelCalendar;