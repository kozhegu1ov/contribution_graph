import dayjs from "dayjs";
import "dayjs/locale/ru";
import { DatesContributions, IPrevDates } from "../types";

export const getCheckContributions = (data: DatesContributions): IPrevDates[][]  => {
  dayjs.locale("ru");
  const currentDate = dayjs();
  const prevDates: IPrevDates[] = [];
  const answer: IPrevDates[][] = [
    [],
    [],
    [],
    [],
    [],
    [],
    []
  ]

  const lastDate = currentDate.add(
    7 - currentDate.day() === 7 ? 0 : 7 - currentDate.day(),
    "day"
  );

  for (let i = 0; i < 357; i++) {
    prevDates.unshift({
      id: i+1,
      date: lastDate.subtract(i, "day").format("YYYY-MM-DD"),
      contribution: 0,
    });
  }

  for (let i = 0; i < prevDates.length; i++) {
    for (let key in data) {
      if (prevDates[i].date === key) {
        prevDates[i].contribution = data[key] as number;
      }
    }
    answer[dayjs(prevDates[i].date).day() === 0 ? 6 : dayjs(prevDates[i].date).day() - 1].push(prevDates[i])
  }

  return answer;
};
