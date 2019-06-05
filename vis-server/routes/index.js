const router = require('koa-router')();
const knex = require('../knex');

router.get('/day1', async (ctx, next) => {
  const back = {
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
      const time = [];
      const count = [];
      for (const o of e) {
        time.push(o.time);
        count.push(o.count);
      }
      back.data = { time, count };
      back.message = 'success';
    });
  ctx.body = back;
});

router.get('/IDtrack', async (ctx, next) => {
  const back = {
    message: 'fail',
    data: []
  };
  const id = ctx.query.id;
  console.log(id);
  var status1 = false;
  var status2 = false;
  var status3 = false;
  await knex('day1').join('sensor', 'day1.sid', '=', 'sensor.sid')
    .select('*')
    .where('id', id)
    .orderBy('time', 'asc')
    .then(e => {
      const track = [];
      for (const o of e) {
        track.push({
          time: o.time,
          floor: o.floor,
          x: o.x,
          y: o.y
        });
      }
      status1 = true;
      console.log(track);
      if (track.length != 0) {
        back.data.push({
          index: 0,
          track: track
        });
      }
    });
  await knex('day2').join('sensor', 'day2.sid', '=', 'sensor.sid')
    .select('*')
    .where('id', id)
    .orderBy('time', 'asc')
    .then(e => {
      const track = [];
      for (const o of e) {
        track.push({
          time: o.time,
          floor: o.floor,
          x: o.x,
          y: o.y
        });
      }
      status2 = true;
      if (track.length != 0) {
        back.data.push({
          index: 1,
          track: track
        });
      }
    });
  await knex('day3').join('sensor', 'day3.sid', '=', 'sensor.sid')
    .select('*')
    .where('id', id)
    .orderBy('time', 'asc')
    .then(e => {
      const track = [];
      for (const o of e) {
        track.push({
          time: o.time,
          floor: o.floor,
          x: o.x,
          y: o.y
        });
      }
      status3 = true;
      if (track.length != 0) {
        back.data.push({
          index: 2,
          track: track
        });
      }
    });
  if (status1 & status2 & status3) {
    back.message = 'success';
  }
  ctx.body = back;
});

router.get('/graph', async (ctx, next) => {
  const back = {
    message: 'fail',
    data: {
      node: [],
      link: [],
    }
  };
  var status1 = false;
  var status2 = false;
  await knex('sensor')
    .select('*')
    .then(e => {
      const node = [];
      for (const o of e) {
        switch(o.function){
          case 'poster':
          node.push({
            name: o.sid,
            category: 0,
            tooltip: {
              formatter: '海报区:{b}'
            }
          });
          break;
          case 'road':
          node.push({
            name: o.sid,
            category: 1,
            tooltip: {
              formatter: '道路:{b}'
            }
          });
          break;
          case 'exhibition':
          node.push({
            name: o.sid,
            category: 2,
            tooltip: {
              formatter: '展厅:{b}'
            }
          });
          break;
          case 'mainVenue':
          node.push({
            name: o.sid,
            category: 3,
            tooltip: {
              formatter: '主会场:{b}'
            }
          });
          break;
          case 'canteen':
          node.push({
            name: o.sid,
            category: 5,
            tooltip: {
              formatter: '餐厅:{b}'
            }
          });
          break;
          case 'relax':
          node.push({
            name: o.sid,
            category: 6,
            tooltip: {
              formatter: '休闲区:{b}'
            }
          });
          break;
        }
        
        if(o.function.match('venue')){
          node.push({
            name: o.sid,
            category: 4,
            tooltip: {
              formatter: '分会场:{b}'
            }
          });
        }
      }
      status1 = true;
      back.data.node = node;
    });
  await knex('graph')
    .select('*')
    .then(e => {
      const link = [];
      for (const o of e) {
        link.push({
          source: String(o.source),
          target: String(o.target),
          value: o.value,
        });
      }
      status2 = true;
      back.data.link = link;
    });
  if(status1 & status2){
    back.message = 'success';
  }
  ctx.body = back;
});

router.get('/day1func', async (ctx, next) => {
  const back = {
    message: 'fail',
    data: {
      time: [],
      count: [],
    },
  };
  const { function: func } = ctx.query;
  await knex('day1_PertimeFunction')
    .select('time', 'count')
    .where('function', func)
    .orderBy('time', 'asc')
    .then(e => {
      const time = [];
      const count = [];
      for (const o of e) {
        time.push(o.time);
        count.push(o.count);
      }
      back.data = { time, count };
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
  const day = ctx.query.day;
  if (typeof floor === 'undefined') {
    ctx.body = back;
  }

  await knex('day'+day+'_PertimeSid')
    .join('sensor', 'day'+day+'_PertimeSid.sid', '=', 'sensor.sid')
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

router.post('/hm2r', async (ctx, next) => {
  const back = {
    message: 'fail',
    data: {},
  };
  let { pos, time } = ctx.request.body; // req:pos([x,y]),time
  if (typeof pos === 'undefined') {
    back.message = 'query error';
    ctx.body = back;
    return;
  }
  pos[0] = Math.floor(pos[0]) + 0.5;
  pos[1] = Math.floor(pos[1]) + 0.5;
  time = time.split(':').reduce((pre, cur, index) => {
    return pre + cur * Math.pow(60, 2 - index);
  }, 0);
  await knex('sensor')
    .join('day1', 'sensor.sid', '=', 'day1.sid')
    .select('id')
    .where({
      x: pos[0],
      y: pos[1],
    })
    .where('time', '<=', time)
    .where('end_time', '>', time)
    .then(async e => {
      if (e.length === 0) {
        back.message = 'empty';
        return;
      }
      back.message = 'success';
      const queryList = e.map(({ id }) => id);
      console.log(queryList)
      await knex('peopletoclass')
        .select('class').count('*')
        .whereIn('id', queryList)
        .groupBy('class').then(e => {
          e.forEach(r => {
            back.data[r.class] = {count:r['count(*)'],ids:[]};
          });
        });
      await knex('peopletoclass')
      .select('id','class')
      .whereIn('id', queryList).then(e=>{
        e.forEach(r=>{
          back.data[r.class].ids.push(r.id)
        })
      })
    });
  //console.log(back.data);
  ctx.body = back;
});

module.exports = router;
