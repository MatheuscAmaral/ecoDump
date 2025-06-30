import type { ColumnDef } from "@tanstack/react-table"

export interface IDataTable<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
  }
  