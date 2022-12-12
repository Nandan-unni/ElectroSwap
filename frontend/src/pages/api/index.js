import { config } from "../../../common";

export default function homeHandler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({
      success: true,
      message: `Thanks for the request. But you cannot swap batteries here. Visit ${config.APP_URL} to grab your new batteries.`,
    });
  } else {
    return res.status(200).json({
      success: true,
      message: `Thanks for the request and data. But you cannot swap batteries here. Visit ${config.APP_URL} to grab your new batteries.`,
    });
  }
}
