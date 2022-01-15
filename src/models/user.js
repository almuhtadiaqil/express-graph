import { nanoid } from 'nanoid';
import session from '../database';


const findAll = async() => {
    const result = await session.run(`Match (u:User) return u`)
    return result.records.map(i => i.get('u').properties)
}

const findById = async(id) => {
    const result = await session.run(`Match (u:User {_id: '${id}'}) return u limit 1`)
    return result.records[0].get('u').properties
}

const create = async(user) => {
    const id = nanoid(8)
    await session.run(`CREATE (u:User {_id: '${id}', name: '${user.name}', type:'${user.type}', email:'${user.email}'}) return u`)
    return await findById(id)
}
const findByIdUpdate = async(id, user) => {
    const result = await session.run(`MATCH (u:User {_id: '${id}'}) SET u.name= '${user.name}', u.type='${user.type}' return u`)
    return result.records[0].get('u').properties
}
const findByIdDelete = async(id) => {
    await session.run(`MATCH (u:User {_id: '${id}'}) DELETE u`)
    return await findAll()
}


export default {
    findAll,
    findById,
    create,
    findByIdUpdate,
    findByIdDelete
}