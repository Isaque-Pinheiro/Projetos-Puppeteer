const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
      headless: false,
});

  console.log("\nBem vindo ao robô buscador de cep!\n")
  const page = await browser.newPage();
  var cep = '62880255';

  await page.goto('https://buscacepinter.correios.com.br/app/endereco/index.php');

  //Trecho para adicionar o Cep
  await page.type('[name="endereco"]', cep);

  await page.waitForTimeout(1000);

  await page.click('[name="btn_pesquisar"]');

  await page.waitForTimeout(1000);

  const rows = await page.$$('#resultado-DNEC > tbody > tr');

  for(let i = 0; i < rows.length; i++){
    const row = rows[i];

    const value1 = await row.$eval('td:nth-child(1)', element => element.textContent);
    const value2 = await row.$eval('td:nth-child(2)', element => element.textContent);
    const value3 = await row.$eval('td:nth-child(3)', element => element.textContent);
    const value4 = await row.$eval('td:nth-child(4)', element => element.textContent);

    console.log('Logradouro/Nome;', value1);
    console.log('Bairro/Distrito:', value2);
    console.log('Logradouro/UF:', value3);
    console.log('CEP:', value4);
  }

  console.log('\n');

  await browser.close();

})();