const puppeteer = require('puppeteer');

const scrap = async ()=>{

	//Estamos iniciando um Browser
	const browser = await puppeteer.launch({headless: 'new'});

	//Abrindo uma nova aba
	const newTab = await browser.newPage();

	//Essa função é usada para direcionar a pagina que queremos analisar
	await newTab.goto('http://books.toscrape.com/');

	//Essa Função é utilizada para esperar ate diminuir o trafego de rede que pode ser considerado um sinal
	//que a pagina terminou de carregar, executar funcções internas.etc
	await newTab.waitForNetworkIdle();

	//Função que permite extrair os dados do HTML apos analisar todo HTML
	const result = await newTab.evaluate(()=>{
		const books = [];
		//Aqui podemos manipular o DOM da pagina acessada
		//Estamos usando o book.title pois ao analisar o site a informação que queremos esta na propriedade title do elemento
		document.querySelectorAll('h3 > a').forEach(item => books.push({title: item.title}));

		document.querySelectorAll('.price_color').forEach((item, i)=>{
			books[i].price = item.innerText;
		});

		return books;
	});

	console.log(result);
	browser.close();
}

scrap();