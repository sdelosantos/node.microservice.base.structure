import { model } from 'mongoose'
import {Invoice} from '../../../database/collectionTypes'
import {InvoiceSchema} from '../../../database/dbContext'

export default class BaseService {
    protected InvoiceEntity = model<Invoice>("Invoice",InvoiceSchema);
}