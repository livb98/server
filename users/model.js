import {db} from '../config/config.js'

export const _getAll = async() => {
    try {
        const test = await db('users')
        .select('*')

        return test
    
      } catch (err) {
        console.log('error in all => ', err);
        throw new Error('login failed')
      }
}

export const _register = async({fname,lname,username,date_birth, password}) => {
  try {
    const [user] = await db("users")
    .insert({ fname,lname,username,date_birth, password }, [
      "fname",
      "lname",
      "username",
      "date_birth",
      "password"
    ]);
  } catch(err) {
    console.log(`error in _register => ${err}`);
    throw new Error('register failed')
  }
}

export const _login = async(username) => {
    try {
      const user = db('users')
      .select('user_id', 'username', 'password')
      .where({username})
      .first()
      return user || null

  } catch(error) {
      console.log('error _login => ', error);
      throw new Error('login failed')
  }
}