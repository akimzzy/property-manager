export interface Property {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  available: boolean;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  tenantId?: number;
  tenantEmail?: string;
  tenantName?: string;
  leaseEnd?: string;
}

export const mockProperties: Property[] = [
  {
    id: 1,
    title: "Modern Downtown Apartment",
    description:
      "Luxurious 2-bedroom apartment with stunning city views, modern appliances, and a spacious balcony. Perfect for urban professionals.",
    price: 2500,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
    ],
    available: false,
    street: "123 Downtown Ave",
    city: "Metro City",
    state: "ST",
    zipCode: "12345",
    tenantId: 1,
    tenantEmail: "john.doe@example.com",
    tenantName: "John Doe",
    leaseEnd: "2024-01-01",
  },
  {
    id: 2,
    title: "Cozy Suburban House",
    description:
      "3-bedroom family home with a large backyard, updated kitchen, and attached garage. Located in a quiet, family-friendly neighborhood.",
    price: 3200,
    images: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
    ],
    available: true,
    street: "456 Suburb St",
    city: "Quiet Town",
    state: "ST",
    zipCode: "12346",
  },
  {
    id: 3,
    title: "Luxury Waterfront Condo",
    description:
      "High-end 3-bedroom condo with panoramic water views, premium finishes, and resort-style amenities. Private beach access included.",
    price: 4500,
    images: ["https://images.unsplash.com/photo-1515263487990-61b07816b324"],
    available: true,
    street: "789 Ocean Drive",
    city: "Beach City",
    state: "ST",
    zipCode: "12347",
  },
  {
    id: 4,
    title: "Historic Downtown Loft",
    description:
      "Unique 1-bedroom loft in a converted industrial building. Exposed brick walls, high ceilings, and original hardwood floors.",
    price: 1800,
    images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"],
    available: true,
    street: "101 Heritage Lane",
    city: "Metro City",
    state: "ST",
    zipCode: "12348",
  },
  {
    id: 5,
    title: "Mountain View Retreat",
    description:
      "4-bedroom mountain home with breathtaking views, gourmet kitchen, and outdoor entertainment area. Perfect for nature lovers.",
    price: 3800,
    images: ["https://images.unsplash.com/photo-1518780664697-55e3ad937233"],
    available: false,
    street: "202 Summit Road",
    city: "Highland Valley",
    state: "ST",
    zipCode: "12349",
    tenantId: 2,
    tenantEmail: "emma.t@example.com",
    tenantName: "Emma Thompson",
    leaseEnd: "2024-08-31",
  },
  {
    id: 6,
    title: "Garden District Townhouse",
    description:
      "Charming 2-bedroom townhouse with private garden, updated appliances, and dedicated parking. Walking distance to shops and restaurants.",
    price: 2800,
    images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750"],
    available: true,
    street: "303 Garden Way",
    city: "Metro City",
    state: "ST",
    zipCode: "12350",
  },
  {
    id: 7,
    title: "Lakeside Villa",
    description:
      "Stunning 5-bedroom villa with lake views, private dock, and luxury amenities. Perfect for entertaining and outdoor activities.",
    price: 5500,
    images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6"],
    available: false,
    street: "404 Lake Shore Drive",
    city: "Lake View",
    state: "ST",
    zipCode: "12351",
    tenantId: 2,
    tenantEmail: "emma.t@example.com",
    tenantName: "Emma Thompson",
    leaseEnd: "2024-07-01",
  },
  {
    id: 8,
    title: "Urban Studio Apartment",
    description:
      "Efficient studio apartment in the heart of downtown. Modern design, smart home features, and amazing city views.",
    price: 1500,
    images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688"],
    available: true,
    street: "505 City Center",
    city: "Metro City",
    state: "ST",
    zipCode: "12352",
  },
  {
    id: 9,
    title: "Suburban Family Estate",
    description:
      "Spacious 6-bedroom estate with pool, tennis court, and guest house. Set on 2 acres of beautifully landscaped grounds.",
    price: 6500,
    images: ["https://images.unsplash.com/photo-1505843513577-22bb7d21e455"],
    available: true,
    street: "606 Estate Circle",
    city: "Quiet Town",
    state: "ST",
    zipCode: "12353",
  },
  {
    id: 10,
    title: "Arts District Penthouse",
    description:
      "Luxurious 3-bedroom penthouse with wraparound terrace, chef's kitchen, and private elevator. Located in the vibrant arts district.",
    price: 4800,
    images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00"],
    available: true,
    street: "707 Artist Way",
    city: "Metro City",
    state: "ST",
    zipCode: "12354",
  },
  {
    id: 11,
    title: "College Area Duplex",
    description:
      "Affordable 2-bedroom duplex near university campus. Recently renovated with new appliances and dedicated study area.",
    price: 1900,
    images: ["https://images.unsplash.com/photo-1570129477492-45c003edd2be"],
    available: true,
    street: "808 College Blvd",
    city: "Metro City",
    state: "ST",
    zipCode: "12355",
  },
  {
    id: 12,
    title: "Golf Course Villa",
    description:
      "Elegant 4-bedroom villa overlooking the golf course. Features include a home theater, wine cellar, and outdoor kitchen.",
    price: 4200,
    images: ["https://images.unsplash.com/photo-1513584684374-8bab748fbf90"],
    available: true,
    street: "909 Fairway Drive",
    city: "Highland Valley",
    state: "ST",
    zipCode: "12356",
  },
];
