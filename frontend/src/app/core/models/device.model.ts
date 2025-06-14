export interface Device {
  _id: string;
  name: string;
  type: string;
  ip: string;
  status: 'active' | 'error' | 'inactive';
  location: string;
}

export interface AddDevice {
  name: string;
  type: string;
  ip: string;
  location: string;
}
