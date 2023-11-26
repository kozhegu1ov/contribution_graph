import { FC, useEffect, useState } from "react";
import axios from "axios";
import { IPrevDates } from "../types";
import TableContributions from "../components/TableContributions";
import "../styles/Main.scss";
import { getCheckContributions } from "../utils/getCheckContributions";

const Main: FC = () => {
  const [data, setData] = useState<IPrevDates[][]>([[]]);

  useEffect(() => {
    axios
      .get("https://dpg.gg/test/calendar.json")
      .then((res) => {
        setData(getCheckContributions(res.data));
      })
      .catch((error) => {
        console.error(error);
        alert("Server Error!");
      });
  }, []);

  return (
    <main>
      <section className="container">
        <ul className="list-weekdays">
          <li>Пн</li>
          <li>Ср</li>
          <li>Пт</li>
        </ul>
        <TableContributions data={data} />
      </section>
    </main>
  );
};

export default Main;
