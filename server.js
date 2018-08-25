const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const compression = require('compression');
const cors = require('cors');
const r6 = require('r6api');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(cors());
app.use(compression());

if (process.env.NODE_ENV === 'prod') {
  // force SSL
  const forceSSL = function () {
    return function (req, res, next) {
      if (req.headers['x-forwarded-proto'] !== 'https') {
        return res.redirect(
          ['https://', req.get('Host'), req.url].join('')
        );
      }
      next();
    }
  };
  app.use(forceSSL());

  // if not development, run the ng app
  app.use(express.static(`${__dirname}/dist`));
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(`${__dirname}/dist/index.html`));
  });
}

app.get('/api', (req, res) => {
  res.send('API works');
});

async function login() {
  r6.auth.setCredentials('rainbow6me.api@gmail.com', 'hiANDOrplasE');
  await r6.auth.login('rainbow6me.api@gmail.com', 'hiANDOrplasE');
}

app.get('/api/player/:name/details', async (req, res) => {
  let name = req.params.name;
  let platform = 'PC';

  await login();

  return await r6.api.findByName(platform, name)
});

app.get('/api/player/:id', async (req, res) => {
  let id = req.params.id;
  let platform = 'PC';

  await login();

  const promises = [];
  promises.push(
    {user: await r6.api.getCurrentName(platform, id)}
  );
  promises.push(
    {stats: await r6.api.getStats(platform, id)}
  );
  promises.push(
    {level: await r6.api.getLevel(platform, id)}
  );
  promises.push(
    {rank: await r6.api.getRanks(platform, id)}
  );

  Promise.all(promises).then((raw) => {
    let flat = Object.assign(...raw);
    Object.getOwnPropertyNames(flat).forEach((f) => {
      if (typeof flat[f] === 'object' && flat[f].length > 0) {
        flat[f] = flat[f][0];
      }
    });
    flat.user.platform = platform;
    flat.user.imageURL = platform !== 'PC'
      ? `//ubisoft-avatars.akamaized.net/${flat.user.id}/default_146_146.png`
      : `//uplay-avatars.s3.amazonaws.com/${flat.user.id}/default_146_146.png`
    return res.send(flat);
  });
});

app.get('/api/player/:id/seasons', async (req, res) => {
  let id = req.params.id;
  let platform = 'PC';

  await login();

  const rank = await r6.api.getRanks(platform, id);
  const currentSeason = rank[0].season;
  for (let i = currentSeason - 1; i > 6; i--) {
    const season = await r6.api.getRanks(platform, id, {season_id: i})
    rank.push(season[0]);
  }

  return res.send(rank);
});

// Set port
const port = process.env.PORT || '8083';
app.set('port', port);

app.listen(port, () => {
  console.log(`Server running on localhost:${port}`);
});
