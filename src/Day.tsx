import { Card, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  day: number;
  events: string[];
}

export function Day({ day, events }: Props) {
  return (
    <Card className="w-28 h-28 mx-2 my-2">
      <CardHeader>
        <CardTitle className="mx-auto">{day}</CardTitle>
      </CardHeader>

      <div className="text-sm">{events.length === 0 ? " " : events[0]}</div>
      <div className="text-sm">{events.length === 0 ? " " : events[1]}</div>
    </Card>
  );
}
