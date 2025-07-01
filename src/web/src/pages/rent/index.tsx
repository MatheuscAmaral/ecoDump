import Container from "@/components/Container"
import { DataTable } from "./table/dataTable"
import { columns } from "./table/columns"
import { useQuery } from "@tanstack/react-query"
import { toast } from "sonner"
import api from "@/api"
import { Loading } from "@/components/Loading"
import ModalCreateRents from "@/components/modals/ModalCreateRents"
import { StatusFilter } from "@/components/StatusFilter"
import { useState } from "react"

const getRents = async (status?: string) => {
  const params = status ? `?status=${status}` : ""
  const response = await api.get(`/rents${params}`)
  return response.data
}

const Rent = () => {  
  const [statusFilter, setStatusFilter] = useState("1") // Default to active

  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["rents", statusFilter],
    queryFn: () => getRents(statusFilter),
  })

  const handleStatusChange = (newStatus: string) => {
    setStatusFilter(newStatus)
  }

  if (isLoading) return <Loading />
  if (isError) {
    toast.error("Erro ao buscar os aluguéis")
    return null
  }

  return (
    <Container>
      <div className="flex flex-col gap-5">
        <section className="page-header">
          <div className="flex items-center justify-between w-full">
            <h1 className="text-lg font-semibold text-gray-600">
              Alugueis
            </h1>

            <div className="flex items-center gap-4">
              <StatusFilter 
                value={statusFilter}
                onValueChange={handleStatusChange}
                totalCount={data.length}
              />
              <ModalCreateRents />
            </div>
          </div>
        </section>

        <DataTable columns={columns} data={data} />
      </div>
    </Container>
  )
}
export default Rent;
