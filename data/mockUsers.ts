export interface User {
  email: string;
  password: string;
  role: string;
}

export const mockUsers: User[] = [
  {
    email: "admin@example.com",
    password: "admin123",
    role: "PROPERTY_MANAGER",
  },
  {
    email: "john.doe@example.com",
    password: "john123",
    role: "TENANT",
  },
  {
    email: "emma.t@example.com",
    password: "emma123",
    role: "TENANT",
  },
];
