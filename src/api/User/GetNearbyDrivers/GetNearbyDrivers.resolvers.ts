import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";
import { GetNearbyDriversResponse } from "../../../types/graph";
import { Between, getRepository } from "typeorm";

const resolvers: Resolvers = {
  Query: {
    GetNearbyDrivers: privateResolver(
      async (_, __, { req }): Promise<GetNearbyDriversResponse> => {
        const user: User = req.user;
        const { lastLat, lastLng } = user;
        // User.find로 해도 되지만 Between같은 연산을 쓰려면 Data Mapper 패턴을 써야한다.
        // 우리가 평소에 하던 export class User extends BaseEntity ...을 쓰면
        // User.find같은 훌륭한 api들을 쓸 수 있지만, Betwee, Lessthan같은 연산자를 쓰지 못한다.
        // 그래서 getRepository(User)을 통해서 복잡한 연산들을 허용하게 함.
        // 용어 : find operator : Between같은 얘들 => getRepository 내에서만 작동한다.
        try {
          const drivers: User[] = await getRepository(User).find({
            isDriving: true,
            lastLat: Between(lastLat - 0.05, lastLat + 0.05),
            lastLng: Between(lastLng - 0.05, lastLng + 0.05)
          });
          return {
            ok: true,
            error: null,
            drivers
          };
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            drivers: null
          };
        }
      }
    )
  }
};

export default resolvers;
