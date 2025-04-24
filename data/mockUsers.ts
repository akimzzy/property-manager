export interface User {
  name: string;
  username: string;
  email: string;
  password: string;
  role: string;
}

export const mockUsers: User[] = [
  {
    name: "Admin User",
    username: "admin",
    email: "admin@example.com",
    password: "admin123",
    role: "PROPERTY_MANAGER",
  },
  {
    name: "John Doe",
    username: "johndoe",
    email: "john.doe@example.com",
    password: "john123",
    role: "TENANT",
  },
  {
    name: "Emma Thompson",
    username: "emmat",
    email: "emma.t@example.com",
    password: "emma123",
    role: "TENANT",
  },
];
