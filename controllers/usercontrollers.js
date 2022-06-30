const User = require('../models/user')
const bcryptjs = require('bcryptjs')


const usersControllers = {

    signUpUsers: async (req, res) => {

        let { fullName, email, password, from , photoUser, country} = req.body.userData

        try {

            const userExist = await User.findOne({ email }) //busco si el usuario existe por email

            if (!userExist) { //si NO existe el usuario
                const hashWord = bcryptjs.hashSync(password, 10) //encripto la contraseña

                const newUser = await new User({  //Creo el nuevo usuario con estos datos
                    fullName,
                    photoUser,
                    country,
                    email,
                    password: [hashWord],
                    from: [from]
                })
                if (from === "form-Signup") { //si la data viene del formulario
                    //ACLARACION: ahora el if/else tienen la misma data
                    //pero van a cambiar cuando enviemos correo de verificacion
                    await newUser.save()
                    res.json({
                        success: true,
                        from: from,
                        message: `check ${email} and finish your registered!`
                    })
                } else { //si la data viene de facebook o google
                    /* newUser.verification = true */
                    await newUser.save()
                    res.json({
                        success: true,
                        from: from,
                        message: `you registered by ${from}! now try to LOG IN!`
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
                    userExist.from.push(from)
                    await userExist.save()
                    res.json({
                        success: true,
                        from: from,
                        message: `${email} you are ready to LogIn!`
                    })
                }
            }
        } catch (error) {

            res.json({ success: false, message: "Something went wrong, please try again in a few minutes" }) //CAPTURA EL ERROR
        }
    },

    /* CONTROLADOR LOGIN */
    loginUser: async (req, res) => {

      const { email, password, from } = req.body.userSignIn
      try {
        const loginUser = await User.findOne({ email }) //buscamos por email
        if (!loginUser) { //si NO existe el usuario
          res.json({
            success: false,
            from: 'no from',
            message: `${email} has no account, please SIGN UP!`
          })
        } else { //si existe el usuario
          let checkedWord = loginUser.password.filter(pass => bcryptjs.compareSync(password, pass))
          console.log(checkedWord)
          //filtramos en el array de contraseñas hasheadas si coincide la contraseña 
          if (from === "form-SignIn") { //si fue registrado por nuestro formulario
            if (checkedWord.length > 0) { //si hay coincidencias
              const userData = { //este objeto lo utilizaremos cuando veamos TOKEN
                id: loginUser._id,
                email: loginUser.email,
                fullName: loginUser.fullName,
                // photoUser: loginUser.photoUser,
                from: loginUser.from
              }
              await loginUser.save()
              res.json({
                response: userData,
                success: true,
                from: from,
                message: `welcome back ${userData.fullName}!`
              })
            } else { //si no hay coincidencias
              res.json({
                success: false,
                from: from,
                message: `verify your password!`
              })
            }
          } else { //si fue registrado por redes sociales
            //ACLARACION: por ahora es igual al anterior
            if (checkedWord.length > 0) { //si hay coincidencias
              const userData = { //este objeto lo utilizaremos cuando veamos TOKEN
                id: loginUser._id,
                email: loginUser.email,
                fullName: loginUser.fullName,
                // photoUser: loginUser.photoUser,
                from: loginUser.from
              }
              await loginUser.save()
              res.json({
                response: userData,
                success: true,
                from: from,
                message: `welcome back ${userData.fullName}!`
              })
            } else { //si no hay coincidencias
              res.json({
                success: false,
                from: from,
                message: `verify your mail or password!`
              })
            }
          }
        }
      } catch (error) {
        console.log(error)
        res.json({
          success: false,
          from: from,
          message: 'ERROR'
        })
      }
    }

}

module.exports = usersControllers