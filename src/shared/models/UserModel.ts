interface Name {
  first: string;
  last: string;
}

interface User {
  _id?: string;
  name?: Name;
  mobile?: string;
  email?: string;
  password?: string;
  role?: string;
  status?: number;
  avatar?: string;
}

export default User;
