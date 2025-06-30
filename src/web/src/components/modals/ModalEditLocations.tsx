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
import MaskedInput from "../inputs/InputMask";
import { toast } from "sonner";
import type { ILocations } from "@/interfaces/ILocations";

const ModalEditLocations = ({
  open,
  setOpen,
  data: location
}: {
  open: boolean;
  data: ILocations;
  setOpen: (open: boolean) => void;
}) => {
  const { handleSubmit, register, control, reset } = useForm({
    defaultValues: {
      status: location.status,
      name: location.name,
      address: location.address,
      address_number: location.address_number,
      zip_code: location.zip_code,
      city: location.city,
      state: location.state,
      updated_at: new Date(),
    },
  });

  const handleSubmitForm = async (data: Partial<ILocations>) => {
    try {
      const response = await api.put(`/locations/${location.id}`, {
        status: data.status == "1" ? true : false,
        name: data.name,
        address: data.address,
        address_number: data.address_number,
        zip_code: data.zip_code,
        city: data.city,
        state: data.state,
        updated_at: location.updated_at,
      });
      
      queryClient.setQueryData(["locations"], (old: any[] = []) => {
        return old.map((item) => {
          if (item.id === response.data.id) {
            return response.data;
          }
          return item;
        });
      });
      toast.success("Localização editada com sucesso.");
      reset();
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao editar a localização");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <DialogHeader>
            <DialogTitle>Editar Localização</DialogTitle>
            <DialogDescription>
              Clique em salvar quando você terminar.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 mt-3">
            <div className="grid gap-3">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                placeholder="Digite o nome da localização..."
                required
                {...register("name")}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="address">Endereço</Label>
              <Input
                id="address"
                placeholder="Digite o endereço da localização..."
                required
                {...register("address")}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="address_number">Número</Label>
              <Input
                id="address_number"
                placeholder="Digite o número do endereço..."
                required
                {...register("address_number")}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="zip_code">CEP</Label>
              <Controller
                name="zip_code"
                control={control}
                render={({ field }) => (
                  <MaskedInput
                    mask="00.000-000"
                    value={field.value || ""}
                    onChange={(value) => field.onChange(value)}
                    placeholder="Digite o CEP da localização..."
                  />
                )}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="city">Cidade</Label>
              <Input
                id="city"
                placeholder="Digite a cidade da localização..."
                required
                {...register("city")}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="state">Estado</Label>
              <Input
                id="state"
                placeholder="Digite o estado da localização..."
                required
                {...register("state")}
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

export default ModalEditLocations;