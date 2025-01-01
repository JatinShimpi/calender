import React, { useEffect, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import { Button } from "./components/ui/button";
import { Day } from "./Day";
import DayModal from "./DayModal";

const App = () => {
  const currentDate = new Date();
  const currDay: number = currentDate.getDate();
  const currMonth: number = currentDate.getMonth();
  const currYear: number = currentDate.getFullYear();

  function getDaysInMonthStatic(year, month) {
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    // Adjust for leap year
    if (
      month === 1 &&
      ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0)
    ) {
      return 29; // February in a leap year
    }
    return daysInMonth[month];
  }

  const [year, setYear] = useState(currYear);
  const [month, setMonth] = useState(currMonth);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [daysofmonth, setDaysOfMonth] = useState(
    getDaysInMonthStatic(currYear, currMonth)
  );

  useEffect(() => {
    setDaysOfMonth(getDaysInMonthStatic(year, month));
  }, [year, month]);

  const [events, setEvents] = useState([
    {
      name: "Team Meeting",
      date: "2025-01-01", // Use ISO 8601 format for easy parsing and sorting
      startTime: "10:00",
      endTime: "11:00",
      description: "Discuss project updates",
      status: "pending",
    },
    {
      name: "Doctor Appointment",
      date: "2025-01-01",
      startTime: "15:00",
      endTime: "15:30",
      description: "Annual check-up",
      status: "completed",
    },
    {
      name: "Lunch with Sarah",
      date: "2025-01-02",
      startTime: "12:00",
      endTime: "13:00",
      description: "Catch up over lunch",
      status: "pending",
    },
    {
      name: "Gym Session",
      date: "2025-01-03",
      startTime: "18:00",
      endTime: "19:00",
      description: "Workout session",
      status: "completed",
    },
    {
      name: "Project Deadline",
      date: "2025-01-04",
      startTime: "09:00",
      endTime: "17:00",
      description: "Submit project deliverables",
      status: "pending",
    },
    {
      name: "Conference Call",
      date: "2025-01-05",
      startTime: "14:00",
      endTime: "15:00",
      description: "Discuss Q1 targets",
      status: "completed",
    },
    {
      name: "Dinner with Family",
      date: "2025-01-06",
      startTime: "19:00",
      endTime: "21:00",
      description: "Family dinner at home",
      status: "pending",
    },
    {
      name: "Client Presentation",
      date: "2025-01-07",
      startTime: "11:00",
      endTime: "12:00",
      description: "Present project progress",
      status: "completed",
    },
    {
      name: "Yoga Class",
      date: "2025-01-08",
      startTime: "07:00",
      endTime: "08:00",
      description: "Morning yoga session",
      status: "pending",
    },
    {
      name: "Team Outing",
      date: "2025-01-09",
      startTime: "16:00",
      endTime: "20:00",
      description: "Team building activities",
      status: "completed",
    },
  ]);

  useEffect(() => {
    const storedEvents = localStorage.getItem("events");
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-row h-screen">
      <div className="flex bg-red-200 w-1/3">siebar</div>
      <div className="flex bg-red-400 w-2/3 flex-col">
        <div className="bg-orange-300 flex flex-row">
          <div className="mx-1 my-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">{year}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-15 dropdown-menu-content">
                {Array.from({ length: 77 }, (_, index) => (
                  <DropdownMenuItem
                    key={index}
                    onClick={() => setYear(2024 + index)}
                  >
                    {2024 + index}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="mx-1 my-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">{months[month]}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-15 dropdown-menu-content">
                {months.map((monthName, index) => (
                  <DropdownMenuItem key={index} onClick={() => setMonth(index)}>
                    {monthName}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="flex flex-wrap">
          {Array.from({ length: daysofmonth }, (_, index) => (
            <Day
              key={index + 1}
              day={index + 1}
              currMonth={currMonth}
              year={year}
              events={events}
              currDay={currDay}
              selectedMonth={month}
              onClick={() => setIsOpen(!isOpen)}
            />
          ))}
        </div>
        <DayModal isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </div>
  );
};

export default App;
