import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface StatusFilterProps {
  value: string
  onValueChange: (value: string) => void
  showCount?: boolean
  totalCount?: number
}

export const statusOptions = [
  { value: "1", label: "Ativo", color: "text-green-600" },
  { value: "2", label: "Inativo", color: "text-gray-600" },
  { value: "3", label: "Pendente", color: "text-yellow-600" },
  { value: "4", label: "Concluído", color: "text-blue-600" },
  { value: "5", label: "Cancelado", color: "text-red-600" },
  { value: "all", label: "Todos", color: "text-purple-600" },
]

export function StatusFilter({ value, onValueChange, showCount = true, totalCount = 0 }: StatusFilterProps) {
  const selectedStatus = statusOptions.find(option => option.value === value)

  return (
    <div className="flex items-center gap-3">
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filtrar por status">
            {selectedStatus && (
              <span className={`font-medium ${selectedStatus.color}`}>
                {selectedStatus.label}
              </span>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {statusOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              <span className={`font-medium ${option.color}`}>
                {option.label}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {showCount && (
        <span className="text-sm text-gray-500">
          ({totalCount} {totalCount === 1 ? 'registro' : 'registros'})
        </span>
      )}
    </div>
  )
}
