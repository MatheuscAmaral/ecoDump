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
import { Label } from "@/components/ui/label";
import { useForm, Controller } from "react-hook-form";
import { queryClient } from "@/lib/react-query";
import type { IRent } from "@/interfaces/IRent";
import { StatusLabel } from "../StatusLabel";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ptBR } from "date-fns/locale";
import { useRef, useState } from "react";
import moment from "moment";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const getStatuses = async () => {
  try {
    const response = await api.get("/statuses");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const ModalEditRent = ({
  open,
  setOpen,
  data: rent,
}: {
  open: boolean;
  data: Partial<IRent>;
  setOpen: (open: boolean) => void;
}) => {
  const { user } = useAuth();
  const [deliveryDate, setDeliveryDate] = useState<Date | undefined>(rent.delivery_date || undefined);
  const dropdown = useRef<React.ComponentProps<typeof Calendar>["captionLayout"]>("dropdown");
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      delivery_date: rent.delivery_date,
      status_id: rent.status_id,
    },
  });
  const { data: statuses } = useQuery({
    queryKey: ["statuses"],
    queryFn: getStatuses,
  });

  const handleSubmitForm = async (data: Partial<IRent>) => {
    try {
      const formattedDeliveryDate = moment(data.delivery_date, "DD/MM/YYYY").format("YYYY-MM-DD");
      const response = await api.put(`/rents/${rent.id}`, {
        status_id: data.status_id,
        delivery_date: formattedDeliveryDate.includes("Invalid date") ? rent.delivery_date : formattedDeliveryDate,
        updated_by_user: user?.id,
      });

      queryClient.setQueryData(["rents"], (old: any[] = []) => {
        return old.map((item) => {
          if (item.id === response.data.id) {
            return {
              ...item,
              ...response.data,
            };
          }
          return item;
        });
      });
      toast.success("Aluguel editado com sucesso.");
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
            <DialogTitle>Editar Aluguel</DialogTitle>
            <DialogDescription>
              Clique em salvar quando você terminar.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 mt-3">
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
                    defaultValue={String(field.value)}
                    value={String(field.value)}
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

export default ModalEditRent;
