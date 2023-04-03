import { useState, useEffect } from "react";
import { Calendar } from "react-calendar";

import "react-calendar/dist/Calendar.css";

const TravelCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [datelength, setDatelength] = useState();

  /*useEffect(() => {
    setDatelength(date.length);
  }, [date]);*/
  return (
    <div>
      <Calendar
        onChange={setSelectedDate}
        formatDay={(locale, date) =>
          date.toLocaleDateString("en", { day: "numeric" })
        } // 날'일' 제외하고 숫자만 보이도록 설정
        value={selectedDate}
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
      {date.length > 0 ? (
        <p className="text-center">
          <span className="bold">Start:</span> {date[0].toDateString()}
          &nbsp;|&nbsp;
          <span className="bold">End:</span> {date[1].toDateString()}
          <div className="center">여행기간: {datelength}일</div>
        </p>
      ) : (
        <p className="text-center">
          <span className="bold">Today: {date.toDateString()}</span>{" "}
        </p>
      )}
    </div>
  );
};

export default TravelCalendar;
