import * as insertService from '../services/insert'

export const insert = async (req, res ) => {
    try {
        
        
        const response = await insertService.insertService()
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json(
            {err: -1,
            msg: 'Fail in auth controllers' + error
        })
    }
} 
