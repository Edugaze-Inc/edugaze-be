const AccessToken = require("twilio").jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;
import dotenv from "dotenv";

dotenv.config();

const createTwilioToken = (user: string, meeting: string) => {
  // Create an access token which we will sign and return to the client,
  // containing the grant we just created
  const token = new AccessToken(
    process.env.TWILIO_SID,
    process.env.TWILIO_API_KEY,
    process.env.TWILIO_API_SECRET
  );
  token.identity = user;

  // Create a Video grant which enables a client to use Video
  // and limits access to the specified Room (DailyStandup)
  const videoGrant = new VideoGrant({
    room: meeting,
  });

  // Add the grant to the token
  token.addGrant(videoGrant);

  // Serialize the token to a JWT string
  console.log(token.toJwt());

  return token.toJwt();
};

export { createTwilioToken };
