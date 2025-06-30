import { useState } from 'react';
import { toast } from 'sonner';
import type { ColumnDef } from '@tanstack/react-table';
import { exportToCSV, generateFilename } from '@/utils/csvExport';

interface UseCSVExportProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  filename?: string;
}

interface UseCSVExportReturn {
  isExporting: boolean;
  exportData: () => void;
}

/**
 * Custom hook for CSV export functionality
 */
export const useCSVExport = <TData,>({
  data,
  columns,
  filename = 'export'
}: UseCSVExportProps<TData>): UseCSVExportReturn => {
  const [isExporting, setIsExporting] = useState(false);

  const exportData = async () => {
    if (!data || data.length === 0) {
      toast.error('Nenhum dado disponível para exportar');
      return;
    }

    setIsExporting(true);

    try {
      // Generate filename with timestamp
      const csvFilename = generateFilename(filename);
      
      // Export to CSV
      exportToCSV(data, columns, csvFilename);
      
      // Show success message
      toast.success(`Arquivo ${csvFilename} baixado com sucesso!`);
    } catch (error) {
      console.error('Erro ao exportar CSV:', error);
      toast.error('Erro ao exportar dados. Tente novamente.');
    } finally {
      setIsExporting(false);
    }
  };

  return {
    isExporting,
    exportData
  };
};
