import express, {Express, Request, Response} from "express";

export class App {
    app: Express;

    constructor() {
        this.app = express();
        this.routes();
    }

    routes(): void {
        this.app.get('/', (req: Request, res: Response) => {
            res.send( 'Hot asdasd ');
        })
    }
}

const port = 8080;
const app = new App().app;
app.listen(port, () => {
    console.log(`Server rodando na porta, ${port}`)
})

