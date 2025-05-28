import db from '../models'


//GET ALL CATEGORY
export const getPricesService = () => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Price.findAll({
            raw: true,
            attributes : ['code','value','order']
        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'ok' : 'failed',
            response
        }) 
    } catch (error) {
        reject(error)
    }
})
