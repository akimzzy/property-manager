export interface MaintenanceRequest {
  id: number;
  propertyId: number;
  tenantId: number;
  title: string;
  description: string;
  status: "pending" | "in_progress" | "completed";
  createdAt: string;
  updatedAt: string;
}

export interface Tenant {
  id: number;
  name: string;
  email: string;
  phone: string;
  rentedProperties: {
    propertyId: number;
    title: string;
    description: string;
    monthlyRent: number;
    images: string[];
    street: string;
    city: string;
    state: string;
    zipCode: string;
    leaseStartDate: string;
    leaseEndDate: string;
  }[];
  maintenanceRequests: MaintenanceRequest[];
}

export const mockTenants: Tenant[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    rentedProperties: [
      {
        propertyId: 1,
        title: "Modern Downtown Apartment",
        description:
          "Luxurious 2-bedroom apartment with stunning city views, modern appliances, and a spacious balcony. Perfect for urban professionals.",
        monthlyRent: 2500,
        images: [
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
          "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
        ],
        street: "123 Downtown Ave",
        city: "Metro City",
        state: "ST",
        zipCode: "12345",
        leaseStartDate: "2023-01-01",
        leaseEndDate: "2024-01-01",
      },
    ],
    maintenanceRequests: [
      {
        id: 1,
        propertyId: 1,
        tenantId: 1,
        title: "Leaking Faucet",
        description: "The kitchen faucet has been leaking consistently.",
        status: "pending",
        createdAt: "2023-06-15T10:00:00Z",
        updatedAt: "2023-06-15T10:00:00Z",
      },
      {
        id: 2,
        propertyId: 1,
        tenantId: 1,
        title: "Broken Thermostat",
        description:
          "The heating system is not responding to thermostat controls.",
        status: "in_progress",
        createdAt: "2023-06-20T14:30:00Z",
        updatedAt: "2023-06-21T09:15:00Z",
      },
    ],
  },
  {
    id: 2,
    name: "Emma Thompson",
    email: "emma.t@example.com",
    phone: "(555) 567-8901",
    rentedProperties: [
      {
        propertyId: 5,
        title: "Mountain View Retreat",
        description:
          "4-bedroom mountain home with breathtaking views, gourmet kitchen, and outdoor entertainment area. Perfect for nature lovers.",
        monthlyRent: 3800,
        images: [
          "https://images.unsplash.com/photo-1518780664697-55e3ad937233",
        ],
        street: "202 Summit Road",
        city: "Highland Valley",
        state: "ST",
        zipCode: "12349",
        leaseStartDate: "2023-09-01",
        leaseEndDate: "2024-08-31",
      },
      {
        propertyId: 7,
        title: "Lakeside Villa",
        description:
          "Stunning 5-bedroom villa with lake views, private dock, and luxury amenities. Perfect for entertaining and outdoor activities.",
        monthlyRent: 5500,
        images: [
          "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
        ],
        street: "404 Lake Shore Drive",
        city: "Lake View",
        state: "ST",
        zipCode: "12351",
        leaseStartDate: "2023-07-01",
        leaseEndDate: "2024-07-01",
      },
    ],
    maintenanceRequests: [
      {
        id: 7,
        propertyId: 5,
        tenantId: 2,
        title: "Heating System Maintenance",
        description:
          "The heating system needs annual maintenance before winter season.",
        status: "pending",
        createdAt: "2023-06-25T14:00:00Z",
        updatedAt: "2023-06-25T14:00:00Z",
      },
      {
        id: 8,
        propertyId: 7,
        tenantId: 2,
        title: "Pool Equipment Repair",
        description:
          "The pool filter system is not working properly and needs inspection.",
        status: "in_progress",
        createdAt: "2023-06-24T10:30:00Z",
        updatedAt: "2023-06-24T15:45:00Z",
      },
    ],
  },
];
