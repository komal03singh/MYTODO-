import express from 'express'
import { createInvite,getReceivedInvites,getSentInvites,updateStatus,deleteSentInvites } from '../controllers/invites.controller.js'
import { isAuthenticated } from '../middlewares/isAuthenticated.js'

const route = express.Router()

route.post('/createInvite',isAuthenticated,createInvite)
route.get('/getSentInvites',isAuthenticated,getSentInvites)
route.get('/getReceivedInvites',isAuthenticated,getReceivedInvites)
route.put('/updateInviteStatus/:id',isAuthenticated,updateStatus)
route.delete('/deleteInvite/:id',isAuthenticated,deleteSentInvites)


export default route