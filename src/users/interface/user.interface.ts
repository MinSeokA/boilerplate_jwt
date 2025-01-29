interface UserInterface {
  user: {
    id: number;
    email: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    roles: {
      id: number;
      name: string;
    }[];
  };
}