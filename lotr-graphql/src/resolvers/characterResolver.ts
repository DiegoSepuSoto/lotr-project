import {Resolver, Query} from 'type-graphql';
import {Characters} from '../models/Character';

@Resolver()
export class CharacterResolver {
  @Query(() => [Characters], {nullable: true})
  characters() {
    return Characters.find();
  }
}
