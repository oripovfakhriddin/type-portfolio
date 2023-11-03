export interface DataEducation {
  _id: string;
  name: string;
  level: string;
  user: null;
  description: string;
  startDate: string;
  endDate: string;
  __v: number;
}

export interface PaginationEducation {
  next: number;
  limit: number;
  page: number;
  total: number;
}

interface Education {
  pagination: {
    next: number;
    limit: number;
    page: number;
    total: number;
  };
  data: {
    _id: string;
    name: string;
    percent: number;
    user: null;
    __v: number;
  }[];
}
export default Education;
