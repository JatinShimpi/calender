import React, { useEffect, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "./components/ui/button";
import { Day } from "./Day";

const App = () => {
  const currentDate = new Date();
  const day: number = currentDate.getDay();
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

  return (
    <div className="flex flex-row h-screen">
      <div className="flex bg-red-200 w-1/3">siebar</div>
      <div className="flex bg-red-400 w-2/3 flex-col">
        <div className="bg-orange-300 flex flex-row">
          <div className="mx-1 my-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Select Year</Button>
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
                <Button variant="outline">Select Month</Button>
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
              events={["do laundry", "clean room"]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
