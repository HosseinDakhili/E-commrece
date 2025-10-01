import express from 'express'
import isAdmin from '../Middlewares/IsAdmin.js'
import { create, getAll, getOne, remove, update } from '../Controllers/BrandCn'
const brandRouter = express.Router()

brandRouter.route('/').post(isAdmin,create).get(getAll)
brandRouter.route('/:id').get(isAdmin,getOne).patch(isAdmin,update).delete(isAdmin,remove)

export default brandRouter