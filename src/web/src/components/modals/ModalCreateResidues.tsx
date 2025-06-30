import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { useState } from "react";
import { queryClient } from "@/lib/react-query";
import { toast } from "sonner";
import type { IResidues } from "@/interfaces/IResidues";
import { useAuth } from "@/hooks/useAuth";
import api from "@/api";

const ModalCreateResidues = () => {
  const { user } = useAuth();
  const { handleSubmit, register, control, reset } = useForm({
    defaultValues: {
      status: true,
      name: "",
    },
  });
  const [open, setOpen] = useState(false);

  const handleSubmitForm = async (data: Partial<IResidues>) => {
    try {
      const response = await api.post("/residues", {
        status: data.status == "1" ? true : false,
        name: data.name,
        created_by_user: user?.id,
        updated_by_user: user?.id,
      });

      queryClient.setQueryData(["residues"], (old: any[] = []) => {
        return [...old, response.data];
      });
      reset();
      toast.success("Resíduo criado com sucesso");
      setOpen(false);
    } catch (error) {
      toast.error("Erro ao criar o resíduo");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="bg-green-600 hover:bg-green-800 text-white hover:text-white"
          variant="outline"
          onClick={() => setOpen(true)}
        >
          Criar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <DialogHeader>
            <DialogTitle>Criar Resíduo</DialogTitle>
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

export default ModalCreateResidues;
