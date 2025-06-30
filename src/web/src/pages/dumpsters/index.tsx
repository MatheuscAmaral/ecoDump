import Container from "@/components/Container";
import api from "@/api";
import ModalCreateDumpsters from "@/components/modals/ModalCreateDumpsters";
import { DataTable } from "./table/dataTable";
import { columns } from "./table/columns";
import { useQuery } from '@tanstack/react-query'
import { Loading } from "@/components/Loading";
import { toast } from "sonner"

const getDumpsters = async () => {
  const response = await api.get('/dumpsters');
  return response.data;
}

const Dumpsters = () => {
  const { data, isLoading, isError } = useQuery({ queryKey: ['dumpsters'], queryFn: getDumpsters })
  if (isLoading) return <Loading />;
  if (isError) return toast.error('Erro ao buscar os dados');

  return (
    <Container> 
      <div className="flex flex-col gap-5">
       <section className="page-header">
          <h1 className="text-lg font-semibold text-gray-600 flex items-center gap-1">
            Caçambas <span className="text-sm">({data.length})</span>
          </h1>
          <ModalCreateDumpsters />
       </section>
        
        <DataTable columns={columns} data={data} />
      </div>
    </Container>
  );
};

export default Dumpsters;
