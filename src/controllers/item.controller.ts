import { NextFunction, Request, Response, Router } from "express";
import { ItemService } from "../services/item.service";
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.replace(path.extname(file.originalname), '') + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

export class ItemController {
  public router = Router();
  constructor(private itemService: ItemService) {
    this.setRoutes();
  }

  public setRoutes() {
    this.router.route("/").get(this.findAll);
    this.router.route("/:id").get(this.find);
    this.router.route("/").post(upload.single('photo'), this.add);
    this.router.route("/:id").delete(this.delete).put(upload.single('photo'), this.update);
  }

  private findAll = async (req: Request, res: Response, next: NextFunction) => {
    const items = await this.itemService.findAll(Number(req.query.limit), Number(req.query.page));
    res.send(items);
  };

  private find = async (req: Request, res: Response, next: NextFunction) => {
    const item = await this.itemService.find(req.params.id);
    res.send(item)
  }

  private add = async (req: Request, res: Response, next: NextFunction) => {
    if (req?.file) {
      const extension = (path.extname(req.file.originalname)).toLowerCase();
      if (extension !== '.jpg' && extension !== '.jpeg' && extension !== '.png') {
        res.status(422).send('Photo must be jpg or png.');
        return next();
      }
    }
    const addItemResult = await this.itemService.add({
      ...req.body,
      photo: req?.file ? `uploads/${req.file.originalname.replace(path.extname(req.file.originalname), '') + Date.now() + path.extname(req.file.originalname)}` : undefined
    });
    res.send(addItemResult);
  };

  private delete = async (req: Request, res: Response, next: NextFunction) => {
    await this.itemService.delete(req.params.id);
    res.status(200).send('Item Deleted');
  };

  private update = async (req: Request, res: Response, next: NextFunction) => {
    if (req?.file) {
      const extension = (path.extname(req.file.originalname)).toLowerCase();
      if (extension !== '.jpg' && extension !== '.jpeg' && extension !== '.png') {
        res.status(422).send('Photo must be jpg or png.');
        return next();
      }
    }
    const updateItemResult = await this.itemService.update(
      req.params.id,
      {
        ...req.body,
        photo: req?.file ? `uploads/${req.file.originalname.replace(path.extname(req.file.originalname), '') + Date.now() + path.extname(req.file.originalname)}` : undefined
      }
    );
    res.send(updateItemResult);
  };
}
