import { useState } from "react";
import dayjs from "dayjs";
import { IPrevDates } from "../types";
import "./TableContributions.scss";

interface IProps {
  data: IPrevDates[][];
}

const TableContributions = ({ data }: IProps) => {
  const [modalVisible, setModalVisible] = useState<number | null>(null);
  const MONTHS: string[] = [
    "Янв.",
    "Февр.",
    "Март",
    "Апр.",
    "Май",
    "Июнь",
    "Июль",
    "Авг.",
    "Сент.",
    "Окт.",
    "Нояб.",
    "Дек.",
  ];
  const filteredMonths = [];
  let prevMonth: number = dayjs().subtract(1, "year").month() + 1;

  for (let i = 0; i <= 11; i++) {
    if (!MONTHS[prevMonth]) {
      prevMonth = 0;
    }
    filteredMonths.push(MONTHS[prevMonth]);
    prevMonth++;
  }

  const checkContributions = (contribution: number): string => {
    if (contribution) {
      if (contribution >= 1 && contribution <= 9) {
        return "low-contributions";
      } else if (contribution >= 10 && contribution <= 19) {
        return "medium-contributions";
      } else if (contribution >= 20 && contribution <= 29) {
        return "high-contributions";
      } else {
        return "max-contributions";
      }
    }
    return "";
  };

  const formattedDate = (date: string): string => {
    const myDate = dayjs(date);

    const formattedDay = myDate.format('dddd');
    const formattedMonth = myDate.format('MMMM');

    const capitalFirstLetterDay = formattedDay.charAt(0).toUpperCase() + formattedDay.slice(1);
    const capitalFirstLetterMonth = formattedMonth.charAt(0).toUpperCase() + formattedMonth.slice(1);

    return `${capitalFirstLetterDay}, ${capitalFirstLetterMonth} ${myDate.format('D, YYYY')}`
  }

  return (
    <table className="table-contributions">
      <thead className="table-contributions__thead">
        <tr className="table-contributions__months">
          {filteredMonths.map((month, index) => (
            <th key={index}>{month}</th>
          ))}
        </tr>
      </thead>
      <tbody className="table-contributions__tbody">
        {data.map((dates, index) => {
          return (
            <tr key={index}>
              {dates.map((dateInfo, index) => {
                return (
                  <td
                    className={`table-contributions__tbody-cell ${checkContributions(
                      dateInfo.contribution
                    )}`}
                    onMouseEnter={() => setModalVisible(dateInfo.id)}
                    onMouseLeave={() => setModalVisible(null)}
                    key={index}
                  >
                    {modalVisible === dateInfo.id && (
                      <div className={"table-contributions__modalInfo"}>
                        <p
                          className={
                            "table-contributions__modalInfo-contribution"
                          }
                        >
                          {dateInfo.contribution} contributions
                        </p>
                        <p className={"table-contributions__modalInfo-date"}>
                            {formattedDate(dateInfo.date)}
                        </p>
                        <div
                          className={"table-contributions__modalInfo-triangle"}
                        ></div>
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableContributions;
