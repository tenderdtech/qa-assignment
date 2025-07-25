import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { id } = req.query;
  const filePath = path.join(process.cwd(), 'public', 'data.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const equipment = data.find(e => e.id === id);
  if (!equipment) return res.status(404).json({ error: 'Not found' });

  res.status(200).json(equipment.history || []);
}