import ModalCreateClients from "@/components/modals/ModalCreateClients";
import Container from "@/components/Container";
import api from "@/api";
import { DataTable } from "./table/dataTable";
import { columns } from "./table/columns";
import { useQuery } from '@tanstack/react-query'
import { Loading } from "@/components/Loading";
import { toast } from "sonner"

const getClients = async () => {
  const response = await api.get('/clients');
  return response.data;
}

const Clients = () => {
  const { data, isLoading, isError } = useQuery({ queryKey: ['clients'], queryFn: getClients })
  if (isLoading) return <Loading />;
  if (isError) return toast.error('Erro ao buscar os dados');

  return (
    <Container> 
      <div className="flex flex-col gap-5">
       <section className="page-header">
          <h1 className="text-lg font-semibold text-gray-600 flex items-center gap-1">
            Clientes <span className="text-sm">({data.length})</span>
          </h1>
          <ModalCreateClients />
       </section>
        
        <DataTable columns={columns} data={data} />
      </div>
    </Container>
  );
};

export default Clients;
