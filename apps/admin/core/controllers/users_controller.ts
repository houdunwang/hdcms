import User from '#models/user'
import { createUserValidator, updateUserValidator, changePasswordValidator } from '#core/validators/user'
import UserTransformer from '#transformers/user_transformer'
import { HttpContext } from '@adonisjs/core/http'
import BaseController from './bases_controller.ts'
import { inject } from '@adonisjs/core'
@inject()
export default class UsersController extends BaseController {
  constructor(protected ctx: HttpContext) {
    super()
  }
  /**
 * @me
 * @tag 用户管理
 * @summary 获取当前用户资料
 * @description 获取当前认证用户的详细信息
 * @responseBody 200 - <User>
 */
  async me({ auth, serialize }: HttpContext) {
    const user = auth.user!
    return serialize(UserTransformer.transform(user, auth))
  }

  /**
   * @index
   * @tag 用户管理
   * @summary 获取用户列表
   * @description 获取分页的用户列表
   * @paramQuery page- 页码 - number @example(1)
   * @paramQuery perPage- 每页数量 - number @example(10)
   * @responseBody 200 - <User[]>
   */
  async index({ request }: HttpContext) {
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 10)
    const users = await User.query().paginate(page, perPage)
    return users
  }

  /**
   * @store
   * @tag 用户管理
   * @summary 创建用户
   * @description 创建一个新用户
   * @requestBody <createUserValidator>
   * @responseBody 200 - <User>
   */
  async store({ request }: HttpContext) {
    const payload = await request.validateUsing(createUserValidator)
    const user = await User.create(payload)
    return user
  }

  /**
   * @show
   * @tag 用户管理
   * @summary 获取用户信息
   * @description 根据ID获取单个用户信息
   * @paramPath id - 用户编号 - @type(number) @required @example(1)
   * @responseBody 200 - <User>
   */
  async show({ params }: HttpContext) {
    const user = await User.findOrFail(params.id)
    return user
  }

  /**
   * @update
   * @tag 用户管理
   * @summary 更新用户信息
   * @description 根据ID更新用户信息
   * @paramPath id - 用户ID - number
   * @requestBody <updateUserValidator>
   * @responseBody 200 - <User>
   */
  async update({ params, request, auth, }: HttpContext) {
    const id = params.id ?? auth.user!.id
    if (id !== auth.user!.id && !auth.user!.isAdmin) {
      return this.error('没有操作权限', 403)
    }
    const user = auth.user!
    const payload = await request.validateUsing(updateUserValidator, {
      meta: {
        user: auth.user!,
      },
    })
    await user.merge(payload).save()
    return this.success('更新成功', UserTransformer.transform(user, auth))
  }

  /**
   * @password
   * @tag 用户管理
   * @summary 修改密码
   * @description 修改当前认证用户的密码
   * @requestFormDataBody {"password":{"type":"string","description":"新密码","example":"admin888","required":"true"},"password_confirmation":{"type":"string","description":"确认密码","example":"admin888","required":"true"},"old_password":{"type":"string","description":"原密码","example":"admin888","required":"true"},"account":{"type":"string","description":"发送验证码的邮箱或手机号","example":"2300071698@qq.com","required":"true"},"code":{"type":"string","description":"验证码","example":"admin888","required":"true"}}
   * @responseBody 200 - { "message": "密码修改成功" }
   */
  async password({ request, auth }: HttpContext) {
    const user = await auth.authenticate()
    const payload = await request.validateUsing(changePasswordValidator, {
      meta: { user },
    })

    user.password = payload.password
    await user.save()
    return this.success('密码修改成功')
  }

  /**
   * @destroy
   * @tag 用户管理
   * @summary 删除用户
   * @description 根据ID删除用户
   * @responseBody 200 - { "message": "User deleted successfully" }
   */
  async destroy({ params }: HttpContext) {
    const user = await User.findOrFail(params.id)
    await user.delete()
    return { message: 'User deleted successfully' }
  }

  //注销帐号
}
