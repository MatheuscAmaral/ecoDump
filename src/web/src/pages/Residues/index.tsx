import Container from "@/components/Container";
import { DataTable } from "./table/dataTable";
import { columns } from "./table/columns";
import { useQuery } from "@tanstack/react-query";
import api from "@/api";
import { Loading } from "@/components/Loading";
import { toast } from "sonner";
import ModalCreateResidues from "@/components/modals/ModalCreateResidues";

const getResidues = async () => {
  const response = await api.get("/residues");
  return response.data;
}

const Rent = () => {
  const { data, isLoading, isError } = useQuery({ queryKey: ["residues"], queryFn: getResidues });
  if (isLoading) return <Loading />;
  if (isError) return toast.error('Erro ao buscar os dados');

  return (
    <Container>
      <div className="flex flex-col gap-5">
       <section className="page-header">
          <h1 className="text-lg font-semibold text-gray-600 flex items-center gap-1">
            Resíduos <span className="text-sm">({data.length})</span>
          </h1>

          <ModalCreateResidues />
       </section>
        
        <DataTable columns={columns} data={data} />
      </div>
    </Container>
  );
};

export default Rent;
