export type StatusType = 'active' | 'inactive' | 'pending' | 'completed' | 'canceled';

const statuses = {
  active: { label: "Ativo", color: "bg-green-500"},
  inactive: { label: "Inativo", color: "bg-red-500"},
  pending: { label: "Pendente", color: "bg-yellow-500"},
  completed: { label: "Concluído", color: "bg-blue-500"},
  canceled: { label: "Cancelado", color: "bg-gray-500"},
}

export const StatusLabel = ({ status }: { status: StatusType }) => {
  return (
    <div className="flex items-center gap-2 justify-center ">
      <span className={`w-2 h-2 rounded-full ${statuses[status]?.color}`}></span>
      <span className="text-sm">{statuses[status]?.label}</span>
    </div>
  )
}