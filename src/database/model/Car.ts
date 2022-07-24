import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';
import { TCar } from '../../dtos/CarDTO';

class Car extends Model {
  static table = 'cars';

  @field('name')
  name!: TCar['name'];

  @field('brand')
  brand!: TCar['brand'];

  @field('about')
  about!: TCar['about'];

  @field('fuel_type')
  fuel_type!: TCar['fuel_type'];

  @field('period')
  period!: TCar['period'];

  @field('price')
  price!: TCar['price'];

  @field('thumbnail')
  thumbnail!: TCar['thumbnail'];
}

export { Car };
