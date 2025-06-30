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
import type { IResidues } from "@/interfaces/IResidues";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const ModalEditResidues = ({
  open,
  setOpen,
  data: residue
}: {
  open: boolean;
  data: Partial<IResidues>;
  setOpen: (open: boolean) => void;
}) => {
  const { user } = useAuth();
  const { handleSubmit, register, control } = useForm({
    defaultValues: {
      status: residue.status,
      name: residue.name,
      created_by_user: residue.created_by_user,
    }
  });

  const handleSubmitForm = async (data: Partial<IResidues>) => {
    try {
      const response = await api.put(`/residues/${residue.id}`, {
        status: data.status == "1" ? true : false,
        name: data.name,
        created_by_user: data.created_by_user,
        updated_by_user: user?.id,
      });
      
      queryClient.setQueryData(["residues"], (old: any[] = []) => {
        return old.map((item) => {
          if (item.id === response.data.id) {
            return response.data;
          }
          return item;
        });
      });
      toast.success("Resíduo editado com sucesso.");
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
            <DialogTitle>Editar Resíduo</DialogTitle>
            <DialogDescription>
              Clique em salvar quando você terminar.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 mt-3">
            <div className="grid gap-3">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                placeholder="Digite o nome do resíduo..."
                required
                {...register("name")}
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

export default ModalEditResidues;