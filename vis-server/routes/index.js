const router = require('koa-router')();
const knex = require('../knex');
const nameMap = {
    venueA: '分会场A',
    venueB: '分会场B',
    venueC: '分会场C',
    venueD: '分会场D',
    poster: '海报区',
    restroom1: '厕所1',
    restroom2: '厕所2',
    restroom3: '厕所3',
    exhibition: '展厅',
    mainVenue: '主会场',
    service: '服务区',
    stair1: '楼梯',
    stair2: '楼梯',
    stair:'楼梯',
    sign: '签到处',
    entry1: '入口1',
    entry2: '入口2',
    entry3: '入口3',
    entry4: '入口4',
    exit1: '出口1',
    exit2: '出口2',
    exit3: '出口3',
    exit4: '出口4',
    road:'道路',
    room1:'room1',
    room2:'room2',
    room3:'room3',
    room4:'room4',
    room5:'room5',
    room6:'room6',
    room:'room',
    relax:'休闲区',
    canteen:'餐厅'
}
router.get('/day', async(ctx, next) => {
    const back = {
        message: 'fail',
        data: {
            time: [],
            count: [],
        },
    };
    const day = ctx.query.day;
    await knex('day'+day+'_PertimeSum')
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
  const { id, day, floor } = ctx.query;

  const res = await knex('day' + day)
    .join('sensor', 'day' + day + '.sid', '=', 'sensor.sid')
    .select('*')
    .where('id', id)
    .where('floor', floor)
    .orderBy('time', 'asc');
  if (res.length) {
    back.data.push({
      track: res.map(({ time, x, y }) => ({ time, x, y })),
    });
  }

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

        case 'road':
          return {
            name: o.sid,
            category: 1,
            tooltip: {
              formatter: '道路:{b}',
            },
          };

        case 'exhibition':
          return {
            name: o.sid,
            category: 2,
            tooltip: {
              formatter: '展厅:{b}',
            },
          };

        case 'mainVenue':
          return {
            name: o.sid,
            category: 3,
            tooltip: {
              formatter: '主会场:{b}',
            },
          };

        case 'canteen':
          return {
            name: o.sid,
            category: 5,
            tooltip: {
              formatter: '餐厅:{b}',
            },
          };

        case 'relax':
          return {
            name: o.sid,
            category: 6,
            tooltip: {
              formatter: '休闲区:{b}',
            },
          };
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

router.get('/pca', async(ctx, next)=>{
    const back = {
        message: 'fail',
        data: []
    }
    back.data.push(['id', 'x', 'y', 'z']);
    const day = ctx.query.day;
    await knex('pca')
        .select('*')
        .where('day', day)
        .then(e => {
            e.forEach(r=>{
                back.data.push(
                    [r.id, Number(r.x), Number(r.y), Number(r.z)]
                )
            })
            back.message = 'success';
        })
    ctx.body = back;
})

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
  await knex('day' + day)
    .select('*')
    .count('*')
    .whereIn('sid', sid)
    .where('time', '<=', time)
    .where('end_time', '>', time)
    .where('end_time', '<', time + 60)
    .groupBy('sid')
    .then(e => {
      e.forEach(r => {
        back.data.push({
          sid: r.sid,
          count: r['count(*)'],
        });
      });
      back.message = 'success';
    });
  ctx.body = back;
});

router.get('/worker', async (ctx, next) => {
  const back = {
    message: 'fail',
    data: {
      sec: [],
      norm: [],
    },
  };
  let time = ctx.query.time;
  const day = ctx.query.day;
  time = time.split(':').reduce((pre, cur, index) => {
    return pre + cur * Math.pow(60, 2 - index);
  }, 0);
  await knex('day' + day)
    .join('workertofunc', 'day' + day + '.id', '=', 'workertofunc.id')
    .where('time', '<=', time)
    .where('end_time', '>', time)
    .where('day', day)
    .then(e => {
      e.forEach(r => {
        if (r.func === 'security') {
          back.data.sec.push({
            id: r.id,
            sid: r.sid,
            dispatch:''
          });
        } else {
          back.data.norm.push({
            id: r.id,
            class: nameMap[r.func],
            duty: r.func === r.function ? '是' : '否',
          });
        }
      });
    });
  back.message = 'success';
  ctx.body = back;
});

router.get('/function', async(ctx, next) => {
    const back = {
        message: 'fail',
        xAxis: [],
        data: []
    };
    const time = ctx.query.time;
    const day = ctx.query.day;
    await knex('day'+day+'_PertimeSid').join('sensor', 'sensor.sid', '=', 'day'+day+'_PertimeSid.sid')
        .select('*')
        .sum('count')
        .where('time', '=', time)
        .groupBy('function')
        .then(e => {
            e.forEach(r => {
                back.xAxis.push(nameMap[r.function]);
                back.data.push(r['sum(`count`)']);
            })
        })
    back.message = 'success';
    ctx.body = back;
});

router.post('/get_func', async (ctx, next) => {
  let req = ctx.request.body;
  let back = {
    message: 'failed',
    data: [],
  };
  await knex('sensor')
    .select('sid', 'function')
    .whereIn('sid', req.sids)
    .then(e => {
      console.log(e);
      back.data = e;
      back.message = 'success';
    });
  ctx.body = back;
});

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

router.get('/parallel', async (ctx, next) => {
  const back = {
    message: 'fail',
    data: [],
  };
  const day = ctx.query.day;
  await knex('day'+day+'_Parallel')
    .select(
      'class',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
      '13',
      '14',
      '15',
      '16',
      '17',
      '18'
    )
    .then(e => {
      if (e.length === 0) {
        return;
      }
      back.message = 'success';
      e.forEach(item => {
        back.data.push([
          item['class'],
          item['7'],
          item['8'],
          item['9'],
          item['10'],
          item['11'],
          item['12'],
          item['13'],
          item['14'],
          item['15'],
          item['16'],
          item['17'],
          item['18'],
        ]);
      });
    });
  ctx.body = back;
});

router.post('/dispatch',async(ctx,next)=>{
  let back = {
    message:'fail',
    data:{
      id:-1,
    }
  }
  const req = ctx.request.body // sid,secs:[{id,sid}]
  let floor,x,y = 0
  await knex('sensor').select('floor','x','y').where('sid',req.sid).then(e=>{
    floor = e[0].floor
    x = e[0].x
    y = e[0].y
  })
  let dist = x*x+y*y
  let min_sid = 0;
  await knex('sensor').whereIn('sid',req.secs.map(el=>{return el.sid})).select('sid','floor','x','y').then(e=>{
    e.forEach(ele => {
      if(ele.floor === floor && ele.x*ele.x + ele.y*ele.y < dist){
        min_sid = ele.sid
        dist = ele.x*ele.x + ele.y*ele.y
      }
    })
  })
  back.data.id = req.secs.find(r=>{return r.sid === min_sid}).id
  ctx.body = back
})

module.exports = router;

router.get('/dispatch',async(ctx,next)=>{
  let back = {
    message:'fail',
    data:{}
  }
})