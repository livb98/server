import { db } from "../config/config.js";

export const _getAllDestinations = async() => {
    try {
        const test = await db('destination')
        .select('*')

        return test
    
      } catch (err) {
        console.log('error in all => ', err);
        throw new Error('login failed')
      }
}

export const _addDestination = async ({ country, date_arrived, date_depart, place_visit, fk_user_id }) => {
    try {
        const [destination] = await db("destination")
            .insert({ country, date_arrived, date_depart, place_visit, fk_user_id }, [
                'country', 
                'date_arrived',
                'date_depart',
                'place_visit',
                'fk_user_id'
            
            ]);
        return destination;
    } catch (err) {
        console.log(`Error in _addDestination => ${err}`);
        throw new Error('Register failed');
    }
};

export const _getDestinationsByUser = async(user_id) => {
    try {
        const destinations = await db('destination')
        .select('*')
        .where({fk_user_id:user_id})
        return destinations
      } catch (err) {
        console.log('error in dest by user => ', err);
        throw new Error('get failed')
      }
}

export const _getUserByDestination = async (user_id,country) => {
    try {
        const users = await db('users')
            .select('*')
            .innerJoin('destination', 'users.user_id', 'destination.fk_user_id')
            .where({country:country, fk_user_id:user_id});

        return users;
    } catch (error) {
        console.log(`Error in _getUserByDestination: ${error}`);
        throw new Error('Get failed');
    }
};
