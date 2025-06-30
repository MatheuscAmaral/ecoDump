import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { AdminCSVExportButton } from "@/components/AdminCSVExportButton"
import type { IDataTable } from "@/interfaces/IDataTable"
import { statusOptions } from "@/components/StatusFilter"
import { csvColumns } from "./columns"

export function DataTable<TData, TValue>({
  columns,
  data,
}: IDataTable<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const formatCsvData = (data: any) => {
    return data.map((item: any) => ({
      // Campos da tabela operações
      codigoOperacao: item.id,
      codigoAluguel: item.rent_id,
      nomeMotorista: item.driver_name,
      tipoOperacao: item.operation_type,
      data: item.date,
      codigoLocalizacao: item.location_id,
      destino: item.destination,
      comentarios: item.comments,
      statusId: item.status_id,
      criadoPorUsuario: item.created_by_user,
      atualizadoPorUsuario: item.updated_by_user,
      // Campo location formatado
      localizacao: item.location ? 
        `${item.location.name}, ${item.location.address}, ${item.location.city}, ${item.location.state}` : 
        "",
      // Campos do rent (aluguel)
      dataAluguel: item.rent?.rent_date,
      dataEntrega: item.rent?.delivery_date,
      statusIdAluguel: statusOptions.find((status) => status.value == item?.status_id)?.label,
    }));
  };
  
  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrar pelo tipo da operação..."
          value={(table.getColumn("operation_type")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("operation_type")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="ml-auto flex gap-2">
          <AdminCSVExportButton
            data={formatCsvData(table.getFilteredRowModel().rows.map(row => row.original))}
            columns={csvColumns}
            filename="operacoes"
          />
          <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Colunas <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {(column.id === "id" && "Código") ||
                      (column.id === "rent_id" && "Código do Aluguel") ||
                      (column.id === "driver_name" && "Nome do Motorista") ||
                       (column.id === "operation_type" && "Tipo de Operação") ||
                        (column.id === "date" && "Data") ||
                         (column.id === "location" && "Localização") ||
                      (column.id === "destination" && "Destino") ||
                       (column.id === "comments" && "Comentarios") ||
                        (column.id === "status_id" && "Status")}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="text-center">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
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
                      <TableCell key={cell.id} className="text-center">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
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
                    Sem resultados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próximo
          </Button>
        </div>
      </div>
    </div>
  )
}
