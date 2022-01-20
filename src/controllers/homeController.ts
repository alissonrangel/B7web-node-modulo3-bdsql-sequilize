import express, {Request, Response, Router} from 'express';

import {Product, Products} from '../models/Product';

import {Op, where} from 'sequelize';
//import {sequelize} from '../instances/mysql';

//import {sequelize as sequelize2} from '../instances/pg';

import {User, UserInstance} from '../models/User';
export const home = async(req: Request, res: Response)=>{

  

  // try {
  //   await sequelize.authenticate();
  //   console.log("Conexão mysql estabelecida com sucesso!");
    
  // } catch (error) {
  //   console.log("Deu problema: ", error);
  // }

  // try {
  //   await sequelize2.authenticate();
  //   console.log("Conexão pg estabelecida com sucesso!");
    
  // } catch (error) {
  //   console.log("Deu problema: ", error);
  // }

  // await User.update({age: 18},{
  //   where: {
  //     age: {
  //       [Op.lt]: 18
  //     }
  //   }
  // })

  // await User.update({name: "Salvatori", age: 57},{
  //   where: {
  //     id: 12
  //   }
  // })



  //Update de um item específico
  // let result = await User.findAll({
  //   where:{
  //     id: 7
  //   }
  // })
  // if (result.length > 0) {
  //   let usuario = result[0];
  //   usuario.age = 777;
  //   await usuario.save();
  // }



  //Delete um ou vários dependendo do where
  // await User.destroy({
  //   where:{
  //     age:{
  //       [Op.lte]: 18
  //     }
  //   }
  // })

  //Delete um usuário específico, no caso, pelo name ou id
  // let result = await User.findAll({
  //   where:{
  //     name: "Coliseu"
  //   }
  // });
  // if (result.length > 0) {
  //   let usuario = result[0];    
  //   await usuario.destroy();
  // }



  


  let users = await User.findAll({
    //attributes: ["name","age"]
    //attributes: { exclude: ["id","age"] }
    //where: { name: "Rangel"}
    // where: {
    //     [Op.or]:[ // age = 24 or age = 199 or name = "Rangel"
    //       {age: 24},
    //       {age: 199},
    //       {name: "Rangel"}
    //     ]
    // }
    // where: {
    //   age: {
    //     [Op.or]:[40,199]
    //   }
    // }
    // where: {
    //   age:[24,199] //in (24,99)
    // }
    // where: {
    //   age: {
    //     [Op.gte]: 40, //gt gte lt lte
    //     [Op.lte]: 100
    //   }
    // }
    // where: {
    //   age: {
    //     //[Op.between]: [24,40]
    //     [Op.notIn]: [24,40],        
    //   },
    //   name: {
    //     [Op.like]: "A%" 
    //   }
    // }
    where: {
      age: {
        [Op.gte]: 17      
      }
    },
    //order: ["name"],      
    order: [
      ["name","ASC"],
      ["age", "ASC"]
    ],
    offset: 0,
    limit: 17
  });

  console.log("Userss: ", JSON.stringify(users));


  //Add datas with sequelize
  // const user = User.build({
  //   name: 'Beatriz'
  // })
  //user.age = 17;
  // await user.save();

  // const user = await User.create({
  //   name: 'Amora',
  //   age: 27
  // })
  

  let age: number = 51;
  let showOld: boolean = false;
  let products: Product[] = [];
  if (age>50) {
    showOld = true;
  }

  if (req.query.valor) {
    products = Products.getFromPriceAfter(parseFloat(req.query.valor as string));
  } else {
    products = Products.getAll();
  }

  res.render('pages/home', {
    user: "Rangel",
    showWelcome: false,
    age,
    showOld,
    // products: [{title: 'Produto X', price: 10},{title: 'Produto Y', price: 20},{title: 'Produto Z', price: 30}],
    products,
    frasesDoDia: [],
    users
  });
}