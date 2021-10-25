import { model } from 'mongoose'
import {Products} from '../../../database/collectionTypes'
import {ProductsSchema} from '../../../database/dbContext'

export default class BaseService {
    protected ProductoEntity = model<Products>("Products",ProductsSchema);
}