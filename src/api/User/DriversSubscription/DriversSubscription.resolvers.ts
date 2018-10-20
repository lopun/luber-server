import { withFilter } from "apollo-server-express";
import User from "entities/User";

const resolvers = {
  Subscription: {
    DriversSubscription: {
      subscribe: withFilter(
        (_, __, { pubSub }) => pubSub.asyncIterator("driverUpdate"),
        (payload, _, { context }) => {
          const user: User = context.currentUser;
          const {
            DriversSubscription: {
              lastLat: driverLastLat,
              lastLng: driverLastLng
            }
          } = payload;
          const { lastLat: userLastLat, lastLng: userLastLng } = user;
          return (
            Math.abs(driverLastLat - userLastLat) <= 0.05 &&
            Math.abs(driverLastLng - userLastLng) <= 0.05
          );
        }
      )
    }
  }
};

export default resolvers;
