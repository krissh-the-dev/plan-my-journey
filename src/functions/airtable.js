import AirTable from 'airtable';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const Database = new AirTable({ apiKey: process.env.REACT_APP_API_KEY }).base(process.env.REACT_APP_BASE);
const Journeys = Database('journeys');

export function newJourney(fields) {
  Journeys.create([{ fields }], (err, records) => {
    if (err) {
      console.error(err);
      return err;
    }
    records.forEach(record => {
      console.log(record.getId());
      return record;
    });
  });
}

export async function create(row) {
  try {
    const result = await axios.post(
      `https://api.airtable.com/v0/${process.env.REACT_APP_BASE}/journeys`,
      { fields: row },
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return result;
  } catch (e) {
    console.error(e);
    return e;
  }
}
