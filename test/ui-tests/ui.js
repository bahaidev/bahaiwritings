// https://github.com/DevExpress/testcafe
// https://devexpress.github.io/testcafe/documentation/test-api/
// https://github.com/helen-dikareva/axe-testcafe
import {Selector, ClientFunction} from 'testcafe';

const getLang = ClientFunction(
  // This function could return a Promise for async to await
  () => window.document.documentElement.lang
);
const getDir = ClientFunction(
  // This function could return a Promise for async to await
  () => window.document.dir
);

fixture`TestCafe UI tests`
  .page`http://localhost:8000/`;

test(`Bahá'í Writings: Installing`, async (t) => {
  const nameInputSelector = Selector('#installationLogContainer');
  await t.expect(
    nameInputSelector.exists
  ).ok('Check for installation container', {timeout: 15000});
});

test(`Bahá'í Writings: Language selection screen`, async (t) => {
  const nameInputSelector = Selector('#languageSelectionContainer');
  await t.expect(
    nameInputSelector.exists
  ).ok('Found language selection container', {timeout: 15000});
  const lang = await getLang();
  const dir = await getDir();
  await t.expect(lang).eql('en-US', 'Got language')
    .expect(dir).eql('ltr', 'Got direction');
});
