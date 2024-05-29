import {db} from '../config/config.js'
import express from 'express'

export const _getAll = async() => {
    try {
        const users = await db('test')
        .select('*')
        console.log('work');
        return users
    
      } catch (err) {
        console.log('error in all => ', err);
        throw new Error('login failed')
      }
}