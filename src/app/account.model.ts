import { Role } from "./role.model";
import { Authority } from "./authority.model";

export interface Account {
    id: number;
    password: string;
    createDate: string;
    roles: Role[];
    currentPassword: null | string;
    newPassword: null | string;
    confirmPassword: null | string;
    enabled: boolean;
    credentialsNonExpired: boolean;
    accountNonExpired: boolean;
    authorities: Authority[];
    username: string;
    accountNonLocked: boolean;
  }
  

  