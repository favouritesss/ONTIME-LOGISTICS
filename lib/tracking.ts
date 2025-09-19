export function generateTrackingNumber(prefix = "ONTIME", id = 1) {
  const date = new Date().toISOString().slice(0,10).replace(/-/g,'');
  const serial = String(id).padStart(6, '0');
  const raw = `${prefix}-${date}-${serial}`;
  const checksum = String([...raw].reduce((s,c)=>s + c.charCodeAt(0),0) % 9);
  return `${raw}-${checksum}`;
}
