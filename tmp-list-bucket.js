const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const envText = fs.readFileSync(path.join(__dirname, '.env'), 'utf8');
function getEnv(key) {
  const m = envText.match(new RegExp(`^${key}=(.*)$`, 'm'));
  if (!m) return undefined;
  return m[1].replace(/^"|"$/g, '');
}

const url = getEnv('SUPABASE_URL');
const key = getEnv('SUPABASE_KEY');

const supabase = createClient(url, key);

async function main() {
  const { data, error } = await supabase.storage.from('temp-home-away').list('', { limit: 100 });
  console.log('error=', error);
  console.log('data=', data);
}

main();
