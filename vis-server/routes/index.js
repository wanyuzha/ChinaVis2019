const router = require('koa-router')()
const knex = require('../knex')

router.get('/day1', async (ctx, next) => {
  let back = {
    message:'fail',
    data:{
      time:[],
      count:[]
    }
  }
  await knex('day1_PertimeSum').select('*').orderBy('time','asc').then(e=>{
    let time = []
    let count = []
    for(let o of e){
      time.push(o.time)
      count.push(o.count)
    }
    back.data.time = time
    back.data.count = count
    back.message = 'success'
  })
  ctx.body = back
})

router.get('/day1func',async (ctx,next)=>{
  let back={
    message:'fail',
    data:{
      time:[],
      count:[]
    }
  }
  let func = ctx.query.function
  await knex('day1_PertimeFunction').select('time','count').where('function',func).orderBy('time','asc').then(e=>{
    let time = []
    let count = []
    for(let o of e){
      time.push(o.time)
      count.push(o.count)
    }
    back.data.time = time
    back.data.count = count
    back.message = 'success'
  })
  ctx.body = back
})

router.get('/heatMap',async(ctx,next)=>{
  let back = {
    message:'fail',
    data:[]
  }
  let floor = ctx.query.floor
  await knex('day1_PertimeSid').join('sensor','day1_PertimeSid.sid','=','sensor.sid').where('floor',floor).select('time','x','y','count','floor').then(e=>{
    if(e.length === 0) return;
    else{
      back.message = 'success'
      back.data = e
    }
  })
  ctx.body = back
})

module.exports = router