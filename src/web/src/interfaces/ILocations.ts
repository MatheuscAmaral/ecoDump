export interface ILocations {
  id: number;
  name: string;
  address: string;
  address_number: string;
  city: string;
  state: string;
  zip_code: string;
  status: string | boolean;
  created_at?: Date;
  updated_at?: Date;
}