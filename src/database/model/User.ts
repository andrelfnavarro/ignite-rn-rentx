import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';
import { TUser } from '../../dtos/UserDTO';

class User extends Model {
  static table = 'users';

  @field('user_id')
  user_id!: TUser['user_id'];

  @field('name')
  name!: TUser['name'];

  @field('email')
  email!: TUser['email'];

  @field('driver_license')
  driver_license!: TUser['driver_license'];

  @field('avatar')
  avatar!: TUser['avatar'];

  @field('token')
  token!: TUser['token'];
}

export { User };
