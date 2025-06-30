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
import { statuses } from "@/utils/status";
import { formatCpfCnpj } from "@/utils/formatCpfCnpj";
import { formatPostalCode } from "@/utils/formatPostalCode";
import ModalEditClients from "@/components/modals/ModalEditClients";
import type { IClients } from "@/interfaces/IClients";

export const columns: ColumnDef<IClients>[] = [
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
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "phone",
    header: () => <div className="text-center">Telefone</div>,
    cell: ({ row }) => row.getValue("phone")
  },
  {
    accessorKey: "cpf_cnpj",
    header: () => <div className="text-center">CPF/CNPJ</div>,
    cell: ({ row }) => formatCpfCnpj(row.getValue("cpf_cnpj"))
  },
  {
    accessorKey: "address",
    header: () => <div className="text-center">Endereço</div>,
    cell: ({ row }) => row.getValue("address")
  },
  {
    accessorKey: "adress_number",
    header: () => <div className="text-center">Número</div>,
    cell: ({ row }) => row.getValue("adress_number")
  },
  {
    accessorKey: "postal_code",
    header: () => <div className="text-center">Cep</div>,
    cell: ({ row }) => formatPostalCode(row.getValue("postal_code"))
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
          <ModalEditClients
            open={open}
            setOpen={setOpen}
            data={row.original}
          /> 
        </>
      )
    },
  },
]