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
import Rent from "..";
import { StatusLabel, type StatusType } from "@/components/StatusLabel";
import { useState } from "react";
import { formatDate } from "@/utils/fomatDate";
import ModalEditRent from "@/components/modals/ModalEditRent";
import { statuses } from "@/utils/status";

export type Rent = {
  id: number;
  client: number;
  dumpster: number;
  residue: number;
  rent_date: Date;
  delivery_date:Date;
  status_id:number;
  created_by_user:number;
  updated_by_user:number;
};


export const columns: ColumnDef<Rent>[] = [
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
    accessorKey: "client",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cliente
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("client")}</div>,
  },
  {
    accessorKey: "dumpster",
    header: () => <div className="text-center">Caçamba</div>,
    cell: ({ row }) => row.getValue("dumpster")
  },
  {
    accessorKey: "residue",
    header: () => <div className="text-center">Residuo</div>,
    cell: ({ row }) => row.getValue("residue")
  },
  {
    accessorKey: "rent_date",
    header: () => <div className="text-center">Data de Locação</div>,
    cell: ({ row }) => formatDate(row.getValue("rent_date"))
  },
   {
    accessorKey: "delivery_date",
    header: () => <div className="text-center">Data da Entrega</div>,
    cell: ({ row }) => formatDate(row.getValue("delivery_date"))
  },
  {
    accessorKey: "status_id",
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
      const status = statuses[row.getValue("status_id") as keyof typeof statuses]
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
          <ModalEditRent
            open={open}
            setOpen={setOpen}
            data={row.original}
          /> 
        </>
      )
    },
  },
]