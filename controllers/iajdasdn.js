loginUser: async (req, res) => {

    //Requiero email password y from de userSignIn
    const { email, password, from } = req.body.userSignIn
    console.log(req.body.userSignIn);
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
              console.log(token);

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

            if (checkedWord.lenght > 0) {     //Compruebo que una contraseña hasheada sea igual a una de mi base de datos

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
              console.log(token);

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