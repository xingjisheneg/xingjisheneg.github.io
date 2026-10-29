import { getAllEntries, toSearchRecord } from '../content-utils';

export async function GET() {
  const items = (await getAllEntries()).map(toSearchRecord);

  return new Response(JSON.stringify(items), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
