import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

interface Event {
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  description: string;
  status: string;
}

interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  events: Event[];
  onAddEvent: (event: Event) => void;
  onDeleteEvent: (index: number) => void;
  onEditEvent: (index: number, newEvent: Event) => void;
  selectedDate: string; // Add selectedDate prop
}

function DayModal({
  isOpen,
  setIsOpen,
  events,
  onAddEvent,
  onDeleteEvent,
  onEditEvent,
  selectedDate,
}: Props) {
 const [newEvent, setNewEvent] = useState<Event>({
   name: "",
   date: selectedDate || "", // Ensure no null value
   startTime: "",
   endTime: "",
   description: "",
   status: "pending",
 });

 useEffect(() => {
   setNewEvent((prev) => ({
     ...prev,
     date: selectedDate || "", // Update date dynamically
   }));
 }, [selectedDate]);


  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const filteredEvents = events.filter((event) => event.date === selectedDate);

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (a.startTime < b.startTime) return -1;
    if (a.startTime > b.startTime) return 1;
    if (a.endTime < b.endTime) return -1;
    if (a.endTime > b.endTime) return 1;
    return 0;
  });

  const handleAddEvent = () => {
    onAddEvent(newEvent);
    setNewEvent({
      name: "",
      date: selectedDate, // Explicitly reset to selectedDate
      startTime: "",
      endTime: "",
      description: "",
      status: "pending",
    });
  };

  const handleDeleteEvent = (index: number) => {
    // Find the original index of the event in the original events array
    const originalIndex = events.findIndex(
      (event) =>
        event.date === selectedDate &&
        event.name === sortedEvents[index].name &&
        event.startTime === sortedEvents[index].startTime &&
        event.endTime === sortedEvents[index].endTime
    );

    if (originalIndex !== -1) {
      onDeleteEvent(originalIndex);
    }
  };



  const handleEditEvent = (index: number) => {
    if (editingEvent) {
      onEditEvent(index, editingEvent);
      setEditingIndex(null);
      setEditingEvent(null);
    }
  };

  const handleCompleteEvent = (index: number) => {
    // Find the actual event in the original array
    const originalIndex = events.findIndex(
      (event) =>
        event.date === selectedDate && event.name === sortedEvents[index].name
    );

    if (originalIndex !== -1) {
      const eventToComplete = { ...events[originalIndex], status: "completed" };
      onEditEvent(originalIndex, eventToComplete);
    }
  };


  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Events for {selectedDate}</DialogTitle>
          <DialogDescription>
            Manage your events here. Add, edit, delete, or complete events as
            needed.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {sortedEvents.map((event, index) => (
            <div key={index} className="grid grid-cols-4 items-center gap-4">
              {editingIndex === index ? (
                <>
                  <Input
                    value={editingEvent?.name || ""}
                    onChange={(e) =>
                      setEditingEvent({
                        ...editingEvent!,
                        name: e.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                  <Input
                    value={editingEvent?.startTime || ""}
                    onChange={(e) =>
                      setEditingEvent({
                        ...editingEvent!,
                        startTime: e.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                  <Input
                    value={editingEvent?.endTime || ""}
                    onChange={(e) =>
                      setEditingEvent({
                        ...editingEvent!,
                        endTime: e.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                  <Input
                    value={editingEvent?.description || ""}
                    onChange={(e) =>
                      setEditingEvent({
                        ...editingEvent!,
                        description: e.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                  <Button onClick={() => handleEditEvent(index)}>Save</Button>
                </>
              ) : (
                <>
                  <div className="col-span-3">
                    <div>{event.name}</div>
                    <div>
                      {event.startTime} - {event.endTime}
                    </div>
                    <div>{event.description}</div>
                  </div>
                  <Button
                    onClick={() => {
                      setEditingIndex(index);
                      setEditingEvent(event);
                    }}
                  >
                    Edit
                  </Button>
                  <Button onClick={() => handleDeleteEvent(index)}>
                    Delete
                  </Button>
                  {event.status !== "completed" && (
                    <Button onClick={() => handleCompleteEvent(index)}>
                      Complete
                    </Button>
                  )}
                </>
              )}
            </div>
          ))}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={newEvent.name}
              onChange={(e) =>
                setNewEvent({ ...newEvent, name: e.target.value })
              }
              className="col-span-3"
            />
            <Label htmlFor="startTime" className="text-right">
              Start Time
            </Label>
            <Input
              id="startTime"
              value={newEvent.startTime}
              onChange={(e) =>
                setNewEvent({ ...newEvent, startTime: e.target.value })
              }
              className="col-span-3"
            />
            <Label htmlFor="endTime" className="text-right">
              End Time
            </Label>
            <Input
              id="endTime"
              value={newEvent.endTime}
              onChange={(e) =>
                setNewEvent({ ...newEvent, endTime: e.target.value })
              }
              className="col-span-3"
            />
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              value={newEvent.description}
              onChange={(e) =>
                setNewEvent({ ...newEvent, description: e.target.value })
              }
              className="col-span-3"
            />
            <Button onClick={handleAddEvent}>Add Event</Button>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => setIsOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DayModal;
