import express, {Express} from "express";
import home from './routes/home';

export class App {
    app: Express;

    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }

    middlewares(): void {
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(express.json());
    }

    routes(): void {
        this.app.use('/boleto', home)
    }
}

const port = 8080;
const app = new App().app;
app.listen(port, () => {
    console.log(`Server rodando na porta, ${port}`)
})

