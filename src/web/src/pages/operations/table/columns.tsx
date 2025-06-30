import type { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { StatusLabel, type StatusType } from "@/components/StatusLabel";
import { formatDate } from "@/utils/fomatDate";
import { statuses } from "@/utils/status";
import ModalEditOperations from "@/components/modals/ModalEditOperations";

export type Operations = {
  id: number;
  rent_id: number;
  driver_name: string;
  operation_type: string;
  date: Date;
  location_id: number;
  destintion: string;
  comments: string;
  status_id: number;
  created_by_user: number;
  updated_by_user: number;
};

export const csvColumns = [
  { accessorKey: "codigoOperacao", label: "Código da Operação" },
  { accessorKey: "codigoAluguel", label: "Código do Aluguel" },
  { accessorKey: "nomeMotorista", label: "Nome do Motorista" },
  { accessorKey: "tipoOperacao", label: "Tipo de Operação" },
  { accessorKey: "data", label: "Data" },
  { accessorKey: "codigoLocalizacao", label: "Código da Localização" },
  { accessorKey: "destino", label: "Destino" },
  { accessorKey: "comentarios", label: "Comentários" },
  { accessorKey: "statusId", label: "Status ID" },
  { accessorKey: "criadoPorUsuario", label: "Criado Por Usuário" },
  { accessorKey: "atualizadoPorUsuario", label: "Atualizado Por Usuário" },
  { accessorKey: "localizacao", label: "Localização Completa" },
  { accessorKey: "dataAluguel", label: "Data do Aluguel" },
  { accessorKey: "dataEntrega", label: "Data de Entrega" },
  { accessorKey: "statusIdAluguel", label: "Status do Aluguel" },
];

export const columns: ColumnDef<Operations>[] = [
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
      );
    },
  },
  {
    accessorKey: "rent_id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Código do Aluguel
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("rent_id")}</div>,
  },
  {
    accessorKey: "driver_name",
    header: () => <div className="text-center">Nome do Motorista</div>,
    cell: ({ row }) => row.getValue("driver_name"),
  },
  {
    accessorKey: "operation_type",
    header: () => <div className="text-center">Tipo de Operação</div>,
    cell: ({ row }) => row.getValue("operation_type"),
  },
  {
    accessorKey: "date",
    header: () => <div className="text-center">Data</div>,
    cell: ({ row }) => formatDate(row.getValue("date")),
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

      return `${location?.name} - ${location?.address} - ${location?.city} - ${location?.state}`;
    },
  },
  {
    accessorKey: "destination",
    header: () => <div className="text-center">Destino</div>,
    cell: ({ row }) => row.getValue("destination"),
  },
  {
    accessorKey: "comments",
    header: () => <div className="text-center">Comentarios</div>,
    cell: ({ row }) => row.getValue("comments"),
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
      );
    },
    cell: ({ row }) => {
      const status =
        statuses[row.getValue("status_id") as keyof typeof statuses];
      return <StatusLabel status={status as StatusType} />;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const [open, setOpen] = useState(false);

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
              <DropdownMenuItem onClick={() => setOpen(true)}>
                Editar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ModalEditOperations
            open={open}
            setOpen={setOpen}
            data={row.original}
          />
        </>
      );
    },
  },
];
