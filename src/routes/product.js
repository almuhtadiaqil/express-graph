import { Router } from "express"
import productModel from '../models/product'

const product = Router()

product.get("/", async(req, res) => {
    const result = await productModel.findAll()
    res.json(result)
})
product.get("/:id", async(req, res) => {
    const result = await productModel.findById(req.params.id)
    res.json(result)
})
product.post("/", async(req, res) => {
    const result = await productModel.create(req.body)
    res.json(result)
})
product.put("/:id", async(req, res) => {
    const result = await productModel.findByIdUpdate(req.params.id, req.body)
    res.json(result)
})
product.delete("/:id", async(req, res) => {
    const result = await productModel.findByIdDelete(req.params.id)
    res.json(result)
})

export default product