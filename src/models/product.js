import { nanoid } from 'nanoid';
import session from '../database';

const findAll = async() => {
    const result = await session.run(`Match (p:Product) return p`)
    return result.records.map(i => i.get('p').properties)
}

const findById = async(id) => {
    const result = await session.run(`Match (p:Product {_id: '${id}'}) return p limit 1`)
    return result.records[0].get('p').properties
}

const create = async(product) => {
    const id = nanoid(8)
    await session.run(`CREATE (p:Product {_id: '${id}', name: '${product.name}', type:'${product.type}', seller_id:'${product.seller_id}'}) return p`)
    return await findById(id)
}
const findByIdUpdate = async(id, product) => {
    const result = await session.run(`MATCH (p:Product {_id: '${id}'}) SET p.name= '${product.name}', p.type='${product.type}', u.seller_id:'${product.seller_id}' return p`)
    return result.records[0].get('p').properties
}
const findByIdDelete = async(id) => {
    await session.run(`MATCH (p:Product {_id: '${id}'}) DELETE u`)
    return await findAll()
}


export default {
    findAll,
    findById,
    create,
    findByIdUpdate,
    findByIdDelete
}