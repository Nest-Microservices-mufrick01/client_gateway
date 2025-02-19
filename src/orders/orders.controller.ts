import { catchError } from 'rxjs';
import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, ParseUUIDPipe, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE, ORDERS_SERVICE } from 'src/config';
import { CreateOrderDto, OrderPaginationDto, StatusDto, UpdateOrderDto } from './dto';
import { PaginationDto } from 'src/common/dto';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(NATS_SERVICE) private readonly natsClient:ClientProxy
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.natsClient.send('createOrder',createOrderDto)
      .pipe(
        catchError(err=>{throw new RpcException(err)})
      )
  }
  
  @Get()
  findAll(@Query() orderPaginationDto:OrderPaginationDto) {
    return this.natsClient.send('findAllOrders',orderPaginationDto)
  }

  @Get('id/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.natsClient.send('findOneOrder',{id})
      .pipe(
        catchError(err=>{throw new RpcException(err)})
      )
  }

  @Get(':status')
  findAllByStatus(@Param() statusDto: StatusDto, @Query() paginationDto:PaginationDto) {

    return this.natsClient.send('findAllOrders',{...paginationDto,status:statusDto.status})
  }

  @Patch(':id')
  changeOrderStatus(@Param('id', ParseUUIDPipe) id: string, @Body() statusDto: StatusDto) {
    return this.natsClient.send('changeOrderStatus',{id,...statusDto})
      .pipe(
        catchError(err=>{throw new RpcException(err)})
      )
  }
}
