import privateResolver from "utils/privateResolver";
import User from "entities/User";
import { Resolvers } from "types/resolvers";
import { GetChatResponse, GetChatQueryArgs } from "types/graph";
import Chat from "entities/Chat";

const resolvers: Resolvers = {
  Query: {
    GetChat: privateResolver(
      async (_, args: GetChatQueryArgs, { req }): Promise<GetChatResponse> => {
        const user: User = req.user;
        try {
          const chat = await Chat.findOne({
            id: args.chatId
          });
          if (chat) {
            if (chat.passengerId === user.id || chat.driverId === user.id) {
              return {
                ok: true,
                error: null,
                chat
              };
            } else {
              return {
                ok: false,
                error: "Not Authorized",
                chat: null
              };
            }
          } else {
            return {
              ok: false,
              error: "Not found",
              chat: null
            };
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            chat: null
          };
        }
      }
    )
  }
};

export default resolvers;
