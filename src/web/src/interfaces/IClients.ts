export interface IClients {
  id: number;
  name: string;
  phone: string;
  cpf_cnpj: string;
  address: string;
  adress_number: string;
  postal_code: string;
  status: string | boolean;
  created_by_user: number;
  updated_by_user: number;
}