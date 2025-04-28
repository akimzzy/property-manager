export interface Activity {
  id: number;
  title: string;
  description: string;
  time: string;
  iconClass: string;
  icon: string;
}

export const mockActivities: Activity[] = [
  {
    id: 1,
    title: "New Maintenance Request",
    description: "Unit 101 reported a leaking faucet",
    time: "1 hour ago",
    iconClass: "bg-yellow-500",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
  },
  {
    id: 2,
    title: "Rent Payment Received",
    description: "Unit 205 paid monthly rent",
    time: "3 hours ago",
    iconClass: "bg-green-500",
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    id: 3,
    title: "Lease Renewal",
    description: "Modern Downtown Apartment lease extended for 12 months",
    time: "5 hours ago",
    iconClass: "bg-blue-500",
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  {
    id: 4,
    title: "Property Update",
    description: "New appliances installed at Cozy Suburban House",
    time: "1 day ago",
    iconClass: "bg-purple-500",
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  },
  {
    id: 5,
    title: "New Tenant",
    description: "Lease signed for Historic Downtown Loft",
    time: "2 days ago",
    iconClass: "bg-indigo-500",
    icon: "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z",
  },
  {
    id: 6,
    title: "Maintenance Completed",
    description: "AC repair completed at Urban Studio Apartment",
    time: "2 days ago",
    iconClass: "bg-green-500",
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    id: 7,
    title: "Inspection Scheduled",
    description: "Annual inspection for Lakeside Villa on July 15",
    time: "3 days ago",
    iconClass: "bg-orange-500",
    icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  },
  {
    id: 8,
    title: "Late Rent Notice",
    description: "Payment reminder sent for Garden District Townhouse",
    time: "3 days ago",
    iconClass: "bg-red-500",
    icon: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    id: 9,
    title: "Tenant Moved Out",
    description: "Tenant vacated Modern Loft, ready for new listing",
    time: "4 days ago",
    iconClass: "bg-gray-500",
    icon: "M17 16l4-4m0 0l-4-4m4 4H7a4 4 0 01-4-4V7",
  },
  {
    id: 10,
    title: "New Application Received",
    description: "Application submitted for Lakeside Villa",
    time: "5 days ago",
    iconClass: "bg-blue-400",
    icon: "M16 12H8m8 0a8 8 0 11-16 0 8 8 0 0116 0z",
  },
  {
    id: 11,
    title: "Maintenance Request Approved",
    description: "Approval granted for roof repair at Cozy Suburban House",
    time: "6 days ago",
    iconClass: "bg-green-400",
    icon: "M5 13l4 4L19 7",
  },
  {
    id: 12,
    title: "Rent Payment Failed",
    description: "Payment failed for Unit 305, retry required",
    time: "6 days ago",
    iconClass: "bg-red-400",
    icon: "M6 18L18 6M6 6l12 12",
  },
  {
    id: 13,
    title: "New Comment on Listing",
    description: "A user commented on Urban Studio Apartment",
    time: "7 days ago",
    iconClass: "bg-indigo-400",
    icon: "M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H7a2 2 0 01-2-2V10a2 2 0 012-2h2m4-4h4a2 2 0 012 2v4a2 2 0 01-2 2h-4a2 2 0 01-2-2V6a2 2 0 012-2z",
  },
  {
    id: 14,
    title: "Scheduled Viewing",
    description: "Viewing scheduled for Garden District Townhouse",
    time: "8 days ago",
    iconClass: "bg-yellow-400",
    icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  },
  {
    id: 15,
    title: "Profile Updated",
    description: "Landlord profile information updated",
    time: "9 days ago",
    iconClass: "bg-purple-400",
    icon: "M12 4v16m8-8H4",
  },
];
