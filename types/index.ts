// Centralized TypeScript types and interfaces for the frontend

// Property-related types
export interface Property {
  id: number;
  title: string;
  description?: string;
  price: number;
  yearlyRent: number;
  images: string[];
  available: boolean;
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  rooms: number;
  bathrooms: number;
  toilets: number;
  features?: Feature[];
  createdAt: string;
  updatedAt: string;
  manager: ManagerAccount;
}

export interface Feature {
  key: string;
  value: string;
}

// Tenant-related types
export interface Tenant {
  id: number;
  name: string;
  email: string;
  phone: string;
  // Add more fields as needed
}

export interface MaintenanceRequest {
  id: number;
  propertyId: number;
  tenantId: number;
  description: string;
  status: string;
  // Add more fields as needed
}

// Activity, Application, User, Comment, etc. can be added here as needed
// Example:
export interface Activity {
  id: number;
  type: string;
  message: string;
  date: string;
}

export interface TenantApplication {
  id: number;
  propertyId: number;
  tenantId: number;
  status: string;
}

export interface ManagerAccount {
  id: number;
  user: User;
  createdAt: string;
  updatedAt: string;
}

export interface TenantAccount {
  id: number;
  user: User;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  managerAccount: ManagerAccount;
  tenantAccount: TenantAccount;
}

export interface Comment {
  id: number;
  userId: number;
  propertyId: number;
  content: string;
  createdAt: string;
}

// Decoded Auth
export interface DecodedToken {
  sub: string;
  email: string;
  role: string;
  exp: number;
}

export type AccessToken = {
  access_token: string;
};

// Add more shared types/interfaces as needed
