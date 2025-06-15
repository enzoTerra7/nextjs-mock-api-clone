export type SessionPayload = {
  userId: string;
  username: string;
  email: string;
  expires_at: Date;
  deleted_at: Date | null;
};
