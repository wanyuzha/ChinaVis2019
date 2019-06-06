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
    data: [],
  };
  const { id } = ctx.query;

  const result = await Promise.all([
    knex('day1')
      .join('sensor', 'day1.sid', '=', 'sensor.sid')
      .select('*')
      .where('id', id)
      .orderBy('time', 'asc'),
    knex('day2')
      .join('sensor', 'day2.sid', '=', 'sensor.sid')
      .select('*')
      .where('id', id)
      .orderBy('time', 'asc'),
    knex('day3')
      .join('sensor', 'day3.sid', '=', 'sensor.sid')
      .select('*')
      .where('id', id)
      .orderBy('time', 'asc'),
  ]);

  result.forEach((res, index) => {
    if (res.length) {
      back.data.push({
        index,
        track: res.map(({ time, floor, x, y }) => ({ time, floor, x, y })),
      });
    }
  });

  back.message = 'success';

  ctx.body = back;
});

router.get('/graph', async (ctx, next) => {
  const back = {
    message: 'fail',
    data: {
      node: [],
      link: [],
    },
  };
  const [area, graph] = await Promise.all([
    knex('sensor').select('*'),
    knex('graph').select('*'),
  ]);
  back.data.node = area
    .map(o => {
      switch (o.function) {
        case 'poster':
          return {
            name: o.sid,
            category: 0,
            tooltip: {
              formatter: '海报区:{b}',
            },
          };
          break;
        case 'road':
          return {
            name: o.sid,
            category: 1,
            tooltip: {
              formatter: '道路:{b}',
            },
          };
          break;
        case 'exhibition':
          return {
            name: o.sid,
            category: 2,
            tooltip: {
              formatter: '展厅:{b}',
            },
          };
          break;
        case 'mainVenue':
          return {
            name: o.sid,
            category: 3,
            tooltip: {
              formatter: '主会场:{b}',
            },
          };
          break;
        case 'canteen':
          return {
            name: o.sid,
            category: 5,
            tooltip: {
              formatter: '餐厅:{b}',
            },
          };
          break;
        case 'relax':
          return {
            name: o.sid,
            category: 6,
            tooltip: {
              formatter: '休闲区:{b}',
            },
          };
          break;
      }

      if (o.function.match('venue')) {
        return {
          name: o.sid,
          category: 4,
          tooltip: {
            formatter: '分会场:{b}',
          },
        };
      }
    })
    .filter(v => typeof v !== 'undefined');
  back.data.link = graph.map(({ source, target, value }) => {
    return { source: source + '', target: target + '', value };
  });

  back.message = 'success';

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

router.post('/stream', async (ctx, next) => {
  const back = {
    message: 'fail',
    data: [],
  };
  const sid = ctx.request.body.sid;
  let time = ctx.request.body.time;
  const day = ctx.request.body.day;
  time = time.split(':').reduce((pre, cur, index) => {
    return pre + cur * Math.pow(60, 2 - index);
  }, 0);
  await knex('day'+day)
    .select('*')
    .count('*')
    .whereIn('sid', sid)
    .where('time', '<=', time)
    .where('end_time', '>', time)
    .where('end_time', '<', time + 60)
    .groupBy('sid')
    .then(e => {
      e.forEach(r=>{
        back.data.push({
          sid: r.sid,
          count: r['count(*)'],
          func: r.function
        })
      })
      back.message = 'success';
    });
  ctx.body = back;
});

router.post('/get_func',async(ctx,next)=>{
  let req = ctx.request.body
  let back = {
    message:"failed",
    data:[]
  }
  await knex('sensor').select('sid','function').whereIn('sid',req.sids).then(e=>{
    console.log(e)
    back.data = e
    back.message = 'success'
  })
  ctx.body = back
})

router.get('/heatMap', async (ctx, next) => {
  const back = {
    message: 'fail',
    data: [],
  };
  const { floor, day = 1 } = ctx.query;

  if (typeof floor === 'undefined') {
    ctx.body = back;
  }

  await knex('day' + day + '_PertimeSid')
    .join('sensor', 'day' + day + '_PertimeSid.sid', '=', 'sensor.sid')
    .where('floor', floor)
    .select('time', 'x', 'y', 'count')
    .then(e => {
      if (e.length === 0) {
        return;
      }
      back.message = 'success';
      e.forEach(({ time: index, x, y, count }) => {
        if (back.data[index]) {
          back.data[index].push([x, y, count]);
        } else {
          back.data[index] = [[x, y, count]];
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

  time = time.split(':').reduce((pre, cur, index) => {
    return pre + cur * Math.pow(60, 2 - index);
  }, 0);

  const queryList = await knex('sensor')
    .join('day1', 'sensor.sid', '=', 'day1.sid')
    .select('id')
    .where({
      x: Math.floor(pos[0]) + 0.5,
      y: Math.floor(pos[1]) + 0.5,
    })
    .where('time', '<=', time)
    .where('end_time', '>', time)
    .then(e => e.map(({ id }) => id));
  if (queryList.length) {
    back.message = 'success';
    const result = await Promise.all([
      knex('peopletoclass')
        .select('class')
        .count('*')
        .whereIn('id', queryList)
        .groupBy('class'),
      knex('peopletoclass')
        .select('id', 'class')
        .whereIn('id', queryList),
    ]);
    result[0].forEach(r => {
      back.data[r.class] = { count: r['count(*)'], ids: [] };
    });
    result[1].forEach(r => {
      back.data[r.class].ids.push(r.id);
    });
  } else {
    back.message = 'empty';
  }

  ctx.body = back;
});

module.exports = router;
