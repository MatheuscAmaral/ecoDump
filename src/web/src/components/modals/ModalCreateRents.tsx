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
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { useForm, Controller } from "react-hook-form";
import { useMemo, useRef, useState } from "react";
import api from "@/api";
import { queryClient } from "@/lib/react-query";
import { toast } from "sonner";
import type { IRent } from "@/interfaces/IRent";
import { useQuery } from "@tanstack/react-query";
import { StatusLabel } from "../StatusLabel";
import { ptBR } from "date-fns/locale";
import { Input } from "../ui/input";
import { useStatuses } from "@/hooks/useStatuses";
import { useAuth } from "@/hooks/useAuth";
import moment from "moment";
import type { IClients } from "@/interfaces/IClients";
import type { IResidues } from "@/interfaces/IResidues";
import type { IDumpsters } from "@/interfaces/IDumpsters";
import { useLocations } from "@/hooks/useLocations";

const getModalData = async () => {
  const response = await api.get("/rents/create");
  return response.data;
};

const ModalCreateRents = () => {
  const { user } = useAuth();
  const { handleSubmit, register, control, reset, getValues, watch, setValue } =
    useForm();
  const [rentDate, setRentDate] = useState<Date>();
  const dropdown =
    useRef<React.ComponentProps<typeof Calendar>["captionLayout"]>("dropdown");
  const [deliveryDate, setDeliveryDate] = useState<Date>();
  const { data } = useQuery({
    queryKey: ["createRent"],
    queryFn: getModalData,
  });
  const { statuses } = useStatuses();
  const { locations } = useLocations();

  const [open, setOpen] = useState(false);

  const handleSubmitForm = async (data: Partial<IRent>) => {
    try {
      const formmattedRentDate = moment(data?.rent_date, "DD/MM/YYYY").format(
        "YYYY-MM-DD"
      );
      const formmattedDeliveryDate = moment(
        data?.delivery_date,
        "DD/MM/YYYY"
      ).format("YYYY-MM-DD");
      const response = await api.post("/rents", {
        ...data,
        delivery_date: formmattedDeliveryDate,
        rent_date: formmattedRentDate,
        created_by_user: user?.id,
        updated_by_user: user?.id,
      });

      queryClient.setQueryData(["rents"], (old: any[] = []) => {
        return [...old, { ...data, ...response.data}];
      });

      reset();
      setRentDate(undefined);
      setDeliveryDate(undefined);
      toast.success("Aluguel criada com sucesso");
      setOpen(false);
    } catch (error) {
      console.error(error, 'Erro ao criar o aluguel');
      toast.error("Erro ao criar o aluguel");
    }
  };

  useMemo(() => {
    const client = data?.clients?.find(
      (client: IClients) => client.id === Number(getValues("client_id"))
    );
    setValue("client", client?.name);
  }, [watch("client_id")]);

  useMemo(() => {
    const dumpster = data?.dumpsters?.find(
      (dumpster: IDumpsters) => dumpster.id === Number(getValues("dumpster_id"))
    );
    setValue("dumpster", dumpster?.identifier_number);
  }, [watch("dumpster_id")]);

  useMemo(() => {
    const residue = data?.residues?.find(
      (residue: IResidues) => residue.id === Number(getValues("residue_id"))
    );
    setValue("residue", residue?.name);
  }, [watch("residue_id")]);

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
      <DialogContent className="sm:max-w-[1000px]">
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <DialogHeader>
            <DialogTitle>Criar Aluguel</DialogTitle>
            <DialogDescription>
              Clique em salvar quando você terminar.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col lg:flex-row gap-10 py-3">
            <section className="grid gap-5 mt-3 w-full">
              <div className="grid gap-3">
                <Label htmlFor="client_id">Cliente</Label>
                <Controller
                  name="client_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      required
                    >
                      <SelectTrigger className="w-full" id="client_id">
                        <SelectValue placeholder="Selecione o cliente" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {data?.clients.map((client: any) => (
                            <SelectItem
                              key={String(client.id)}
                              value={String(client.id)}
                            >
                              {client.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="dumpster_id">Caçamba</Label>
                <Controller
                  name="dumpster_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      required
                    >
                      <SelectTrigger className="w-full" id="dumpster_id">
                        <SelectValue placeholder="Selecione a caçamba" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {data?.dumpsters.map((dumpster: any) => (
                            <SelectItem
                              key={String(dumpster.id)}
                              value={String(dumpster.id)}
                            >
                              {dumpster.identifier_number}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="residue_id">Resíduo</Label>
                <Controller
                  name="residue_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      required
                    >
                      <SelectTrigger className="w-full" id="residue_id">
                        <SelectValue placeholder="Selecione o resíduo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {data?.residues.map((residue: any) => (
                            <SelectItem
                              key={String(residue.id)}
                              value={String(residue.id)}
                            >
                              {residue.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="rent_date">Data de locação</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      data-empty={!rentDate}
                      className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon />
                      {rentDate ? (
                        format(rentDate, "PPP")
                      ) : (
                        <span>Selecione uma data</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Controller
                      name="rent_date"
                      control={control}
                      render={({ field }) => (
                        <Calendar
                          mode="single"
                          defaultMonth={rentDate}
                          selected={field.value ?? rentDate}
                          onSelect={(date) => {
                            setRentDate(date);
                            field.onChange(
                              date ? format(date, "dd/MM/yyyy") : ""
                            );
                          }}
                          captionLayout={dropdown.current}
                          className="rounded-lg border shadow-sm"
                          locale={ptBR}
                          required
                        />
                      )}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="delivery_date">Data de entrega</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      data-empty={!deliveryDate}
                      className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon />
                      {deliveryDate ? (
                        format(deliveryDate, "PPP")
                      ) : (
                        <span>Selecione uma data</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Controller
                      name="delivery_date"
                      control={control}
                      render={({ field }) => (
                        <Calendar
                          mode="single"
                          defaultMonth={deliveryDate}
                          selected={field.value || deliveryDate}
                          onSelect={(date) => {
                            setDeliveryDate(date);
                            field.onChange(
                              date ? format(date, "dd/MM/yyyy") : ""
                            );
                          }}
                          captionLayout={dropdown.current}
                          className="rounded-lg border shadow-sm"
                          locale={ptBR}
                          required
                        />
                      )}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="status_id">Status</Label>
                <Controller
                  name="status_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      required
                    >
                      <SelectTrigger className="w-full" id="status_id">
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {statuses?.map((status: any) => (
                            <SelectItem
                              key={String(status.id)}
                              value={String(status.id)}
                            >
                              <StatusLabel status={status.code} />
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </section>
            <div className="w-px bg-gray-300 self-stretch mt-10 hidden xl:block"></div>
            <section className="grid gap-5 mt-3 w-full">
              <div className="grid gap-3">
                <Label htmlFor="client_id">Motorista</Label>
                <Input
                  placeholder="Digite o nome do motorista"
                  {...register("driver_name")}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="operation_type">Tipo da operação</Label>
                <Input
                  placeholder="Digite o tipo da operação"
                  {...register("operation_type")}
                />
              </div>
               <div className="grid gap-3">
                <Label htmlFor="location">Localização</Label>
                <Controller
                  name="location_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      required
                    >
                      <SelectTrigger className="w-full" id="location_id">
                        <SelectValue placeholder="Selecione a localização" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {locations?.map((location: any) => (
                            <SelectItem
                              key={String(location.id)}
                              value={String(location.id)}
                            >
                              {location.name} - {location.address} - {location.zip_code}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="destination">Destino</Label>
                <Input
                  placeholder="Digite o endereço de destino"
                  {...register("destination")}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="comments">Comentários</Label>
                <Input
                  placeholder="Digite algum comentário sobre o aluguel..."
                  {...register("comments")}
                />
              </div>
            </section>
              <Input {...register("client")} type="hidden" />
              <Input {...register("dumpster")} type="hidden" />
              <Input {...register("residue")} type="hidden" />
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

export default ModalCreateRents;
