import {model} from 'mongoose'

import {Customers} from '../../../database/collectionTypes'
import {CustomerSchema} from '../../../database/dbContext'

export default class BaseService {
    protected CustomerModel = model<Customers>("Customers",CustomerSchema);
}