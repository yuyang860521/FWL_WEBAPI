import Factory from '../controllers'
import route from 'koa-router'
import bodyparse from 'koa-better-body'
import convert from 'koa-convert'
const router = route()

router
    .post('/api/source/save', Factory('Source').saveSource())
    .get('/api/source/list', Factory('Source').sourceList())
    .post('/api/source/upload', convert(bodyparse()), Factory('Source').uploadSource())
    .post('/api/source/del', Factory('Source').delSource())
    .get('/api/source/get', Factory('Source').sourceGet())
    .post('/api/source/update', Factory('Source').sourceUpdate())

    .post('/api/user/save', Factory('User').saveUser())

export default router