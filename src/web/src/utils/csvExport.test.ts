/**
 * CSV Export Tests
 * Simple tests to verify CSV export functionality
 */

import { convertToCSV } from './csvExport';
import type { ColumnDef } from '@tanstack/react-table';

// Mock data for testing
interface TestData {
  id: number;
  name: string;
  status: boolean;
  date: Date;
}

const mockData: TestData[] = [
  { id: 1, name: 'Test Item 1', status: true, date: new Date('2025-01-01') },
  { id: 2, name: 'Test Item 2', status: false, date: new Date('2025-01-02') },
];

const mockColumns: ColumnDef<TestData>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'name', header: 'Nome' },
  { accessorKey: 'status', header: 'Status' },
  { accessorKey: 'date', header: 'Data' },
  { id: 'actions', header: 'Ações' }, // Should be excluded
];

/**
 * Test CSV conversion
 */
export const testCSVConversion = (): boolean => {
  try {
  
    // To this (add type assertion)
    const csv = convertToCSV(mockData, mockColumns as any);
    
    // Check if CSV contains headers
    const lines = csv.split('\n');
    const headers = lines[0];
    
    // Should contain our headers but not actions
    // const expectedHeaders = '"id","name","status","date"';
    
    console.log('Generated CSV:', csv);
    console.log('Headers:', headers);
    
    // Basic validation
    if (!csv.includes('Test Item 1')) {
      throw new Error('CSV should contain test data');
    }
    
    if (csv.includes('actions')) {
      throw new Error('CSV should not contain action columns');
    }
    
    if (lines.length !== 3) { // Header + 2 data rows
      throw new Error(`Expected 3 lines, got ${lines.length}`);
    }
    
    console.log('✅ CSV Export test passed!');
    return true;
  } catch (error) {
    console.error('❌ CSV Export test failed:', error);
    return false;
  }
};

// Run test if this file is executed directly
if (typeof window !== 'undefined') {
  // Browser environment - can be called manually
  (window as any).testCSVExport = testCSVConversion;
}
