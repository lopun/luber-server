import {
  CompletePhoneVerificationMutationArgs,
  CompletePhoneVerificationResponse
} from "../../../types/graph";
import Verification from "../../../entities/Verification";
import { Resolvers } from "../../../types/resolvers";
import User from "../../../entities/User";
import createJWT from "../../../utils/createJWT";

const resolvers: Resolvers = {
  Mutation: {
    CompletePhoneVerification: async (
      _,
      args: CompletePhoneVerificationMutationArgs
    ): Promise<CompletePhoneVerificationResponse> => {
      const { phoneNumber, key } = args;
      // verification 확인 구문
      try {
        const verification = await Verification.findOne({
          payload: phoneNumber,
          key
        });
        if (!verification) {
          return {
            ok: false,
            error: "Verification key not valid",
            token: null
          };
        } else {
          verification.verified = true;
          verification.save();
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null
        };
      }

      // 이미 유저 존재하는지 여부
      try {
        const user = await User.findOne({ phoneNumber });
        if (user) {
          user.verifiedPhoneNumber = true;
          user.save();
          const token = createJWT(user.id);
          return {
            ok: true,
            error: null,
            token: token
          };
        } else {
          // Phone Number Verified but No user assigned => User create form을 보여주자
          return {
            ok: true,
            error: null,
            token: null
          };
        }
      } catch (error) {
        return { ok: false, error: error.message, token: null };
      }
    }
  }
};

export default resolvers;
