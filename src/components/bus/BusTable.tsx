"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import { useGetAllBusesQuery } from "@/redux/features/apiBus";
import { Bus } from "@/models/Bus";

interface DataTableProps {
  columns: ColumnDef<Bus>[];
}

export function BusTable({ columns }: DataTableProps) {
  const [pageIndex, setPageIndex] = useState(0);
  const { data, isError, isLoading, isSuccess } = useGetAllBusesQuery({
    page: pageIndex,
    size: 5,
  });

  const [sorting, setSorting] = useState<SortingState>([]);
  const [filtering, setFiltering] = useState<string>("");

  const table = useReactTable({
    data: data?.content || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    columnResizeMode: "onChange",
    state: {
      sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  const nextPage = () => {
    if (isSuccess && data?.number + 1 < data?.totalPages) {
      setPageIndex(data.number + 1);
    }
  };

  const previousPage = () => {
    if (isSuccess && data?.number > 0) {
      setPageIndex(data.number - 1);
    }
  };

  const getCanPreviousPage = () => isSuccess && data.number === 0;

  const getCanNextPage = () => isSuccess && data.number + 1 === data.totalPages;

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error</div>;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center gap-4">
        <Input
          type="text"
          value={filtering}
          onChange={(event) => setFiltering(event.target.value)}
          placeholder="Search..."
          className="w-80"
        />
      </div>
      <div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} width={cell.column.getSize()}>
                      <span className="line-clamp-1">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </span>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Page {data.number + 1} of {data.totalPages}
        </div>
        <div className="space-x-2">
          <Button
            variant="link"
            size="icon"
            onClick={() => previousPage()}
            disabled={getCanPreviousPage()}
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="link"
            size="icon"
            onClick={() => nextPage()}
            disabled={getCanNextPage()}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
