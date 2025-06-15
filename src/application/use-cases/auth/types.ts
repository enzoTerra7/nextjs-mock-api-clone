type PromiseUserReturn = Promise<{
  user: {
    id: string;
    passwordHash: string;
    email: string;
    username: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
  };
}>;

export type SignInInput = {
  email: string;
  password: string;
};

export type SignInOutput = PromiseUserReturn;

export type SignUpInput = {
  username: string;
  email: string;
  password: string;
};

export type SignUpOutput = PromiseUserReturn;
