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
import api from "@/api";
import { queryClient } from "@/lib/react-query";
import type { IDumpsters } from "@/interfaces/IDumpsters";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { useLocations } from "@/hooks/useLocations";
import type { ILocations } from "@/interfaces/ILocations";

const ModalCreateDumpsters = () => {
  const { user } = useAuth();
  const { locations } = useLocations();
  const { handleSubmit, register, control, reset } = useForm({
    defaultValues: {
      status: true,
      identifier_number: "",
      current_location: "",
    },
  });
  const [open, setOpen] = useState(false);

  const handleSubmitForm = async (data: Partial<IDumpsters>) => {
    try {
      const response = await api.post("/dumpsters", {
        status: data.status == "1" ? true : false,
        identifier_number: data.identifier_number,
        current_location: Number(data.current_location),
        created_by_user: user?.id,
        updated_by_user: user?.id,
      });

      queryClient.setQueryData(["dumpsters"], (old: any[] = []) => {
        return [...old, response.data];
      });
      reset();
      toast.success("Caçamba criada com sucesso"); 
      setOpen(false);
    } catch (error) {
      toast.error("Erro ao criar a caçamba");
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
            <DialogTitle>Criar Caçamba</DialogTitle>
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
              <Controller
                name="current_location"
                control={control}
                render={({ field }) => {
                  return (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      required
                    >
                      <SelectTrigger className="w-full" id="current_location">
                        <SelectValue placeholder="Selecione a Localização" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {locations?.map((location: ILocations) => (
                            <SelectItem
                              key={location.id}
                              value={String(location.id)}
                            >
                              {location.name} - {location.address} - {location.zip_code}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  );
                }}
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

export default ModalCreateDumpsters;
