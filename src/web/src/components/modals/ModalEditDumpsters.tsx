import api from "@/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, Controller } from "react-hook-form";
import { queryClient } from "@/lib/react-query";
import type { IDumpsters } from "@/interfaces/IDumpsters";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const ModalEditDumpsters = ({
  open,
  setOpen,
  data: dumpster
}: {
  open: boolean;
  data: IDumpsters;
  setOpen: (open: boolean) => void;
}) => {
  const { user } = useAuth();
  const { handleSubmit, register, control } = useForm({
    defaultValues: {
      status: dumpster.status,
      identifier_number: dumpster.identifier_number,
      current_location: dumpster.current_location,
      created_by_user: dumpster.created_by_user,
    }
  });

  const handleSubmitForm = async (data: Partial<IDumpsters>) => {
    try {
      const response = await api.put(`/dumpsters/${dumpster.id}`, {
        status: data.status == "1" ? true : false,
        identifier_number: data.identifier_number,
        current_location: data.current_location,
        created_by_user: data.created_by_user,
        updated_by_user: user?.id,
      });
      
      queryClient.setQueryData(["dumpsters"], (old: any[] = []) => {
        return old.map((item) => {
          if (item.id === response.data.id) {
            return response.data;
          }
          return item;
        });
      });
      toast.success("Caçamba editada com sucesso.");
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <DialogHeader>
            <DialogTitle>Editar Caçamba</DialogTitle>
            <DialogDescription>
              Clique em salvar quando você terminar.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 mt-3">
            <div className="grid gap-3">
              <Label htmlFor="identifier_number">Identificador</Label>
              <Input
                id="identifier_number"
                placeholder="Digite o identificador da caçamba..."
                required
                {...register("identifier_number")}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="current_location">Localização</Label>
              <Input
                id="current_location"
                placeholder="Digite a localização atual da caçamba..."
                required
                {...register("current_location")}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="status">Status</Label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    defaultValue={field.value == true ? "1" : "0"}
                    onValueChange={field.onChange}
                    required
                  >
                    <SelectTrigger className="w-full" id="status">
                      <SelectValue placeholder="Selecione o Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="1">Ativo</SelectItem>
                        <SelectItem value="0">Inativo</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ModalEditDumpsters;