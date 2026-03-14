const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const envText = fs.readFileSync(path.join(__dirname, '.env'), 'utf8');
const getEnv = (k) => (envText.match(new RegExp(`^${k}=(.*)$`, 'm')) || [])[1]?.replace(/^"|"$/g, '');
const supabase = createClient(getEnv('SUPABASE_URL'), getEnv('SUPABASE_KEY'));

(async () => {
  const { data, error } = await supabase.storage.getBucket('temp-home-away');
  console.log({ error, data });
})();
