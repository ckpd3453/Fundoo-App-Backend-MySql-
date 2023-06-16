import express from 'express';
import { userAuth } from '../middlewares/auth.middleware';
import * as noteController from '../controllers/note.controller';
import { newNoteValidator } from '../validators/note.validator';
const router = express.Router();

router.get('', userAuth, noteController.getAll);

router.post('', userAuth, newNoteValidator, noteController.create);

router.get('/:_id', userAuth, noteController.getById);

router.put('/:_id', newNoteValidator, userAuth, noteController.update);

router.delete('/:_id', userAuth, noteController.deleteById);

router.put('/trash/:_id', userAuth, noteController.trash);

router.put('/archive/:_id', userAuth, noteController.archive);

export default router;
