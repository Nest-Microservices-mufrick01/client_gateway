import { IsNumber, IsPositive, IsEnum, IsOptional, IsBoolean } from "class-validator";
import { OrderStatus, OrderStatusList } from "../enum";

export class CreateOrderDto {
    @IsNumber()
    @IsPositive()
    totalAmount:number;

    @IsNumber()
    @IsPositive()
    totalItems:number;

    @IsEnum(OrderStatusList,{message: `Possible status value are ${OrderStatusList}`})
    @IsOptional()
    status: OrderStatus = OrderStatus.PENDING;

    @IsBoolean()
    @IsOptional()
    paid: boolean = false;

}
