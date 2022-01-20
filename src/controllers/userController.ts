import express, {Request, Response, Router} from 'express';
import {Op} from 'sequelize';
import {User} from '../models/User';

export const excluir = async (req: Request, res: Response)=>{
  
  let id: number = parseInt(req.params.id);

  // let result = await User.findAll({
  //   where:{
  //     id 
  //   }
  // });

  // if (result.length > 0) {
  //   let usuario = result[0];    
  //   await usuario.destroy();
  // }

  await User.destroy({where: {id}});

  res.redirect('/');
}

export const adicionar = async (req: Request, res: Response)=>{
  
  let id: number = parseInt(req.query.id as string);

  let result = await User.findAll({
    where:{
      id 
    }
  });
  
  if (result.length > 0) {
    let usuario = result[0];
    usuario.age += 1    
    await usuario.save();
  }

  res.redirect('/');
}

export const diminuir = async (req: Request, res: Response)=>{
  
  let id: number = parseInt(req.params.id as string);

  let result = await User.findAll({
    where:{
      id 
    }
  });
  
  if (result.length > 0) {
    let usuario = result[0];
    usuario.age -= 1    
    await usuario.save();
  }
  
  res.redirect('/');
}

export const updateusuario = async (req: Request, res: Response)=>{    
  let name: string = req.body.name as string;
  let age: number = req.body.age;
  let id: number = parseInt(req.body.id as string);
  
  let result = await User.findAll({
    where:{
      id
    }
  })
  if (result.length > 0) {
    let usuario = result[0];
    usuario.age = age;
    usuario.name = name;
    await usuario.save();
  }

  res.redirect('/');  
}

export const novoUsuario = async(req: Request, res: Response)=>{    
  let name: string = req.body.nome as string;
  let age: string = req.body.idade as string;
  
  let user = User.build({
    name
  })
  if (age) {
    user.age = parseInt(age);
  }
  await user.save();

  // let users = await User.findAll({
  //   where: {
  //     age: {
  //       [Op.gte]: 18
  //     }
  //   },
  //   order: ["name"],
  //   offset: 0,
  //   limit: 10
  // })

  res.redirect('/');
  // res.render('pages/home', {    
  //   users
  // });  
}

export const idade = (req: Request, res: Response)=>{  
  
  let idade: number = 0;
  if (req.query.ano) {
    let ano: string = req.query.ano as string;
    let anoAtual: number = new Date().getFullYear();
    idade = anoAtual - parseInt(ano);
  }
  
  res.render('pages/idade', {    
    idade
  });  
}