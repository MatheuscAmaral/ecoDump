import { CSVExportButton } from './CSVExportButton';
import { isAdmin } from '@/utils/auth';
import type { ColumnDef } from '@tanstack/react-table';

interface AdminCSVExportButtonProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  filename?: string;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
}

/**
 * CSV Export Button that only shows for admin users
 * Wraps the regular CSVExportButton with role-based access control
 */
export function AdminCSVExportButton<TData>({
  data,
  columns,
  filename = 'export',
  variant = 'outline',
  size = 'sm',
  className = ''
}: AdminCSVExportButtonProps<TData>) {
  // Only render the button if user is admin
  if (!isAdmin()) {
    return null;
  }
  console.log(data, 'data')

  return (
    <CSVExportButton
      data={data}
      columns={columns}
      filename={filename}
      variant={variant}
      size={size}
      className={className}
    />
  );
}
