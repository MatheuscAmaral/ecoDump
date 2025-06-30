import api from "@/api"
import Container from "@/components/Container"
import { DataTable } from "./table/dataTable"
import { columns } from "./table/columns"
import { useQuery } from "@tanstack/react-query"
import { Loading } from "@/components/Loading"
import { toast } from "sonner"
import { StatusFilter } from "@/components/StatusFilter"
import { useState } from "react"

const getOperations = async (status?: string) => {
  const params = status ? `?status=${status}` : ""
  const response = await api.get(`/operations${params}`)
  return response.data
}

const Operations = () => {
  const [statusFilter, setStatusFilter] = useState("1") // Default to active
  const {
    data = [],
    isLoading,
    isError
  } = useQuery({
    queryKey: ["operations", statusFilter],
    queryFn: () => getOperations(statusFilter),
  })

  const handleStatusChange = (newStatus: string) => {
    setStatusFilter(newStatus)
  }

  if (isLoading) return <Loading />
  if (isError) {
    toast.error("Erro ao buscar operações")
    return null
  }

  return (
    <Container>
      <div className="flex flex-col gap-5">
        <section className="page-header">
          <div className="flex items-center justify-between w-full">
            <h1 className="text-lg font-semibold text-gray-600">
              Operações
            </h1>
            
            <StatusFilter 
              value={statusFilter}
              onValueChange={handleStatusChange}
              totalCount={data.length}
            />
          </div>
        </section>

        <DataTable columns={columns} data={data} />
      </div>
    </Container>
  )
};

export default Operations;
