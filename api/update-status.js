export default function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();
  
    // No actual persistence – just echo back request for demo
    const { id, newStatus } = req.body;
  
    if (!id || !newStatus) {
      return res.status(400).json({ error: 'Missing id or newStatus' });
    }
  
    return res.status(200).json({
      id,
      status: newStatus,
      message: 'Mock: status updated (not persisted)',
      timestamp: new Date().toISOString()
    });
  }