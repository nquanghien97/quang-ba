export interface UserEntity {
  id: number;
  fullName: string;
  username: string;
  createdAt: Date;
  role: 'ADMIN' | 'USER';
  phoneNumber: string;
  community: string | null
}