export interface IDumpsters {
  id: number;
  identifier_number: string;
  current_location: string;
  status: string | boolean;
  created_by_user: number;
  updated_by_user: number;
}