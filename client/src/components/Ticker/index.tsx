import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./index.css";

const socket = io("http://localhost:3000");

interface IRace {
  name: string;
  date: number;
}

const Ticker = () => {
  const [races, setRaces] = useState<IRace[]>([]);
  useEffect(() => {
    socket.on("raceCreated", (race: IRace) => {
      setRaces((prev) => [race, ...prev]);
    });
    return () => {
      socket.off("raceCreated");
    };
  }, []);

  return (
    <div className="ticker">
      {races.map((race) => {
        const date = new Date(race.date);
        return (
          <p className="race" key={race.date}>
            {date.toLocaleDateString()} {date.toLocaleTimeString()} {race.name}
          </p>
        );
      })}
    </div>
  );
};

export default Ticker;
