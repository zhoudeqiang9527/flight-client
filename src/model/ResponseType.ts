interface CommonResponse {
    code: number;
    message: string;
}

interface LoginResponse {
  code: number;
  message: string;
  data: {
    token: string;
    email: string;
    firstName: string;
    lastName: string;
    country: string;
    phone: string;
  };
}

interface Flight{
    id: string;
    flight_number: string;
    departure: string;
    arrival: string;
    departureTime: string;
    price: number;
    selected?: boolean;
    arrivalTime?: string;
    duration?: string;
    stops?: number;
}

interface FlgihtResponse {
    code: number;
    message: string;
    data: Flight[];
}
