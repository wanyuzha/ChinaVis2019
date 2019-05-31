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
        const [h, m, _] = item.time.split(':');
        const index = (+h - 7) * 60 + (+m - 1);
        if (back.data[index]) {
          back.data[index].push([item.y, 16 - item.x, item.count]);
        } else {
          back.data[index] = [[item.y, 16 - item.x, item.count]];
        }
      });
    });
  ctx.body = back;
});

module.exports = router;
