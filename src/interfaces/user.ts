import firebase from 'firebase';
export interface User {
  uid: string;
  name: string;
  email: string;
  teamId: string;
  isAdmin?: boolean;
  isTeamOwner?: boolean;
  isPro?: boolean;
  isHobby?: boolean;
  createdAt?: number;
  avatarUrl?: string;
  emailVerified?: boolean;
}

export type ExtendedUser = User & firebase.auth.AdditionalUserInfo;
