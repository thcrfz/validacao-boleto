import { Router } from 'express';
import homeController from '../controllers/home';

export class Home{
    router: Router;
    constructor() {
        this.router = Router();
        this.get();
    }

    get(): void{
        this.router.get('/:id', homeController.index)
    }
}

export default new Home().router
