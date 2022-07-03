const User = require('../models/user')
const bcryptjs = require('bcryptjs')
const crypto = require('crypto')
const sendVerificationMail = require('./sendVerificationMail')
const jwt = require('jsonwebtoken')



const usersControllers = {

  signUpUsers: async (req, res) => {

    let { fullName, email, password, from, photoUser, country } = req.body.userData

    try {

      const userExist = await User.findOne({ email }) //busco si el usuario existe por email

      if (!userExist) { //si NO existe el usuario
        const hashWord = bcryptjs.hashSync(password, 10) //encripto la contraseña
        const verification = false; //obliga al usuario a verificar (pasarlo a true)
        const uniqueString = crypto.randomBytes(15).toString('hex') //Metoxo hexadecimal de crypto
        const newUser = await new User({  //Creo el nuevo usuario con estos datos
          fullName,
          photoUser,
          country,
          email,
          password: [hashWord],
          from: [from],
          verification,
          uniqueString: uniqueString
        })
        if (from === "form-SignIn") { //si la data viene del formulario
          //pero van a cambiar cuando enviemos correo de verificacion
          await newUser.save()
          await sendVerificationMail(email, uniqueString)
          res.json({
            success: true,
            from: from,
            message: `Check ${email} and finish your registered!`
          })
        } else { //si la data viene de facebook o google
          await newUser.save()
          await sendVerificationMail(email, uniqueString)
          res.json({
            success: true,
            from: from,
            message: `You has been registered by ${from}! check your ${email} and finish your registered!`
          })
        }
      } else { //si existe el usuario, significa que al menos tiene un registro
        //hay que chequear si coincide la forma de RE-REGISTRO con la ya REGISTRADA
        //si coincide se tiene que cumplir la siquiente condicion:
        if (userExist.from.indexOf(from) !== -1) { //coincide la forma de registro ACTUAL con alguna ya EXISTENTE en mi bd
          //del usuario que encontró
          //busco en la propiedad FROM
          //el indice que coincide con el FROM del cual el usuario quiere "volver" a registrarse
          //si ese indice EXISTE ==> el usuario ya está registrado DE ESTA FORMA y hay que mandarlo a loguearse
          //ACLARACION: si existe indexOf(from) significa que el usuario ya se registró de esta manera (la que capturamos en la variable FROM)
          //entonces si el indice de from es cualquier numero que no sea -1 significa que ya existe el usuario y NO DEBEMOS PERMITIRLE volver a registrarse
          res.json({ //devolvemos la respuesta
            success: false,
            from: from,
            message: `${email} is already registered, please LOG IN!`
          })
          //si no coincide, se tiene que cumplir esta otra:                
        } else {
          //si es -1 significa que el usuario NO SE REGISTRO DE ESTA FORMA (nuevo registro con google)
          //pero ya tiene AL MENOS UN registro (facebook y form)
          const hashWord = bcryptjs.hashSync(password, 10)
          userExist.password.push(hashWord)
          userExist.verification = true
          userExist.from.push(from)
          await userExist.save()
          res.json({
            success: true,
            from: from,
            message: `Hi ${fullName} you are ready to LogIn!`
          })
        }
      }
    } catch (error) {

      res.json({ success: false, message: "CATCH ERROR", console: console.log(error) }) //CAPTURA EL ERROR
    }
  },

  /* CONTROLADOR LOGIN */


  loginUser: async (req, res) => {

    //Requiero email password y from de userSignIn
    const { email, password, from } = req.body.userSignIn
   /*  console.log(req.body.userSignIn); */
    try {
      const loginUser = await User.findOne({ email }) //busco usuario por coincidencia de email

      if (!loginUser) { //si NO existe el usuario en la base de datos
        res.json({
          success: false,
          from: 'no from',
          message: `${email} has no account, please SIGN UP!`
        })
      } else { //si existe el usuario en mi base de datos 

        //filtramos en el array de contraseñas hasheadas, si coincide la contraseña 
        let checkedWord = loginUser.password.filter(pass => bcryptjs.compareSync(password, pass))
        /* console.log(checkedWord)  */


        if (from === "form-SignIn") {    //Si el usuario viene creado desde el FORMULARIO

          if (loginUser.verification) {   //Primero chequeo que la verificacion en la base de datos sea True

            if (checkedWord.length > 0) { //si la contraseña coincide

              const userData = { //OBJETO USADO PARA CREAR TOKEN
                id: loginUser._id,
                email: loginUser.email,
                fullName: loginUser.fullName,
                photoUser: loginUser.photoUser,
                from: loginUser.from,
                success: true
              }

              const token = jwt.sign({ ...userData }, process.env.SECRET_KEY, { expiresIn: 60 * 60 * 24 })
              await loginUser.save()
              /* console.log(token); */

              res.json({
                response: { token, userData },
                success: true,
                from: from,
                message: `Welcome back ${userData.fullName}!`
              })

            } else { //si la contraseña no coincide
              res.json({
                success: false,
                from: from,
                message: `Please verify your user or password!`
              })
            }
          } else {      //Si el usuario no verifico su email entonces
            res.json({
              success: false,
              from: from,
              message: `Please verify your email ${loginUser.fullName}!`
            })
          }
        } else { //si fue registrado por una que no sea el formulario (google)

          if (loginUser.verification) {   //Chequeo que el loginUser llegue verificado

            if (checkedWord.length > 0) {     //Compruebo que una contraseña hasheada sea igual a una de mi base de datos

              const userData = { //CREO OBJETO USADO PARA CREAR TOKEN
                id: loginUser._id,
                email: loginUser.email,
                fullName: loginUser.fullName,
                photoUser: loginUser.photoUser,
                from: loginUser.from,
                success: true
              }

              console.log(userData);
              const token = jwt.sign({ ...userData }, process.env.SECRET_KEY, { expiresIn: 60 * 60 * 24 }) //Creo el token
              await loginUser.save()
              /* console.log(token); */

              res.json({    //Creo una respuesta de con el token, userData recibido de la base de datos y un mensaje de bienvenida
                response: { token, userData },
                success: true,
                from: from,
                message: `Welcome back ${userData.fullName}!`
              })
            }

          }

        }

      }
    } catch (error) {
      console.log(error)
      res.json({
        success: false,
        from: from,
        message: 'CATCH ERROR', console: console.log(error)
      })
    }
  },


  verifyEmail: async (req, res) => {
    const { string } = req.params
    const user = await User.findOne({ uniqueString: string })
    //console.log(user)
    if (user) {
      user.verification = true
      await user.save()
      res.redirect("http://localhost:3000/signIn")
    }
    else {
      res.json({
        success: false,
        message: `email has not account yet!`
      })
    }
  },

  verifyToken: (req, res) => {

    if (req.user) {

      res.json({
        success: true,
        response: { id: req.user.id, fullName: req.user.fullName, email: req.user.email, photoUser: req.user.photoUser, from: "token" },
        message: "Welcome back " + req.user.fullName,
      })

    } else {
      res.json({
        success: false,
        message: "Please login again"
      })
    }
  }



}

module.exports = usersControllers