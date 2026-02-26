// import { middleware } from '#start/kernel'
// import router from '@adonisjs/core/services/router'
// import { controllers } from '#generated/controllers'
import '#core/routes/index'

// router
//   .group(() => {
//     router
//       .group(() => {
//         router.post('signup', [controllers.NewAccount, 'store'])
//         router.post('login', [controllers.AccessToken, 'store'])
//         router.post('logout', [controllers.AccessToken, 'destroy']).use(middleware.auth())
//       })
//       .prefix('auth')
//       .as('auth')

//     router
//       .group(() => {
//         router.get('/profile', [controllers.Profile, 'show'])
//       })
//       .prefix('account')
//       .as('profile')
//       .use(middleware.auth())
//   })
//   .prefix('/api')
