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
import MaskedInput from "../inputs/InputMask";
import api from "@/api";

const ModalCreateLocations = () => {
  const { handleSubmit, register, control, reset } = useForm({
    defaultValues: {
      status: true,
      name: "",
      address: "",
      address_number: "",
      zip_code: "",
      city: "",
      state: "",
    },
  });
  const [open, setOpen] = useState(false);

  const handleSubmitForm = async (data: any) => {
    try {
      const response = await api.post("/locations", {
        status: data.status == "1" ? true : false,
        name: data.name,
        address: data.address,
        address_number: data.address_number,
        zip_code: data.zip_code,
        city: data.city,
        state: data.state,
        created_at: new Date(),
        updated_at: new Date(),
      });

      queryClient.setQueryData(["locations"], (old: any[] = []) => {
        return [...old, response.data];
      });
      reset();
      toast.success("Localização criada com sucesso");
      setOpen(false);
    } catch (error) {
      toast.error("Erro ao criar a localização");
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
            <DialogTitle>Criar Localização</DialogTitle>
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
              <Label htmlFor="postal_code">CEP</Label>
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

export default ModalCreateLocations;
