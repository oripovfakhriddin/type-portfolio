export interface DataSkills {
  _id: string;
  name: string;
  percent: number;
  user: null;
  __v: number;
}

export interface PaginationSkills {
  next: number;
  limit: number;
  page: number;
  total: number;
}

interface Skills {
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
export default Skills;

// export { Skills as default, PaginationSkills, DataSkills };
