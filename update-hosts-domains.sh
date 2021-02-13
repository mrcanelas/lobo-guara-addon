python ./update-hosts-domain.py > hosts.js
npm install beamup-cli -g
npx beamup config a.baby-beamup.club $GITHUBUSERNAME
npx beamup init lobo-guara-addon
npx beamup deploy
