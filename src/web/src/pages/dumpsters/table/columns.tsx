import type { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { StatusLabel, type StatusType } from "@/components/StatusLabel";
import { useState } from "react";
import ModalEditDumpsters from "@/components/modals/ModalEditDumpsters";
import { statuses } from "@/utils/status";

export type Dumpsters = {
  id: number;
  identifier_number: string;
  current_location: string;
  status: boolean;
  created_by_user: number;
  updated_by_user: number;
};

export const columns: ColumnDef<Dumpsters>[] = [
  {
    accessorKey: "id",
    
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Código
          <ArrowUpDown />
        </Button>
      )
    },
  },
  {
    accessorKey: "identifier_number",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Identificador
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("identifier_number")}</div>,
  },
  {
    accessorKey: "location",
    header: () => <div className="text-center">Localização</div>,
    cell: ({ row }) => {
      const location = row.getValue("location") as {
        name: string;
        address: string;
        city: string;
        state: string;
      };

      if (!location) return "-";

      return `${location?.name} - ${location?.address} - ${location?.city} - ${location?.state}`
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => {
      const status = statuses[row.getValue("status") as keyof typeof statuses]
      return <StatusLabel status={status as StatusType} />
    }
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const [open, setOpen] = useState(false)

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setOpen(true)}>Editar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ModalEditDumpsters
            open={open}
            setOpen={setOpen}
            data={row.original}
          /> 
        </>
      )
    },
  },
]