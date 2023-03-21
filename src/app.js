import express from 'express';
import indexRoutes from './routes/index.routes'
import path from 'path'
import { create } from 'express-handlebars';
import morgan from 'morgan';

const app = express();

app.set('views', path.join(__dirname, '/views'));


const exphbs = create({
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: [
      path.join(app.get("views"), "partials"),
      path.join(app.get("views"), "partials/tasks")],
    defaultLayout: "main",
    extname: ".hbs",
  });

  //defining the template engine
app.engine(".hbs", exphbs.engine);

app.set("view engine", ".hbs");

// midlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));

// Routes
app.use(indexRoutes);

// static files
app.use(express.static(path.join(__dirname, "public")))

export default app;