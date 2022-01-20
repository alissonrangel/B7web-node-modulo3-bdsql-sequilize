import express, {Request, Response} from 'express';
import path from 'path';
import mustache from 'mustache-express';

import mainRoutes from './routes/index';
import painelRoutes from './routes/painel';

import dotenv from 'dotenv';

dotenv.config();

const server = express();

server.set('view engine', 'mustache');
server.set('views', path.join(__dirname, 'views'));

server.engine('mustache', mustache());

/*
server.get('/', (req: Request, res: Response)=>{
  res.send('Hello World Node');
})

server.get('/contato', (req: Request, res: Response)=>{
  res.send('Esta é a página de contato');
})

server.get('/noticia/:slug', (req, res)=>{
  //req -> requisição
  let slug: string = req.params.slug
  //res -> controle da resposta
  res.send(`Noticia: ${slug}`)
})
*/

console.log(path.join(__dirname)); //vai da raiz do hd até a pasta aonde se encontra o server.ts
console.log(path.join(__dirname, '../public')); //vai da raiz do hd até a pasta aonde public

//server.use(express.static('public'));
//server.use('/static',express.static('public')); // para colocar o caminho static antes do css
server.use(express.static(path.join(__dirname, '../public'))); // agora posso iniciar meu servidor fora da pasta do projeto que ele vai localizar a pasta public


//antes das rotas
server.use(express.urlencoded({extended: true})); // habilita q eu va no corpo da req que eu pego os dados e seja acessivel na minha rota - extended: true => dados detalhados


server.use(mainRoutes);
server.use('/painel', painelRoutes);

server.use((req: Request, res: Response)=>{
  res.status(404).send('Página não encontrada');
})

server.listen(process.env.PORT);

