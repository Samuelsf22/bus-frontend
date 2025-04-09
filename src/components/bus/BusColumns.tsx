import { Bus } from "@/models/Bus";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../ui/data-table-column-header";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Eye } from "lucide-react";

export const BusColumns: ColumnDef<Bus>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
  },
  {
    accessorKey: "bus_number",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Bus Number" />
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span
        className={
          row.original.status
            ? "text-green-600"
            : "text-destructive"
        }
      >
        {row.original.status === true ? "Active" : "Inactive"}
      </span>
    ),
  },
  {
    accessorKey: "brand_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Brand Name" />
    ),
  },
  {
    accessorKey: "Actions",
    cell: function ActionsCell({ row }) {
      function showBusDetails(): void {
        toast(`Bus ${row.original.license_plate}`, {
          description: (
            <div className="space-y-1 p-2 w-full">
              <p>Id: {row.original.id}</p>
              <p>Number: {row.original.bus_number}</p>
              <p>License Plate: {row.original.license_plate}</p>
              <p>Features: {row.original.features}</p>
              <p>
                Status: {row.original.status === true ? "Active" : "Inactive"}
              </p>
              <p>Brand Name: {row.original.brand_name}</p>
            </div>
          ),
          duration: 10000,
          action: {
            label: "Close",
            onClick: () => {},
          },
        });
      }

      return (
        <Button size="icon" variant="outline" onClick={() => showBusDetails()}>
          <Eye className="size-4" />
        </Button>
      );
    },
  },
];
