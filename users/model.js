import {db} from '../config/config.js'

export const _getAll = async() => {
    try {
        const test = await db('test')
        .select('*')

        return test
    
      } catch (err) {
        console.log('error in all => ', err);
        throw new Error('login failed')
      }
}

export const _register = async() => {
  try {
    const [user] = await db("users")
    .insert({ fname,lname,username,date_birth }, [
      "id",
      "fname",
      "lname",
      "username",
      "date_birth"
    ]);
  } catch(err) {
    console.log(`error in _register => ${err}`);
    throw new Error('login failed')
  }
}