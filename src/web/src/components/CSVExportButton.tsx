import { Download, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCSVExport } from '@/hooks/useCSVExport';
import type { ColumnDef } from '@tanstack/react-table';

interface CSVExportButtonProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  filename?: string;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
}

/**
 * Reusable CSV Export Button Component
 */
export function CSVExportButton<TData>({
  data,
  columns,
  filename = 'export',
  variant = 'outline',
  // size = 'sm',
  className = ''
}: CSVExportButtonProps<TData>) {
  const { isExporting, exportData } = useCSVExport({
    data,
    columns,
    filename
  });

  return (
    <Button
      variant={variant}
      // size={size}
      onClick={exportData}
      disabled={isExporting || !data || data.length === 0}
      className={className}
    >
      {isExporting ? (
        <>
          <Loader className="mr-2 h-4 w-4 animate-spin" />
          Exportando...
        </>
      ) : (
        <>
          <Download className="mr-2 h-4 w-4" />
          Exportar CSV
        </>
      )}
    </Button>
  );
}
