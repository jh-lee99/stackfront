import { useState, useEffect } from "react";
import { Calendar } from "react-calendar";
import moment from "moment";
import GptApiContentModal from "../modals/GptApiContentModal";

import "react-calendar/dist/Calendar.css";
//import { diff } from "semver";

function TravelCalendar() {
  const [selectedDates, setSelectedDates] = useState([]);
  const [Tdate, setTdate] = useState(0);

  const dateDiff = () => {
    if (selectedDates.length === 2) {
      const start = moment(selectedDates[0]);
      const end = moment(selectedDates[1]);
      const diff = end.diff(start, "days");

      if (diff === 0) {
        return `당일치기 일정입니다.`;
      } else return `${diff}박 ${diff + 1}일 일정입니다.`;
    } else {
      return "Please select two dates";
    }
  };
  useEffect(() => {
    if (selectedDates.length === 2) {
      const start = moment(selectedDates[0]);
      const end = moment(selectedDates[1]);
      const diff = end.diff(start, "days");
      setTdate(diff + 1);
    }
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
        <div className="my-3 text-center">
          <p>
            {moment(selectedDates[0]).format("YYYY-MM-DD")} ~{" "}
            {moment(selectedDates[1]).format("YYYY-MM-DD")}
          </p>
          {dateDiff()}
        </div>
      ) : (
        <div className="my-3 text-center">여행날짜를 선택해주세요!</div>
      )}
      <GptApiContentModal diff={Tdate} />
    </div>
  );
}

export default TravelCalendar;
