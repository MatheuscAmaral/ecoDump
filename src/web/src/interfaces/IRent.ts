export interface IRent {
  id: number;
  client: number;
  dumpster: number;
  residue: number;
  rent_date: Date;
  delivery_date: Date;
  status_id: number;
  created_by_user: number;
  updated_by_user: number;
}