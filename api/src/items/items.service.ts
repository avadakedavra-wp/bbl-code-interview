import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from './entities/item.entity';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ItemsService {
  // private items: Item[] = [
  //   {
  //     id: uuidv4(),
  //     name: 'Sample Item 1',
  //     description: 'This is a sample item',
  //     createdAt: new Date(),
  //   },
  //   {
  //     id: uuidv4(),
  //     name: 'Sample Item 2',
  //     description: 'This is another sample item',
  //     createdAt: new Date(),
  //   },
  // ];
  constructor(private readonly prismaService: PrismaService) {}


  create(createItemDto: CreateItemDto) 
  {
    const newItem = new Item(
      createItemDto.id || uuidv4(),
      createItemDto.name,
      createItemDto.description,
      createItemDto.createdAt,
    );
    return this.prismaService.items.create({
      data: {
        id: newItem.id,
        name: newItem.name,
        description: newItem.description,
        createdAt: newItem.createdAt,
      },
    });
  }

  findAll() {
    return this.prismaService.items.findMany();
  }
}
