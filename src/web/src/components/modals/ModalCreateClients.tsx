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
import { toast } from "sonner";
import MaskedInput from "../inputs/InputMask";
import { useAuth } from "@/hooks/useAuth";

const ModalCreateClients = () => {
  const { user } = useAuth();
  const { handleSubmit, register, control, reset } = useForm({
    defaultValues: {
      status: true,
      name: "",
      phone: "",
      cpf_cnpj: "",
      address: "",
      adress_number: "",
      postal_code: ""
    },
  });
  const [open, setOpen] = useState(false);
  console.log(user, 'user')

  const handleSubmitForm = async (data: any) => {
    try {
      const response = await api.post("/clients", {
        status: data.status == "1" ? true : false,
        name: data.name,
        phone: data.phone,
        cpf_cnpj: data.cpf_cnpj,
        address: data.address,
        adress_number: data.adress_number,
        postal_code: data.postal_code,
        created_by_user: user?.id,
        updated_by_user: user?.id,
      });

      queryClient.setQueryData(["clients"], (old: any[] = []) => {
        return [...old, response.data];
      });
      reset();
      toast.success("Cliente criada com sucesso");
      setOpen(false);
    } catch (error) {
      toast.error("Erro ao criar a cliente");
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
            <DialogTitle>Criar Cliente</DialogTitle>
            <DialogDescription>
              Clique em salvar quando você terminar.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 mt-3">
            <div className="grid gap-3">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                placeholder="Digite o nome do cliente..."
                required
                {...register("name")}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="phone">Telefone</Label>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                    <MaskedInput
                      mask={"(00) 00000-0000"}
                      value={field.value || ""}
                      onChange={(value) => field.onChange(value)}
                      placeholder="Digite o telefone do cliente..."
                    />
                )}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="cpf_cnpj">CPF/CNPJ</Label>
              <Controller
                name="cpf_cnpj"
                control={control}
                render={({ field }) => {
                  return (
                    <MaskedInput
                      mask={field.value?.length > 14 ? "00.000.000/0000-000" : "000.000.000-00"}
                      value={field.value || ""}
                      onChange={(value) => field.onChange(value)}
                      placeholder="Digite o CPF/CNPJ do cliente..."
                    />
                  )
                }}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="address">Endereço</Label>
              <Input
                id="address"
                placeholder="Digite o endereço do cliente..."
                required
                {...register("address")}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="adress_number">Número</Label>
              <Input
                id="adress_number"
                placeholder="Digite o número do endereço..."
                required
                {...register("adress_number")}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="postal_code">CEP</Label>
              <Controller
                name="postal_code"
                control={control}
                render={({ field }) => (
                  <MaskedInput
                    mask="00.000-000"
                    value={field.value || ""}
                    onChange={(value) => field.onChange(value)}
                    placeholder="Digite o CEP do cliente..."
                  />
                )}
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

export default ModalCreateClients;
