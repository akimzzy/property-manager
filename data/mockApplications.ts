export interface TenantApplication {
  id: string;
  propertyId: number;
  name: string;
  email: string;
  phone: string;
  income: number;
  message: string;
  createdAt: string;
  status: "pending" | "approved" | "rejected";
}

export const mockApplications: TenantApplication[] = [
  {
    id: "app1",
    propertyId: 3,
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "(555) 123-4567",
    income: 75000,
    message:
      "I am very interested in this property and would be a responsible, long-term tenant. I have stable employment and excellent references.",
    createdAt: "2024-01-15T10:30:00Z",
    status: "pending",
  },
  {
    id: "app2",
    propertyId: 4,
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "(555) 987-6543",
    income: 82000,
    message:
      "Looking for a quiet place to call home. I work remotely and need a peaceful environment. I have a great rental history.",
    createdAt: "2024-01-16T14:20:00Z",
    status: "pending",
  },
  {
    id: "app3",
    propertyId: 5,
    name: "Michael Chen",
    email: "mchen@email.com",
    phone: "(555) 456-7890",
    income: 95000,
    message:
      "I am a professional looking for a long-term rental. I can provide excellent credit history and references from previous landlords.",
    createdAt: "2024-01-17T09:15:00Z",
    status: "pending",
  },
  {
    id: "app4",
    propertyId: 3,
    name: "Emily Rodriguez",
    email: "emily.r@email.com",
    phone: "(555) 234-5678",
    income: 68000,
    message:
      "I'm a teacher looking for a place close to my school. I'm quiet, responsible, and can provide references from my current landlord.",
    createdAt: "2024-01-18T16:45:00Z",
    status: "rejected",
  },
  {
    id: "app5",
    propertyId: 4,
    name: "David Kim",
    email: "dkim@email.com",
    phone: "(555) 345-6789",
    income: 88000,
    message:
      "Software engineer with stable income seeking a modern apartment. Clean, quiet, and responsible tenant with excellent credit score.",
    createdAt: "2024-01-19T11:25:00Z",
    status: "approved",
  },
  {
    id: "app6",
    propertyId: 5,
    name: "Lisa Thompson",
    email: "lisa.t@email.com",
    phone: "(555) 567-8901",
    income: 72000,
    message:
      "Looking for a pet-friendly home for me and my well-behaved cat. I work in healthcare and have a stable income.",
    createdAt: "2024-01-20T13:10:00Z",
    status: "pending",
  },
  {
    id: "app7",
    propertyId: 3,
    name: "James Wilson",
    email: "jwilson@email.com",
    phone: "(555) 678-9012",
    income: 79000,
    message:
      "Recently relocated for work and looking for a long-term rental. Can provide employment verification and previous rental references.",
    createdAt: "2024-01-21T15:30:00Z",
    status: "pending",
  },
  {
    id: "app8",
    propertyId: 6,
    name: "Maria Garcia",
    email: "mgarcia@email.com",
    phone: "(555) 789-0123",
    income: 85000,
    message:
      "Marketing professional seeking a modern living space. Non-smoker, no pets, and excellent credit history.",
    createdAt: "2024-01-22T10:45:00Z",
    status: "pending",
  },
];
