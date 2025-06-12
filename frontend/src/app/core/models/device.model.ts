export interface Device {
  _id: string;
  name: string;
  type: string;
  ip: string;
  status: 'active' | 'error' | 'inactive';
  location: string;
}
