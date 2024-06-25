import { WarehouseController } from '@/controllers/warehouse.controller';
import {Router} from 'express'

export class WarehouseRouter {
    private router: Router
    private warehouseController: WarehouseController

    constructor() {
        this.warehouseController = new WarehouseController()
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get('/:id', this.warehouseController.getWarehouseList)
    }

    getRouter() : Router{
        return this.router
    }
}