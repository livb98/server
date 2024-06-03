import { _getAllDestinations, _addDestination, _getDestinationsByUser, _getUserByDestination } from "./models.d.js";
import { getUser } from "../users/controller.u.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from 'jsonwebtoken'
dotenv.config();

export const getAllDestinations = async(req,res) => {
    try {
        const destinations = await _getAllDestinations()
        res.json(destinations)

    } catch (error) {
        console.log(`error cont => ${error}`);
        res.status(404).json({msg:'not found'})
    }
}

export const addDestination = async (req, res) => {
    const { user_id } = req.params;
    const { country, date_arrived, date_depart, place_visit } = req.body;
    
    
    try {
        const lowcountry = country.toLowerCase(); 
        const new_date_arrived = new Date(date_arrived).toISOString().slice(0, 11).replace('T', ' ');
        const new_date_depart = new Date(date_depart).toISOString().slice(0, 11).replace('T', ' ');
        const today = new Date().toISOString().slice(0, 10); 
        if (new_date_arrived < today) {
            return res.status(400).json({ msg: 'Arrival date must be at least today' });
        }
        if (new Date(new_date_depart) <= new Date(new_date_arrived)) {
            return res.status(400).json({ msg: 'Departure date must be after arrival date' });
        }
        const newdestination = await _addDestination({
            country: lowcountry,
            date_arrived: new_date_arrived,
            date_depart: new_date_depart,
            place_visit: place_visit, 
            fk_user_id: user_id
        });
        res.json(newdestination);
    } catch (error) {
        console.log(`Error registering destination: ${error}`);
        res.status(404).json({ msg: 'Destination not registered' });
    }
};

export const getDestinationsByUser = async(req,res) => {
    const {user_id} = req.params
    try {
        const destinations = await _getDestinationsByUser(user_id)
        res.json(destinations)
    } catch(error) {
        console.log(`error user cont ${error}`);
        res.status(404).json({msg:'not found'})
    }
}

export const getUserByDestination = async (req, res) => {
    const { country } = req.params;
    try {
        const users = await _getUserByDestination(country);
        res.json(users);
    } catch (error) {
        console.log(`Error in getUserByDestination: ${error}`);
        res.status(404).json({ msg: 'Not found' });
    }
};
