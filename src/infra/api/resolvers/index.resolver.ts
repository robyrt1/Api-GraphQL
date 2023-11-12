import { ProfileResolver } from "./profile/profile.resolver";
import { UserResolver } from "./user/user.resolver";

export const resolvers = [
  ProfileResolver,
  UserResolver, 
] as any[];
