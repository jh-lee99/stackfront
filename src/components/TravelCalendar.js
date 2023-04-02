import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const TravelCalendar = () => {
  const [value, onChange] = useState(new Date());

  return (
    <div>
      <Calendar
        onChange={onChange}
        //formatDay={(locale, date) => moment(date).format("DD")} // 날'일' 제외하고 숫자만 보이도록 설정
        value={value}
        minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
        maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
        navigationLabel={null}
        showNeighboringMonth={false} //  이전, 이후 달의 날짜는 보이지 않도록 설정
        className="mx-auto w-full text-sm border-b"
      />
    </div>
  );
};

export default TravelCalendar;
