import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { event, payload } = req.body || {};

  if (!event) {
    return res.status(400).json({ message: "Missing event" });
  }

  // Privacy-friendly analytics: log minimal event metadata only
  console.log("portfolio_event", { event, payload: payload || null });

  return res.status(200).json({ message: "ok" });
};

export default handler;
