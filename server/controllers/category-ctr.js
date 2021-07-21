import baseController from './baseController'

export default function categoryController(){
    // const baseCtr = baseController()

    const controller = {
        getAll(req, res){
            console.log('1:', req.body);
            return baseController().getAll(req,res)
        }
    }
    
    return controller
}

// const categoryController = {
//     async getAll (req, res) {
//         try {
            
//             const cats = await Category.find()
//             // await dbConnection.closeDB
//             res.status(200).json({
//                 data: cats,
//             })
//         } catch (error){
//             res.status(400).json({msg:error})
//         }
//     },
//     async create (req, res) {
//         try {

//             if (await Category.checkingName(req.body.name)){
//                 return res.status(400).json({mgs:'This category already existed'})
//             }

//             const category = await new Category({
//                 name: req.body.name,
//                 desc: req.body.desc,
//             }).save()

//             return res.status(200).json({
//                 msg:'New category creadted successfully',
//                 data: category,
//             })

//         } catch (error){
//             res.status(400).json({msg:error})
//         }
//     }, 
//     async update (req, res) {
//         try {

//         } catch (error){
//             res.status(400).json({msg:error})
//         }
//     },
//     async delete (req, res) {
//         try {
            
//         } catch (error){
//             res.status(400).json({msg:error})
//         }
//     },
// }

// export default categoryController