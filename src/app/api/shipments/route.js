// pages/api/shipments.js
import fs from 'fs';
import path from 'path';

const dataFile = path.join(process.cwd(), 'data', 'shipments.json');

export default function handler(req, res) {
  if (req.method === 'GET') {
    const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
    res.status(200).json(data);
  } else if (req.method === 'POST') {
    const shipments = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
    const newShipment = {
      ...req.body,
      id: `SHIP${(shipments.length + 1).toString().padStart(3, '0')}`,
    };
    shipments.push(newShipment);
    fs.writeFileSync(dataFile, JSON.stringify(shipments, null, 2));
    res.status(201).json(newShipment);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
