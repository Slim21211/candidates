import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const url = `${req.headers['x-forwarded-proto'] || 'https'}://${req.headers.host}/form`;
  return res.status(200).json({ url });
}
