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
    departure_airport_id: string;
    destination_airport_id: string;
    departure_date: string;
    departure_time: string;
    price: number;
    // 添加缺少的属性
    selected?: boolean;
    airline?: string;
    arrivalTime?: string;
    duration?: string;
    stops?: number;
}

interface FlgihtResponse {
    code: number;
    message: string;
    data: Flight[];
}
