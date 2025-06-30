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
import moment from "moment";
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
import type { IOperation } from "@/interfaces/IOperation";
import { StatusLabel } from "../StatusLabel";
import { useStatuses } from "@/hooks/useStatuses";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { ptBR } from "date-fns/locale";
import { useRef, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const ModalEditOperations = ({
  open,
  setOpen,
  data: operation,
}: {
  open: boolean;
  data: Partial<IOperation>;
  setOpen: (open: boolean) => void;
}) => {
  const { user } = useAuth();
  const { statuses } = useStatuses();
  const [deliveryDate, setDeliveryDate] = useState<Date | undefined>(operation.date || undefined);
  const dropdown = useRef<React.ComponentProps<typeof Calendar>["captionLayout"]>("dropdown");
  const { handleSubmit, register, control, reset } = useForm({
    defaultValues: {
      rent_id: operation.rent_id,
      driver_name: operation.driver_name,
      operation_type: operation.operation_type,
      date: operation.date,
      location_id: operation.location_id,
      destination: operation.destination,
      comments: operation.comments,
      status_id: operation.status_id,
    },
  });

  const handleSubmitForm = async (data: Partial<IOperation>) => {
    const formattedDate = moment(data?.date, 'DD/MM/YYYY').format("YYYY-MM-DD");
    
    try {
      const response = await api.put(`/operations/${operation.id}`, {
        status_id: Number(data?.status_id || operation.status_id),
        date: formattedDate.includes("Invalid date") ? operation.date : formattedDate,
        rent_id: operation.rent_id,
        driver_name: operation.driver_name,
        operation_type: operation.operation_type,
        location_id: data.location_id,
        destination: data.destination,
        comments: data.comments,
        updated_by_user: user?.id,
      });
      
      queryClient.setQueryData(["operations"], (old: any[] = []) => {
        return old.map((item) => {
          if (item.id === response.data.id) {
            return response.data;
          }
          return item;
        });
      });
      toast.success("Operação editada com sucesso.");
      reset();
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
            <DialogTitle>Editar Operação</DialogTitle>
            <DialogDescription>
              Clique em salvar quando você terminar.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 mt-3">
            <div className="grid gap-3">
              <Label htmlFor="date">Data</Label>
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
                    name="date"
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
                      />
                    )}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="location_id">Localização</Label>
              <Input
                id="location_id"
                placeholder="Digite a localização atual da caçamba..."
                required
                {...register("location_id")}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="destination">Destino</Label>
              <Input
                id="destination"
                placeholder="Digite o novo destino."
                required
                {...register("destination")}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="comments">Comentário</Label>
              <Input
                id="comments"
                placeholder="Digite o comentário da operação."
                required
                {...register("comments")}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="status_id">Status</Label>
              <Controller
                name="status_id"
                control={control}
                render={({ field }) => (
                  <Select
                    defaultValue={String(field.value)}
                    onValueChange={field.onChange}
                    required
                  >
                    <SelectTrigger className="w-full" id="status_id">
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {statuses.map((status: any) => (
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

export default ModalEditOperations;