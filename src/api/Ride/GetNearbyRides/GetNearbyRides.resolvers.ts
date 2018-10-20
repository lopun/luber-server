import { Resolvers } from "types/resolvers";
import privateResolver from "utils/privateResolver";
import { GetNearbyRidesResponse } from "types/graph";
import User from "entities/User";
import Ride from "entities/Ride";
import { getRepository, Between } from "typeorm";

const resolvers: Resolvers = {
  Mutation: {
    GetNearbyRides: privateResolver(
      async (_, __, { req }): Promise<GetNearbyRidesResponse> => {
        const user: User = req.user;
        if (user.isDriving) {
          const { lastLat, lastLng } = user;
          try {
            const rides = await getRepository(Ride).find({
              status: "REQUESTING",
              pickUpLat: Between(lastLat - 0.05, lastLat + 0.05),
              pickUpLng: Between(lastLng - 0.05, lastLng + 0.05)
            });
            return {
              ok: true,
              error: null,
              rides
            };
          } catch (error) {
            return {
              ok: false,
              error: error.message,
              rides: null
            };
          }
        } else {
          return {
            ok: false,
            error: "You are not driving",
            rides: null
          };
        }
      }
    )
  }
};

export default resolvers;
