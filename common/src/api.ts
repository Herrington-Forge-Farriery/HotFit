// Wrap fetch/axios for both web & native
import { API_URL } from '@env'; // use react-native-config or process.env in web

export async function fetchScans() {
  const res = await fetch(`${API_URL}/scans`);
  return res.json();
}
export async function postScan(code: string, action: string) {
  await fetch(`${API_URL}/scans`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ code, action })
  });
}
