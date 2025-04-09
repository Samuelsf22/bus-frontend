import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { BusTable } from "./BusTable";
import { BusColumns } from "./BusColumns";

export default function BusPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Bus List</CardTitle>
          <CardDescription>
            This is the list of all buses in the system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BusTable columns={BusColumns} />
        </CardContent>
      </Card>
    </div>
  );
}
