import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from './entities/item.entity';
import { v4 as uuidv4 } from 'uuid';
 
@Injectable()
export class ItemsService {
private items: Item[] = [
  {
    id: uuidv4(),
    name: 'Sample Item 1',
    description: 'This is a sample item',
    createdAt: new Date(),
  },
  {
    id: uuidv4(),
    name: 'Sample Item 2',
    description: 'This is another sample item',
    createdAt: new Date(),
  },
];
  constructor() {}

  create(createItemDto: CreateItemDto) {
    const { id, ...itemData } = createItemDto;
    const newItem: Item = {
      id: uuidv4(),
      ...itemData,
      createdAt: new Date(),
    };
    this.items.push(newItem);
    return newItem;
  }

  findAll() {
    return this.items;
  }
}
