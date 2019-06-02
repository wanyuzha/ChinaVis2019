const router = require('koa-router')();
const knex = require('../knex');

router.get('/day1', async (ctx, next) => {
  let back = {
    message: 'fail',
    data: {
      time: [],
      count: [],
    },
  };
  await knex('day1_PertimeSum')
    .select('*')
    .orderBy('time', 'asc')
    .then(e => {
      let time = [];
      let count = [];
      for (let o of e) {
        time.push(o.time);
        count.push(o.count);
      }
      back.data.time = time;
      back.data.count = count;
      back.message = 'success';
    });
  ctx.body = back;
});

router.get('/day1func', async (ctx, next) => {
  let back = {
    message: 'fail',
    data: {
      time: [],
      count: [],
    },
  };
  let func = ctx.query.function;
  await knex('day1_PertimeFunction')
    .select('time', 'count')
    .where('function', func)
    .orderBy('time', 'asc')
    .then(e => {
      let time = [];
      let count = [];
      for (let o of e) {
        time.push(o.time);
        count.push(o.count);
      }
      back.data.time = time;
      back.data.count = count;
      back.message = 'success';
    });
  ctx.body = back;
});

router.get('/heatMap', async (ctx, next) => {
  const back = {
    message: 'fail',
    data: [],
  };
  const floor = ctx.query.floor;
  if (typeof floor === 'undefined') {
    ctx.body = back;
  }

  // await Promise.all(knex('day1_PertimeSid')
  // .join('sensor', 'day1_PertimeSid.sid', '=', 'sensor.sid')
  // .where('floor', floor)
  // .select('x', 'y', 'count'), knex('day1_PertimeSid')
  // .join('sensor', 'day1_PertimeSid.sid', '=', 'sensor.sid')
  // .where('floor', floor)
  // .select('time'))
  await knex('day1_PertimeSid')
    .join('sensor', 'day1_PertimeSid.sid', '=', 'sensor.sid')
    .where('floor', floor)
    .select('time', 'x', 'y', 'count')
    .then(e => {
      if (e.length === 0) {
        return;
      }
      back.message = 'success';
      e.forEach(item => {
        const index = item.time;
        if (back.data[index]) {
          back.data[index].push([item.x, item.y, item.count]);
        } else {
          back.data[index] = [[item.x, item.y, item.count]];
        }
      });
    });
  ctx.body = back;
});

router.post('/hm2r',async(ctx,next)=>{
  let back = {
    message:'fail',
    data:{}
  }
  let req = ctx.request.body // req:pos([x,y]),time
  if(JSON.stringify(req) === '{}'){
    back.message = 'query error'
    ctx.body = back
    return;
  }
  req.pos[0] = Math.floor(req.pos[0])+0.5
  req.pos[1] = Math.floor(req.pos[1])+0.5
  let p = 3600
  let timeTmp = 0
  req.time.split(':').forEach(e=>{
    timeTmp += e*p
    p/=60
  })
  req.time = timeTmp
  await knex('sensor').join('day1','sensor.sid','=','day1.sid').select('id').where({
    x:req.pos[0],
    y:req.pos[1]
  }).where('time','<=',req.time).where('end_time','>',req.time).then(async e=>{
    if(e.length === 0){
      back.message = 'empty'
      return;
    }
    else{
      back.message = 'success'
      let queryList = []
      e.forEach(r=>{
        queryList.push(r.id)
      })
      await knex('peopletoclass').select('class').count('*').whereIn('id',queryList).groupBy('class').then(e=>{
        e.forEach(r=>{
          back.data[r.class] = r['count(*)']
        })
      })
    }
  })
  console.log(back.data)
  ctx.body = back
})

module.exports = router;
