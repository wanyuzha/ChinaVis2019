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
  if (typeof floor === 'undefined') {
    ctx.body = back;
  }

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
      await knex('peopletoclass')
        .select('class')
        .count('*')
        .whereIn('id', queryList)
        .groupBy('class')
        .then(e => {
          e.forEach(r => {
            back.data[r.class] = r['count(*)'];
          });
        });
    });
  console.log(back.data);
  ctx.body = back;
});

module.exports = router;
