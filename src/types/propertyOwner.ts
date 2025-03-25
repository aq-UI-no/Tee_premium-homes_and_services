export interface PropertyOwner {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  totalProperties: number;
  totalEarnings: number;
  rating: number;
  properties: {
    id: string;
    name: string;
    type: string;
    status: 'listed' | 'unlisted' | 'maintenance';
    monthlyEarnings: number;
    rating: number;
  }[];
  earningsHistory: {
    month: string;
    amount: number;
  }[];
  documents: {
    id: string;
    name: string;
    type: string;
    uploadDate: string;
    status: 'verified' | 'pending' | 'rejected';
  }[];
  paymentHistory: {
    id: string;
    date: string;
    amount: number;
    type: 'rent' | 'deposit' | 'refund';
    status: 'completed' | 'pending' | 'failed';
    property: string;
  }[];
} 