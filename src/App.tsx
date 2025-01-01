import { useEffect, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import { Button } from "./components/ui/button";
import { Day } from "./Day";
import DayModal from "./DayModal";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Separator } from "./components/ui/separator";

const App = () => {
  const currentDate = new Date();
  const currDay: number = currentDate.getDate();
  const currMonth: number = currentDate.getMonth();
  const currYear: number = currentDate.getFullYear();

  function getDaysInMonthStatic(year:number, month:number) {
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

  const [events, setEvents] = useState<Event[]>([
    // {
    //   name: "Team Meeting",
    //   date: "2025-01-01", // Use ISO 8601 format for easy parsing and sorting
    //   startTime: "10:00",
    //   endTime: "11:00",
    //   description: "Discuss project updates",
    //   status: "pending",
    // },
    // {
    //   name: "Doctor Appointment",
    //   date: "2025-01-01",
    //   startTime: "15:00",
    //   endTime: "15:30",
    //   description: "Annual check-up",
    //   status: "completed",
    // },
    // {
    //   name: "Lunch with Sarah",
    //   date: "2025-01-02",
    //   startTime: "12:00",
    //   endTime: "13:00",
    //   description: "Catch up over lunch",
    //   status: "pending",
    // },
    // {
    //   name: "Gym Session",
    //   date: "2025-01-03",
    //   startTime: "18:00",
    //   endTime: "19:00",
    //   description: "Workout session",
    //   status: "completed",
    // },
    // {
    //   name: "Project Deadline",
    //   date: "2025-01-04",
    //   startTime: "09:00",
    //   endTime: "17:00",
    //   description: "Submit project deliverables",
    //   status: "pending",
    // },
    // {
    //   name: "Conference Call",
    //   date: "2025-01-05",
    //   startTime: "14:00",
    //   endTime: "15:00",
    //   description: "Discuss Q1 targets",
    //   status: "completed",
    // },
    // {
    //   name: "Dinner with Family",
    //   date: "2025-01-06",
    //   startTime: "19:00",
    //   endTime: "21:00",
    //   description: "Family dinner at home",
    //   status: "pending",
    // },
    // {
    //   name: "Client Presentation",
    //   date: "2025-01-07",
    //   startTime: "11:00",
    //   endTime: "12:00",
    //   description: "Present project progress",
    //   status: "completed",
    // },
    // {
    //   name: "Yoga Class",
    //   date: "2025-01-08",
    //   startTime: "07:00",
    //   endTime: "08:00",
    //   description: "Morning yoga session",
    //   status: "pending",
    // },
    // {
    //   name: "Team Outing",
    //   date: "2025-01-09",
    //   startTime: "16:00",
    //   endTime: "20:00",
    //   description: "Team building activities",
    //   status: "completed",
    // },
  ]);
  console.log(events);

  useEffect(() => {
    const storedEvents = localStorage.getItem("events");
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  useEffect(() => {
    // Avoid saving to localStorage during the initial load
    if (events.length > 0) {
      localStorage.setItem("events", JSON.stringify(events));
    }
  }, [events]);

  const [isOpen, setIsOpen] = useState(false);

  const [modalDate, setModalDate] = useState<string | null>(null);

  interface Event {
    name: string;
    date: string;
    startTime: string;
    endTime: string;
    description: string;
    status: string;
  }

  const addEvent = (event: Event) => {
    setEvents((prevEvents) => [...prevEvents, event]);
  };

  const deleteEvent = (index: number) => {
    setEvents((prevEvents) => prevEvents.filter((_, i) => i !== index));
  };

  const editEvent = (index: number, newEvent: Event) => {
    setEvents((prevEvents) =>
      prevEvents.map((event, i) => (i === index ? newEvent : event))
    );
  };

  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="flex flex-row h-screen">
      <div className="flex bg-gray-700 w-1/3 flex-col p-4">
        <Card>
          <CardHeader>
            <CardTitle>Events Sorted by Date</CardTitle>
            <CardDescription>
              List of events sorted chronologically
            </CardDescription>
          </CardHeader>
          <CardContent>
            {sortedEvents.map((event, index) => (
              <div key={index} className="mb-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-700">
                    {event.date}
                  </span>
                  <span>{event.name}</span>
                </div>
                <Separator className="my-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      <div className="flex bg-gray-900 w-2/3 flex-col">
        <div className="bg-slate-800 flex flex-row justify-between">

          <div className="flex flex-row my-2 ml-2">
            <div className="">
              <Button
                variant="outline"
                className="mr-1"
                onClick={() => setMonth((prev) => (prev === 0 ? 11 : prev - 1))}
              >
                Prev
              </Button>
            </div>
            <div className="mx-1">
              <Button
                variant="outline"
                className="mr-1"
                onClick={() => setMonth((prev) => (prev === 11 ? 0 : prev + 1))}
              >
                Next
              </Button>
            </div>
          </div>

          <div className="flex flex-row mr-2">
            <div className="mx-2 my-2">
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

            <div className="my-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">{months[month]}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-15 dropdown-menu-content">
                  {months.map((monthName, index) => (
                    <DropdownMenuItem
                      key={index}
                      onClick={() => setMonth(index)}
                    >
                      {monthName}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
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
              setModalDate={setModalDate}
            />
          ))}
        </div>
        <DayModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          events={events}
          selectedDate={modalDate}
          onEditEvent={editEvent}
          onAddEvent={addEvent}
          onDeleteEvent={deleteEvent}
        />
      </div>
    </div>
  );
};

export default App;
