// test-mongo.js
require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=>{ console.log('✅ Connected'); process.exit(0); })
  .catch(err=>{ console.error('❌ Connect error:', err.message); process.exit(1); });
