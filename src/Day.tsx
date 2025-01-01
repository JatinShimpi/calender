import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { MouseEventHandler } from "react";

interface Props {
  day: number;
  events: {
    name: string;
    date: string;
    endTime: string;
    startTime: string;
    description: string;
    status: string;
  }[];
  month: string;
  year: number;
  onClick: MouseEventHandler<HTMLDivElement>;
  currDay: number;
  selectedMonth: number;
  currMonth: number;
}

export function Day({
  currDay,
  selectedMonth,
  day,
  events,
  currMonth,
  year,
  onClick,
  setModalDate,
}: Props) {
  const formattedMonth = (currMonth + 1).toString().padStart(2, "0");
  const formattedDay = day.toString().padStart(2, "0");

  const currentDate = `${year}-${formattedMonth}-${formattedDay}`;

  const formattedSelectedMonth = (selectedMonth + 1).toString().padStart(2, "0");
  const selecteddate = `${year}-${formattedSelectedMonth}-${formattedDay}`;

  // console.log(currentDate);

  const matchingEvents = events.filter((event) => event.date === currentDate);

  const handleClick = () => {
    setModalDate(selecteddate); // Set the modal date to the current date
    onClick();
  };

  return (
    <Card className="w-32 h-28 mx-2 my-2" onClick={handleClick}>
      <div className="ml-2 mt-2">
        <CardTitle className="mx-auto">
          {day === currDay && selectedMonth === currMonth ? (
            <div className="rounded-full bg-slate-500 w-5 h-5 flex flex-row justify-center items-center text-slate-200">
              {day}
            </div>
          ) : (
            day
          )}
        </CardTitle>
      </div>

      {currMonth === selectedMonth ? (
        <div className="text-sm">
          {matchingEvents.length === 0
            ? ""
            : matchingEvents.map((event, index) => (
                <div
                  key={index}
                  className={`text-slate-200 ${
                    event.status === "completed"
                      ? "bg-green-800"
                      : " bg-red-600"
                  } rounded mx-2 my-0.5 p-1`}
                >
                  {event.name}
                </div>
              ))}
        </div>
      ) : null}
    </Card>
  );
}
