/**
 * CSV Export Utilities for DataTables
 */

import type { ColumnDef } from "@tanstack/react-table";

// Define a type that includes accessorKey
type ColumnDefWithAccessor<TData, TValue = unknown> = ColumnDef<TData, TValue> & {
  accessorKey?: string & keyof TData;
};

/**
 * Extract header text from column definition
 */
const getColumnHeader = (column: ColumnDefWithAccessor<any, any>): string => {
  if (typeof column.header === 'string') {
    return column.header;
  }
  
  // Handle function headers by using accessorKey or id as fallback
  if (column.accessorKey) {
    return String(column.accessorKey);
  }
  
  if (column.id) {
    return column.id;
  }
  
  return 'Unknown';
};

/**
 * Convert data to CSV format
 */
export const convertToCSV = <TData>(
  data: TData[],
  columns: ColumnDef<TData, any>[]
): string => {
  // Cast to ColumnDefWithAccessor internally
  const columnsWithAccessor = columns as unknown as ColumnDefWithAccessor<TData, any>[];
  
  if (!data || data.length === 0) {
    return '';
  }

  // Get visible columns that have accessorKey (exclude action columns)
  const visibleColumns = columnsWithAccessor.filter(col => 
    col.accessorKey && 
    col.id !== 'actions' &&
    !col.id?.includes('action')
  );
  
  // Create CSV headers
  const headers = visibleColumns.map(col => {
    const header = getColumnHeader(col);
    return `"${header.replace(/"/g, '""')}"`;
  });

  // Create CSV rows
  const rows = data.map(row => {
    return visibleColumns.map(col => {
      const key = col.accessorKey as keyof TData;
      let value = row[key];
      
      // Handle different data types
      if (value === null || value === undefined) {
        return '""';
      }
      
      // Handle boolean values
      if (typeof value === 'boolean') {
        return `"${value ? 'Sim' : 'Não'}"`;
      }
      
      // Handle dates
      if (value instanceof Date) {
        return `"${value.toLocaleDateString('pt-BR')}"`;
      }
      
      // Convert to string and escape quotes
      const stringValue = String(value).replace(/"/g, '""');
      return `"${stringValue}"`;
    }).join(',');
  });

  // Combine headers and rows
  return [headers.join(','), ...rows].join('\n');
};

/**
 * Download CSV file
 */
export const downloadCSV = (csvContent: string, filename: string): void => {
  // Add BOM for proper UTF-8 encoding in Excel
  const BOM = '\uFEFF';
  const csvWithBOM = BOM + csvContent;
  
  // Create blob with CSV content
  const blob = new Blob([csvWithBOM], { type: 'text/csv;charset=utf-8;' });
  
  // Create download link
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  // Trigger download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Clean up
  URL.revokeObjectURL(url);
};

/**
 * Export data to CSV and download
 */
export const exportToCSV = <TData>(
  data: TData[],
  columns: ColumnDef<TData, any>[],
  filename: string = 'export.csv'
): void => {
  try {
    const csvContent = convertToCSV(data, columns as ColumnDefWithAccessor<TData, any>[]);
    
    if (!csvContent) {
      throw new Error('Nenhum dado para exportar');
    }
    
    // Ensure filename has .csv extension
    const csvFilename = filename.endsWith('.csv') ? filename : `${filename}.csv`;
    
    downloadCSV(csvContent, csvFilename);
  } catch (error) {
    console.error('Erro ao exportar CSV:', error);
    throw error;
  }
};

/**
 * Generate filename with timestamp
 */
export const generateFilename = (baseName: string): string => {
  const now = new Date();
  const timestamp = now.toISOString().slice(0, 19).replace(/[:.]/g, '-');
  return `${baseName}_${timestamp}.csv`;
};
