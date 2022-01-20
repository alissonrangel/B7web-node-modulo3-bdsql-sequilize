import express, {Request, Response, Router} from 'express';
import Controllers from '../controllers/index';
const router = Router();

router.get('/', Controllers.Home.home);

router.get('/contato', Controllers.Info.contato);

router.get('/sobre', Controllers.Info.sobre);

router.post('/novousuario', Controllers.User.novoUsuario);

router.get('/usuario/:id/excluir', Controllers.User.excluir);

router.get('/adicionar', Controllers.User.adicionar);

router.get('/usuario/:id/diminuir/', Controllers.User.diminuir);

router.post('/updateusuario', Controllers.User.updateusuario);

router.get('/idade', Controllers.User.idade);

router.post('/idade-resultado', (req: Request, res: Response)=>{  
  let idade: number = 0;
  if (req.body.ano) {
    let ano: string = req.body.ano as string;
    let anoAtual: number = new Date().getFullYear();
    idade = anoAtual - parseInt(ano);
  }
  res.render('pages/idade', {    
    idade
  });  
});

export default router;