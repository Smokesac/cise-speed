import type { NextApiRequest, NextApiResponse } from 'next'
 
export default async function updateOne(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("")
  return res.status(200).json({ success: true });
}

// const formJson = Object.fromEntries(req.body.entries());
//   console.log(formJson);