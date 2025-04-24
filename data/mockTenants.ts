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
      {
        propertyId: 13,
        title: "Downtown Loft",
        description: "Spacious loft with modern amenities and city views.",
        monthlyRent: 2700,
        images: [
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
        ],
        street: "101 City Center",
        city: "Metro City",
        state: "ST",
        zipCode: "12357",
        leaseStartDate: "2023-12-01",
        leaseEndDate: "2024-11-30",
      },
      {
        propertyId: 14,
        title: "Suburban Family Home",
        description: "Cozy home with a large backyard, perfect for families.",
        monthlyRent: 3200,
        images: [
          "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
          "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
        ],
        street: "202 Suburb Lane",
        city: "Quiet Town",
        state: "ST",
        zipCode: "12358",
        leaseStartDate: "2023-11-01",
        leaseEndDate: "2024-10-31",
      },
      {
        propertyId: 15,
        title: "Beachfront Condo",
        description: "Luxury condo with ocean views and private beach access.",
        monthlyRent: 4500,
        images: [
          "https://images.unsplash.com/photo-1515263487990-61b07816b324",
          "https://images.unsplash.com/photo-1523217582562-09d0def993a6",
        ],
        street: "303 Ocean Drive",
        city: "Beach City",
        state: "ST",
        zipCode: "12359",
        leaseStartDate: "2023-10-01",
        leaseEndDate: "2024-09-30",
      },
      {
        propertyId: 16,
        title: "Mountain Cabin",
        description:
          "Rustic cabin with stunning mountain views and hiking trails.",
        monthlyRent: 3800,
        images: [
          "https://images.unsplash.com/photo-1518780664697-55e3ad937233",
          "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
        ],
        street: "404 Mountain Road",
        city: "Highland Valley",
        state: "ST",
        zipCode: "12360",
        leaseStartDate: "2023-09-01",
        leaseEndDate: "2024-08-31",
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

maintenanceRequests: [
  {
    id: 9,
    propertyId: 13,
    tenantId: 1,
    title: "Leaking Roof",
    description: "Water is leaking from the roof during heavy rain.",
    status: "pending",
    createdAt: "2023-07-01T10:00:00Z",
    updatedAt: "2023-07-01T10:00:00Z",
  },
  {
    id: 10,
    propertyId: 14,
    tenantId: 1,
    title: "Broken Window",
    description: "The living room window is cracked and needs replacement.",
    status: "in_progress",
    createdAt: "2023-07-05T14:30:00Z",
    updatedAt: "2023-07-06T09:15:00Z",
  },
  {
    id: 11,
    propertyId: 15,
    tenantId: 1,
    title: "Faulty Air Conditioner",
    description: "The air conditioner is not cooling properly.",
    status: "completed",
    createdAt: "2023-07-10T14:00:00Z",
    updatedAt: "2023-07-11T14:00:00Z",
  },
  {
    id: 12,
    propertyId: 16,
    tenantId: 1,
    title: "Clogged Drain",
    description: "The bathroom drain is clogged and needs cleaning.",
    status: "pending",
    createdAt: "2023-07-15T10:30:00Z",
    updatedAt: "2023-07-15T15:45:00Z",
  },
];
