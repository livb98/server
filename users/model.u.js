import {db} from '../config/config.js'

export const _getAllUsers = async() => {
    try {
        const users = await db('users')
        .select('*')
        return users
      } catch (err) {
        console.log('error in all => ', err);
        throw new Error('getall failed')
      }
}

export const _getUser = async(id) => {
  try {
    const username = await db('users')
    .select('user_id')
    .where({user_id:id})
    return username

  }catch(error) {
    console.log(`error in getUser model ${error}`);
    throw new Error('get failed')
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
    return user
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

