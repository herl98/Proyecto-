import initialUsers from "../data/users.json";
import { storageService } from "../services/storageService";
import type { LoginCredentials, User, UserRecord } from "../types/auth";

const SESSION_KEY = "app_session";
const USERS_KEY = "app_users";
const defaultUsers = initialUsers as UserRecord[];

function getUsers(): UserRecord[] {
  return storageService.get<UserRecord[]>(USERS_KEY) ?? defaultUsers;
}

export const authRepository = {
  login(credentials: LoginCredentials): User | null {
    const foundUser = getUsers().find(
      (user) => user.carnet === credentials.carnet && user.password === credentials.password
    );
    if (!foundUser) return null;

    const sessionUser: User = {
      id: foundUser.id,
      name: foundUser.name,
      carnet: foundUser.carnet,
      role: foundUser.role,
    };
    storageService.set<User>(SESSION_KEY, sessionUser);
    return sessionUser;
  },

  getUsers(): UserRecord[] {
    return getUsers();
  },

  createUser(user: UserRecord): boolean {
    const users = getUsers();
    if (users.some((current) => current.carnet === user.carnet)) return false;
    storageService.set<UserRecord[]>(USERS_KEY, [...users, user]);
    return true;
  },

  deleteUser(id: string): void {
    storageService.set<UserRecord[]>(USERS_KEY, getUsers().filter((user) => user.id !== id));
  },

  logout(): void {
    storageService.remove(SESSION_KEY);
  },

  getCurrentUser(): User | null {
    return storageService.get<User>(SESSION_KEY);
  },

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  },
};
